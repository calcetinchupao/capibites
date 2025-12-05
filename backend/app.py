import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from motor.motor_asyncio import AsyncIOMotorClient
import certifi
import certifi
from bson import ObjectId
from dotenv import load_dotenv
from jose import jwt, JWTError
from passlib.context import CryptContext

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "")
DB_NAME = os.getenv("DB_NAME", "capibites")
COL_PRODUCTS = os.getenv("COL_PRODUCTS", "productos")
COL_ORDERS = os.getenv("COL_ORDERS", "pedidos")
COL_USERS = os.getenv("COL_USERS", "usuarios")
JWT_SECRET = os.getenv("JWT_SECRET", "devsecret")
JWT_ALG = "HS256"
JWT_EXPIRES_MINUTES = int(os.getenv("JWT_EXPIRES_MINUTES", "60"))

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("CORS_ORIGIN", "*")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client: Optional[AsyncIOMotorClient] = None
db = None
pwh = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

# --- Auth helpers (must be defined before any route uses them) ---
def build_token(payload: dict):
    from datetime import datetime, timedelta
    to_encode = payload.copy()
    expire = datetime.utcnow() + timedelta(minutes=JWT_EXPIRES_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALG)

async def parse_auth_token(authorization: Optional[str] = Header(default="")):
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="token requerido")
    token = authorization.split(" ", 1)[1]
    try:
        data = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
    except JWTError:
        raise HTTPException(status_code=401, detail="token inválido")
    uid = data.get("uid")
    if not uid:
        raise HTTPException(status_code=401, detail="token inválido")
    try:
        filtro = {"_id": ObjectId(uid)}
    except Exception:
        filtro = {"id": uid}
    user = await db[COL_USERS].find_one(filtro)
    if not user:
        raise HTTPException(status_code=401, detail="usuario no encontrado")
    user_out = {"id": str(user.get("_id")), "nombre": user.get("nombre"), "email": user.get("email"), "rol": user.get("rol", "cliente")}
    return user_out

def roles_required(roles: List[str]):
    async def checker(user=Depends(parse_auth_token)):
        if user.get("rol") not in roles:
            raise HTTPException(status_code=403, detail="permiso denegado")
        return user
    return checker

class Producto(BaseModel):
    id: Optional[int] = Field(default=None)
    nombre: str
    categoria: str
    precio: int
    descripcion: str
    imagen: str
    enOferta: bool = False
    descuento: int = 0
    stock: int = 0

class PedidoProducto(BaseModel):
    id: int
    nombre: str
    precio: int
    cantidad: int
    imagen: Optional[str] = ""

class DatosEnvio(BaseModel):
    nombre: str
    email: str
    telefono: Optional[str] = ""
    direccion: str
    comuna: Optional[str] = ""
    notasAdicionales: Optional[str] = ""

class Pedido(BaseModel):
    productos: List[PedidoProducto]
    total: int
    datosEnvio: DatosEnvio
    estado: Optional[str] = "pendiente"

class UsuarioCreate(BaseModel):
    nombre: str
    email: str
    password: str
    rol: Optional[str] = "cliente"

class UsuarioOut(BaseModel):
    id: str
    nombre: str
    email: str
    rol: str

@app.on_event("startup")
async def on_startup():
    global client, db
    if not MONGO_URI:
        raise RuntimeError("MONGO_URI no configurado")
    client = AsyncIOMotorClient(MONGO_URI, tlsCAFile=certifi.where())
    db = client[DB_NAME]

@app.on_event("shutdown")
async def on_shutdown():
    if client:
        client.close()

@app.get("/api/v1/health")
async def health():
    return {"ok": True, "db": DB_NAME}

@app.get("/api/v1/products")
async def list_products():
    cursor = db[COL_PRODUCTS].find({})
    items = []
    async for doc in cursor:
        doc["_id"] = str(doc.get("_id"))
        items.append(doc)
    return items

@app.post("/api/v1/products/seed")
async def seed_products():
    from pathlib import Path
    import json
    # Dataset desde src/data/data.js (copiado a backend/products_seed.json)
    seed_path = Path(__file__).parent / "products_seed.json"
    if not seed_path.exists():
        raise HTTPException(status_code=400, detail="Seed JSON no encontrado")
    data = json.loads(seed_path.read_text(encoding="utf-8"))
    # Elimina existentes y re-inserta
    await db[COL_PRODUCTS].delete_many({})
    if isinstance(data, list):
        await db[COL_PRODUCTS].insert_many(data)
    else:
        await db[COL_PRODUCTS].insert_many(data.get("productos", []))
    return {"ok": True}

