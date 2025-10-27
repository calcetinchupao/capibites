// src/data/data.js
// Base de datos simulada para Capibites

let productos = [
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
];

let usuarios = [
  {
    id: 1,
    nombre: "Admin",
    email: "admin@capibites.cl",
    password: "admin123",
    rol: "administrador",
    direccion: "Paine, Chile",
    telefono: "+56912345678"
  }
];

let pedidos = [];

let nextProductoId = 9;
let nextUsuarioId = 2;
let nextPedidoId = 1;

// ============= CRUD PRODUCTOS =============

export const obtenerProductos = () => {
  return [...productos];
};

export const obtenerProductoPorId = (id) => {
  return productos.find(p => p.id === parseInt(id));
};

export const obtenerProductosPorCategoria = (categoria) => {
  return productos.filter(p => p.categoria === categoria);
};

export const obtenerProductosEnOferta = () => {
  return productos.filter(p => p.enOferta);
};

export const crearProducto = (producto) => {
  const nuevoProducto = {
    id: nextProductoId++,
    ...producto,
    enOferta: producto.enOferta || false,
    descuento: producto.descuento || 0,
    stock: producto.stock || 0
  };
  productos.push(nuevoProducto);
  return nuevoProducto;
};

export const actualizarProducto = (id, datosActualizados) => {
  const index = productos.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    productos[index] = { ...productos[index], ...datosActualizados };
    return productos[index];
  }
  return null;
};

export const eliminarProducto = (id) => {
  const index = productos.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    const eliminado = productos.splice(index, 1);
    return eliminado[0];
  }
  return null;
};

// ============= CRUD USUARIOS =============

export const obtenerUsuarios = () => {
  return [...usuarios];
};

export const obtenerUsuarioPorEmail = (email) => {
  return usuarios.find(u => u.email === email);
};

export const crearUsuario = (usuario) => {
  const nuevoUsuario = {
    id: nextUsuarioId++,
    ...usuario,
    rol: usuario.rol || "cliente"
  };
  usuarios.push(nuevoUsuario);
  return nuevoUsuario;
};

export const actualizarUsuario = (id, datosActualizados) => {
  const index = usuarios.findIndex(u => u.id === parseInt(id));
  if (index !== -1) {
    usuarios[index] = { ...usuarios[index], ...datosActualizados };
    return usuarios[index];
  }
  return null;
};

export const eliminarUsuario = (id) => {
  const index = usuarios.findIndex(u => u.id === parseInt(id));
  if (index !== -1) {
    const eliminado = usuarios.splice(index, 1);
    return eliminado[0];
  }
  return null;
};

export const validarLogin = (email, password) => {
  const usuario = usuarios.find(u => u.email === email && u.password === password);
  return usuario || null;
};

// ============= CRUD PEDIDOS =============

export const obtenerPedidos = () => {
  return [...pedidos];
};

export const obtenerPedidoPorId = (id) => {
  return pedidos.find(p => p.id === parseInt(id));
};

export const obtenerPedidosPorUsuario = (usuarioId) => {
  return pedidos.filter(p => p.usuarioId === parseInt(usuarioId));
};

export const crearPedido = (pedido) => {
  const nuevoPedido = {
    id: nextPedidoId++,
    ...pedido,
    fecha: new Date().toISOString(),
    estado: "pendiente"
  };
  pedidos.push(nuevoPedido);
  return nuevoPedido;
};

export const actualizarPedido = (id, datosActualizados) => {
  const index = pedidos.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    pedidos[index] = { ...pedidos[index], ...datosActualizados };
    return pedidos[index];
  }
  return null;
};

export const eliminarPedido = (id) => {
  const index = pedidos.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    const eliminado = pedidos.splice(index, 1);
    return eliminado[0];
  }
  return null;
};

// ============= UTILIDADES =============

export const obtenerCategorias = () => {
  const categorias = [...new Set(productos.map(p => p.categoria))];
  return categorias;
};

export const calcularPrecioConDescuento = (producto) => {
  if (producto.enOferta && producto.descuento > 0) {
    return Math.round(producto.precio * (1 - producto.descuento / 100));
  }
  return producto.precio;
};

export const buscarProductos = (termino) => {
  const terminoLower = termino.toLowerCase();
  return productos.filter(p => 
    p.nombre.toLowerCase().includes(terminoLower) ||
    p.descripcion.toLowerCase().includes(terminoLower)
  );
};