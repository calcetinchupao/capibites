import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles/nav.css";

export default function Layout() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioActual"));
    setUsuario(user);
  }, []);

  const logout = () => {
    localStorage.removeItem("usuarioActual");
    setUsuario(null);
    navigate("/");
  };

  return (
    <>
      <header className="site-header">
        <h1 className="site-title">Capibites</h1>
        <p className="site-subtitle">Tu tienda ideal para ir a comer en familia</p>
        <button className="boton" onClick={() => setMenuAbierto(!menuAbierto)}>☰</button>

        <nav className={`navegacion ${menuAbierto ? "active" : ""}`}>
          <Link to="/" onClick={() => setMenuAbierto(false)}>Inicio</Link>
          <Link to="/productos" onClick={() => setMenuAbierto(false)}>Productos</Link>
          <Link to="/categorias" onClick={() => setMenuAbierto(false)}>Categorías</Link>
          <Link to="/contacto" onClick={() => setMenuAbierto(false)}>Contacto</Link>
          <Link to="/carrito" onClick={() => setMenuAbierto(false)}>🛒 Carrito</Link>

          {usuario ? (
            <>
              <span className="ms-2">👋 {usuario.nombre}</span>
              <button onClick={logout} className="btn btn-link text-danger">Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link to="/iniciar-sesion" onClick={() => setMenuAbierto(false)}>Iniciar sesión</Link>
              <Link to="/registrarse" onClick={() => setMenuAbierto(false)}>Registrarse</Link>
            </>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
