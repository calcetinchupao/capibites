import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "../styles/nav.css";

export default function Layout() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <>
      <header className="site-header">
        <div className="header-content">
          <h1 className="site-title">Capibites</h1>
          <p className="site-subtitle">Tu tienda ideal para ir a comer en familia 🍔</p>
        </div>

        <button className="boton-menu" onClick={toggleMenu}>
          ☰
        </button>

        <nav className={`navegacion ${menuAbierto ? "active" : ""}`}>
          <Link to="/" onClick={cerrarMenu}>Inicio</Link>
          <Link to="/productos" onClick={cerrarMenu}>Productos</Link>
          <Link to="/categorias" onClick={cerrarMenu}>Categorías</Link>
          <Link to="/contacto" onClick={cerrarMenu}>Contacto</Link>
          <Link to="/nosotros" onClick={cerrarMenu}>Nosotros</Link>
          <Link to="/blogs" onClick={cerrarMenu}>Blogs</Link>
          <Link to="/iniciar-sesion" onClick={cerrarMenu}>Iniciar Sesión</Link>
          <Link to="/registrarse" onClick={cerrarMenu}>Registrarse</Link>

          {/* 🛒 Enlace al carrito */}
          <Link to="/carrito" onClick={cerrarMenu} className="carrito-link">
            🛒 Carrito
          </Link>
        </nav>
      </header>

      <main>
        {/* Aquí se renderizan las páginas hijas */}
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Capibites — Todos los derechos reservados.</p>
      </footer>
    </>
  );
}
