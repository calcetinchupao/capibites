import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Categorias from "./pages/Categorias";
import Carrito from "./pages/Carrito";
import Contacto from "./pages/Contacto";
import Nosotros from "./pages/Nosotros";
import Blogs from "./pages/Blogs";
import IniciarSesion from "./pages/IniciarSesion";
import Registrarse from "./pages/Registrarse";

// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductos from "./pages/admin/AdminProductos";
import AdminProductoForm from "./pages/admin/AdminProductoForm";
import AdminPedidos from "./pages/admin/AdminPedidos";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="productos" element={<Productos />} />
            <Route path="categorias" element={<Categorias />} />
            <Route path="carrito" element={<Carrito />} />
            <Route path="contacto" element={<Contacto />} />
            <Route path="nosotros" element={<Nosotros />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="iniciar-sesion" element={<IniciarSesion />} />
            <Route path="registrarse" element={<Registrarse />} />
          </Route>

          {/* Rutas del admin (sin layout) */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/productos" element={<AdminProductos />} />
          <Route path="/admin/productos/nuevo" element={<AdminProductoForm />} />
          <Route path="/admin/productos/editar/:id" element={<AdminProductoForm />} />
          <Route path="/admin/pedidos" element={<AdminPedidos />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;