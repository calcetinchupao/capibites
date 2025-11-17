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
        <div className="container header-inner">
          <div className="brand">
            <h1 className="site-title">Capibites</h1>
            <p className="site-subtitle">Tu tienda ideal para ir a comer en familia</p>
          </div>

          <button
            className="menu-toggle"
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuAbierto}
            aria-controls="primary-nav"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <nav id="primary-nav" className={`navegacion ${menuAbierto ? "active" : ""}`} aria-label="Principal">
            <ul className="nav-list">
              <li><Link className="nav-link" to="/" onClick={() => setMenuAbierto(false)}>Inicio</Link></li>
              <li><Link className="nav-link" to="/productos" onClick={() => setMenuAbierto(false)}>Productos</Link></li>
              <li><Link className="nav-link" to="/categorias" onClick={() => setMenuAbierto(false)}>Categorías</Link></li>
              <li><Link className="nav-link" to="/contacto" onClick={() => setMenuAbierto(false)}>Contacto</Link></li>
              <li>
                <Link className="nav-link" to="/carrito" onClick={() => setMenuAbierto(false)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M7 4h-2l-1 2m0 0l3 9h10l3-7H6m-2-2h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="sr-only">Carrito</span>
                </Link>
              </li>
            </ul>
            <div className="nav-actions">
              {usuario ? (
                <>
                  <span className="user-greeting">{usuario.nombre}</span>
                  <button onClick={logout} className="btn btn--primary">Cerrar sesión</button>
                </>
              ) : (
                <>
                  <Link className="btn" to="/iniciar-sesion" onClick={() => setMenuAbierto(false)}>Iniciar sesión</Link>
                  <Link className="btn btn--primary" to="/registrarse" onClick={() => setMenuAbierto(false)}>Registrarse</Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
}
