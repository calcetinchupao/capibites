import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import "../styles/nav.css";

export default function Layout() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioActual"));
    setUsuario(user);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioActual"));
    setUsuario(user);
  }, [location.pathname]);

  useEffect(() => {
    const handler = () => {
      const user = JSON.parse(localStorage.getItem("usuarioActual"));
      setUsuario(user);
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const logout = () => {
    localStorage.removeItem("usuarioActual");
    try { localStorage.removeItem("authToken"); } catch {}
    setUsuario(null);
    navigate("/");
  };

  return (
    <>
      <header className="site-header">
        <h1 className="site-title">Capibites</h1>
        <p className="site-subtitle">Tu tienda ideal para ir a comer en familia</p>
        <button className="boton" onClick={() => setMenuAbierto(!menuAbierto)}>☰</button>

        <nav className={`navegacion ${menuAbierto ? "active" : ""}`} aria-label="Principal">
          <NavLink to="/" end onClick={() => setMenuAbierto(false)}>Inicio</NavLink>
          <NavLink to="/productos" onClick={() => setMenuAbierto(false)}>Productos</NavLink>
          <NavLink to="/categorias" onClick={() => setMenuAbierto(false)}>Categorías</NavLink>
          <NavLink to="/contacto" onClick={() => setMenuAbierto(false)}>Contacto</NavLink>
          <NavLink to="/carrito" onClick={() => setMenuAbierto(false)}><span className="material-icons-round" aria-hidden="true">shopping_cart</span> Carrito</NavLink>

          {usuario ? (
            <>
              <span className="ms-2">👋 {usuario.nombre}</span>
              <span className="badge ms-2" style={{ background: "#eee", color: "#000", borderRadius: 6, padding: "4px 8px" }}>{usuario.rol}</span>
              <button onClick={logout} className="btn btn-link text-danger">Cerrar sesión</button>
            </>
          ) : (
            <>
              <NavLink to="/iniciar-sesion" onClick={() => setMenuAbierto(false)}>Iniciar sesión</NavLink>
              <NavLink to="/registrarse" onClick={() => setMenuAbierto(false)}>Registrarse</NavLink>
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
