import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import Checkout from "./pages/Checkout";
import Boleta from "./pages/Boleta";


// Admin
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProductos from "./pages/admin/AdminProductos";
import AdminProductoForm from "./pages/admin/AdminProductoForm";
import AdminPedidos from "./pages/admin/AdminPedidos";
import AdminShell from "./components/admin/AdminShell";

function RequireRole({ roles, children }) {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("usuarioActual"));
  } catch {}
  const role = user?.rol || "cliente";
  if (!roles.includes(role)) return <Navigate to="/" replace />;
  return children;
}

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
            <Route path="checkout" element={<Checkout />} />
            <Route path="boleta" element={<Boleta />} />
          </Route>

          {/* Admin con layout */}
          <Route
            path="/admin"
            element={
              <RequireRole roles={["administrador", "vendedor"]}>
                <AdminShell />
              </RequireRole>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route
              path="productos"
              element={
                <RequireRole roles={["administrador"]}>
                  <AdminProductos />
                </RequireRole>
              }
            />
            <Route
              path="productos/nuevo"
              element={
                <RequireRole roles={["administrador"]}>
                  <AdminProductoForm />
                </RequireRole>
              }
            />
            <Route
              path="productos/editar/:id"
              element={
                <RequireRole roles={["administrador"]}>
                  <AdminProductoForm />
                </RequireRole>
              }
            />
            <Route path="pedidos" element={<AdminPedidos />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