@app.post("/api/v1/orders", status_code=201)
async def create_order(pedido: Pedido):
    from datetime import datetime
    doc = pedido.dict()
    doc["fecha"] = datetime.utcnow().isoformat()
    doc["tipoDocumento"] = "boleta"
    doc["boletaFolio"] = str(ObjectId())
    result = await db[COL_ORDERS].insert_one(doc)
    doc["_id"] = str(result.inserted_id)
    doc["id"] = str(result.inserted_id)
    return doc

@app.get("/api/v1/admin/orders")
async def list_orders(user=Depends(roles_required(["administrador", "vendedor"]))):
    cursor = db[COL_ORDERS].find({})
    items = []
    async for doc in cursor:
        oid = doc.get("_id")
        doc["_id"] = str(oid)
        doc["id"] = str(oid)
        items.append(doc)
    return items

@app.put("/api/v1/admin/orders/{id}/status")
async def update_order_status(id: str, body: dict, user=Depends(roles_required(["administrador", "vendedor"]))):
    estado = body.get("estado")
    if not estado:
        raise HTTPException(status_code=400, detail="estado requerido")
    try:
        oid = ObjectId(id)
    except Exception:
        raise HTTPException(status_code=400, detail="id inválido")
    result = await db[COL_ORDERS].update_one({"_id": oid}, {"$set": {"estado": estado}})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Pedido no encontrado")
    return {"ok": True}

# ---- Admin Productos CRUD ----
@app.get("/api/v1/admin/products")
async def admin_list_products(user=Depends(roles_required(["administrador"]))):
    cursor = db[COL_PRODUCTS].find({})
    items = []
    async for doc in cursor:
        oid = doc.get("_id")
        doc["_id"] = str(oid)
        if "id" not in doc:
            doc["id"] = str(oid)
        items.append(doc)
    return items

def _build_product_filter(id: str):
    try:
        return {"_id": ObjectId(id)}
    except Exception:
        try:
            return {"id": int(id)}
        except Exception:
            return {"id": id}

@app.get("/api/v1/admin/products/{id}")
async def admin_get_product(id: str, user=Depends(roles_required(["administrador"]))):
    filtro = _build_product_filter(id)
    doc = await db[COL_PRODUCTS].find_one(filtro)
    if not doc:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    oid = doc.get("_id")
    doc["_id"] = str(oid)
    if "id" not in doc:
        doc["id"] = str(oid)
    return doc

@app.post("/api/v1/admin/products", status_code=201)
async def admin_create_product(producto: Producto, user=Depends(roles_required(["administrador"]))):
    data = producto.dict()
    result = await db[COL_PRODUCTS].insert_one(data)
    data["_id"] = str(result.inserted_id)
    if "id" not in data:
        data["id"] = str(result.inserted_id)
    return data

@app.put("/api/v1/admin/products/{id}")
async def admin_update_product(id: str, producto: Producto, user=Depends(roles_required(["administrador"]))):
    filtro = _build_product_filter(id)
    data = {k: v for k, v in producto.dict().items()}
    result = await db[COL_PRODUCTS].update_one(filtro, {"$set": data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    doc = await db[COL_PRODUCTS].find_one(filtro)
    oid = doc.get("_id")
    doc["_id"] = str(oid)
    if "id" not in doc:
        doc["id"] = str(oid)
    return doc

@app.delete("/api/v1/admin/products/{id}")
async def admin_delete_product(id: str, user=Depends(roles_required(["administrador"]))):
    filtro = _build_product_filter(id)
    result = await db[COL_PRODUCTS].delete_one(filtro)
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return {"ok": True}

def build_token(payload: dict):
    from datetime import datetime, timedelta
    to_encode = payload.copy()
    expire = datetime.utcnow() + timedelta(minutes=JWT_EXPIRES_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALG)

async def parse_auth_token(authorization: Optional[str] = Header(default="")):
    if not authorization or not authorization.lower().startswith("bearer "):
        raise HTTPException(status_code=401, detail="token requerido")
    token = authorization.split(" ", 1)[1]
    try:
        data = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALG])
    except JWTError:
        raise HTTPException(status_code=401, detail="token inválido")
    uid = data.get("uid")
    if not uid:
        raise HTTPException(status_code=401, detail="token inválido")
    try:
        filtro = {"_id": ObjectId(uid)}
    except Exception:
        filtro = {"id": uid}
    user = await db[COL_USERS].find_one(filtro)
    if not user:
        raise HTTPException(status_code=401, detail="usuario no encontrado")
    user_out = {"id": str(user.get("_id")), "nombre": user.get("nombre"), "email": user.get("email"), "rol": user.get("rol", "cliente")}
    return user_out

