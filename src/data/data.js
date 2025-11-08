// src/data/data.js
// Base de datos simulada para Capibites con persistencia en localStorage

// --- Utilidades para manejar localStorage ---
const guardarEnLocalStorage = (clave, datos) => {
  localStorage.setItem(clave, JSON.stringify(datos));
};

const cargarDeLocalStorage = (clave, valorPorDefecto) => {
  const datos = localStorage.getItem(clave);
  return datos ? JSON.parse(datos) : valorPorDefecto;
};

// --- Datos iniciales por defecto ---
let productos = cargarDeLocalStorage("productos", [
  {
    id: 1,
    nombre: "Hamburguesa Clásica",
    categoria: "hamburguesas",
    precio: 5990,
    descripcion: "Hamburguesa con carne, lechuga, tomate y queso",
    imagen: "/img/smash-burger-que-es.jpg",
    enOferta: false,
    descuento: 0,
    stock: 20
  },
  {
    id: 2,
    nombre: "Hamburguesa Completa",
    categoria: "hamburguesas",
    precio: 7990,
    descripcion: "Hamburguesa con carne, huevo, palta, tomate y mayonesa",
    imagen: "/img/smash-burger-que-es.jpg",
    enOferta: true,
    descuento: 15,
    stock: 15
  },
  {
    id: 3,
    nombre: "Papas Fritas Medianas",
    categoria: "acompañamientos",
    precio: 2990,
    descripcion: "Porción mediana de papas fritas crocantes",
    imagen: "/img/papas-fritas-saludables-1080x550-1-1200x720.jpg",
    enOferta: false,
    descuento: 0,
    stock: 50
  },
  {
    id: 4,
    nombre: "Papas Fritas Grandes",
    categoria: "acompañamientos",
    precio: 3990,
    descripcion: "Porción grande de papas fritas crocantes",
    imagen: "/img/papas-fritas-saludables-1080x550-1-1200x720.jpg",
    enOferta: true,
    descuento: 10,
    stock: 40
  },
  {
    id: 5,
    nombre: "Completo Italiano",
    categoria: "completos",
    precio: 3490,
    descripcion: "Vienesa con palta, tomate y mayonesa",
    imagen: "/img/Foto_1.jpeg",
    enOferta: false,
    descuento: 0,
    stock: 25
  },
  {
    id: 6,
    nombre: "Completo Dinámico",
    categoria: "completos",
    precio: 3990,
    descripcion: "Vienesa con chucrut, tomate y mayo-ketchup",
    imagen: "/img/Foto_1.jpeg",
    enOferta: true,
    descuento: 20,
    stock: 18
  },
  {
    id: 7,
    nombre: "Bebida 500ml",
    categoria: "bebidas",
    precio: 1990,
    descripcion: "Bebida gaseosa de 500ml",
    imagen: "/img/bebida.jpg",
    enOferta: false,
    descuento: 0,
    stock: 100
  },
  {
    id: 8,
    nombre: "Combo Familiar",
    categoria: "combos",
    precio: 19990,
    descripcion: "4 hamburguesas + 2 papas grandes + 4 bebidas",
    imagen: "/img/combo.jpg",
    enOferta: true,
    descuento: 25,
    stock: 10
  }
]);

let usuarios = cargarDeLocalStorage("usuarios", [
  {
    id: 1,
    nombre: "Admin",
    email: "admin@capibites.cl",
    password: "admin123",
    rol: "administrador",
    direccion: "Paine, Chile",
    telefono: "+56912345678"
  }
]);

let pedidos = cargarDeLocalStorage("pedidos", []);

let nextProductoId = productos.length + 1;
let nextUsuarioId = usuarios.length + 1;
let nextPedidoId = pedidos.length + 1;

// ============= CRUD PRODUCTOS =============
export const obtenerProductos = () => [...productos];

export const obtenerProductoPorId = (id) => productos.find(p => p.id === parseInt(id));

export const obtenerProductosPorCategoria = (categoria) =>
  productos.filter(p => p.categoria === categoria);

export const obtenerProductosEnOferta = () =>
  productos.filter(p => p.enOferta);

export const crearProducto = (producto) => {
  const nuevo = {
    id: nextProductoId++,
    ...producto,
    enOferta: producto.enOferta || false,
    descuento: producto.descuento || 0,
    stock: producto.stock || 0
  };
  productos.push(nuevo);
  guardarEnLocalStorage("productos", productos);
  return nuevo;
};

export const actualizarProducto = (id, datos) => {
  const index = productos.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    productos[index] = { ...productos[index], ...datos };
    guardarEnLocalStorage("productos", productos);
    return productos[index];
  }
  return null;
};

export const eliminarProducto = (id) => {
  productos = productos.filter(p => p.id !== parseInt(id));
  guardarEnLocalStorage("productos", productos);
};

// ============= CRUD USUARIOS =============
export const obtenerUsuarios = () => [...usuarios];

export const obtenerUsuarioPorEmail = (email) =>
  usuarios.find(u => u.email === email);

export const crearUsuario = (usuario) => {
  const nuevo = { id: nextUsuarioId++, ...usuario, rol: usuario.rol || "cliente" };
  usuarios.push(nuevo);
  guardarEnLocalStorage("usuarios", usuarios);
  return nuevo;
};

export const validarLogin = (email, password) => {
  const user = usuarios.find(u => u.email === email && u.password === password);
  return user || null;
};

// ============= CRUD PEDIDOS =============
export const obtenerPedidos = () => [...pedidos];

export const obtenerPedidoPorId = (id) => pedidos.find(p => p.id === parseInt(id));

export const crearPedido = (pedido) => {
  const nuevo = {
    id: nextPedidoId++,
    ...pedido,
    fecha: new Date().toISOString(),
    estado: "pendiente"
  };
  pedidos.push(nuevo);
  guardarEnLocalStorage("pedidos", pedidos);
  return nuevo;
};

export const actualizarPedido = (id, datos) => {
  const index = pedidos.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    pedidos[index] = { ...pedidos[index], ...datos };
    guardarEnLocalStorage("pedidos", pedidos);
    return pedidos[index];
  }
  return null;
};

export const eliminarPedido = (id) => {
  pedidos = pedidos.filter(p => p.id !== parseInt(id));
  guardarEnLocalStorage("pedidos", pedidos);
};

// ============= UTILIDADES =============
export const obtenerCategorias = () =>
  [...new Set(productos.map(p => p.categoria))];

export const calcularPrecioConDescuento = (producto) =>
  producto.enOferta && producto.descuento > 0
    ? Math.round(producto.precio * (1 - producto.descuento / 100))
    : producto.precio;

export const buscarProductos = (termino) => {
  const t = termino.toLowerCase();
  return productos.filter(
    (p) =>
      p.nombre.toLowerCase().includes(t) ||
      p.descripcion.toLowerCase().includes(t)
  );
};
