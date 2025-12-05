import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../styles/admin.css";

export default function AdminShell() {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("usuarioActual"));
  } catch {}
  const role = user?.rol || "cliente";

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar" role="navigation" aria-label="Admin">
        <div className="admin-brand">
          <span className="material-icons-round" aria-hidden="true">dashboard</span>
          <span>Administración</span>
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin" end>
            <span className="material-icons-round" aria-hidden="true">dashboard</span>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/pedidos">
            <span className="material-icons-round" aria-hidden="true">receipt_long</span>
            <span>Órdenes</span>
          </NavLink>
          {role === "administrador" && (
            <NavLink to="/admin/productos">
              <span className="material-icons-round" aria-hidden="true">inventory_2</span>
              <span>Productos</span>
            </NavLink>
          )}
        </nav>
      </aside>
      <section className="admin-main">
        <Outlet />
      </section>
    </div>
  );
}