def roles_required(roles: List[str]):
    async def checker(user=Depends(parse_auth_token)):
        if user.get("rol") not in roles:
            raise HTTPException(status_code=403, detail="permiso denegado")
        return user
    return checker

@app.post("/api/v1/auth/register", status_code=201)
async def auth_register(body: UsuarioCreate):
    exists = await db[COL_USERS].find_one({"email": body.email})
    if exists:
        raise HTTPException(status_code=400, detail="email ya registrado")
    total = await db[COL_USERS].count_documents({})
    rol = body.rol if total == 0 and body.rol in {"administrador", "vendedor", "cliente"} else "cliente"
    doc = {"nombre": body.nombre, "email": body.email, "password": pwh.hash(body.password), "rol": rol}
    res = await db[COL_USERS].insert_one(doc)
    return {"id": str(res.inserted_id), "nombre": body.nombre, "email": body.email, "rol": rol}

class LoginBody(BaseModel):
    email: str
    password: str

@app.post("/api/v1/auth/login")
async def auth_login(body: LoginBody):
    user = await db[COL_USERS].find_one({"email": body.email})
    if not user or not pwh.verify(body.password, user.get("password", "")):
        raise HTTPException(status_code=401, detail="credenciales inválidas")
    token = build_token({"uid": str(user.get("_id")), "email": user.get("email"), "rol": user.get("rol", "cliente")})
    return {"token": token, "user": {"id": str(user.get("_id")), "nombre": user.get("nombre"), "email": user.get("email"), "rol": user.get("rol", "cliente")}}

@app.get("/api/v1/auth/me")
async def auth_me(user=Depends(parse_auth_token)):
    return user

@app.get("/api/v1/admin/users")
async def admin_users_list(user=Depends(roles_required(["administrador"]))):
    cursor = db[COL_USERS].find({}, {"password": 0})
    items = []
    async for doc in cursor:
        doc["id"] = str(doc.get("_id"))
        doc.pop("_id", None)
        items.append(doc)
    return items

@app.post("/api/v1/admin/users", status_code=201)
async def admin_user_create(body: UsuarioCreate, user=Depends(roles_required(["administrador"]))):
    exists = await db[COL_USERS].find_one({"email": body.email})
    if exists:
        raise HTTPException(status_code=400, detail="email ya registrado")
    doc = {"nombre": body.nombre, "email": body.email, "password": pwh.hash(body.password), "rol": body.rol or "cliente"}
    res = await db[COL_USERS].insert_one(doc)
    return {"id": str(res.inserted_id), "nombre": body.nombre, "email": body.email, "rol": doc["rol"]}

@app.put("/api/v1/admin/users/{id}")
async def admin_user_update(id: str, body: dict, user=Depends(roles_required(["administrador"]))):
    update = {k: v for k, v in body.items() if k in {"nombre", "email", "rol", "password"}}
    if "password" in update:
        update["password"] = pwh.hash(update["password"])
    filtro = {"_id": ObjectId(id)} if ObjectId.is_valid(id) else {"id": id}
    res = await db[COL_USERS].update_one(filtro, {"$set": update})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="usuario no encontrado")
    doc = await db[COL_USERS].find_one(filtro, {"password": 0})
    doc["id"] = str(doc.get("_id"))
    doc.pop("_id", None)
    return doc

@app.delete("/api/v1/admin/users/{id}")
async def admin_user_delete(id: str, user=Depends(roles_required(["administrador"]))):
    filtro = {"_id": ObjectId(id)} if ObjectId.is_valid(id) else {"id": id}
    res = await db[COL_USERS].delete_one(filtro)
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="usuario no encontrado")
    return {"ok": True}

# --- Seeds de desarrollo ---
@app.post("/api/v1/seed/users")
async def seed_users():
    total = await db[COL_USERS].count_documents({})
    if total > 0:
        return {"ok": True, "skipped": True}
    admin = {"nombre": "Admin", "email": "admin@capibites.cl", "password": pwh.hash("admin123"), "rol": "administrador"}
    vendedor = {"nombre": "Vendedor", "email": "vendedor@capibites.cl", "password": pwh.hash("vend123"), "rol": "vendedor"}
    await db[COL_USERS].insert_many([admin, vendedor])
    return {"ok": True, "created": 2}
