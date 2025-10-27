// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { obtenerProductos, obtenerPedidos } from "../../data/data";
import "../../styles/admin.css";

function AdminDashboard() {
  const [estadisticas, setEstadisticas] = useState({
    totalProductos: 0,
    totalPedidos: 0,
    productosEnOferta: 0,
    pedidosPendientes: 0
  });

  useEffect(() => {
    const productos = obtenerProductos();
    const pedidos = obtenerPedidos();

    setEstadisticas({
      totalProductos: productos.length,
      totalPedidos: pedidos.length,
      productosEnOferta: productos.filter(p => p.enOferta).length,
      pedidosPendientes: pedidos.filter(p => p.estado === "pendiente").length
    });
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Panel de Administración</h1>
        <p>Bienvenido al sistema de gestión de Capibites</p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{estadisticas.totalProductos}</h3>
            <p>Total Productos</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🛍️</div>
          <div className="stat-info">
            <h3>{estadisticas.totalPedidos}</h3>
            <p>Total Pedidos</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-info">
            <h3>{estadisticas.productosEnOferta}</h3>
            <p>Productos en Oferta</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{estadisticas.pedidosPendientes}</h3>
            <p>Pedidos Pendientes</p>
          </div>
        </div>
      </div>

      {/* Accesos rápidos */}
      <div className="quick-access">
        <h2>Accesos Rápidos</h2>
        <div className="access-grid">
          <Link to="/admin/productos" className="access-card">
            <span className="access-icon">📦</span>
            <h3>Gestionar Productos</h3>
            <p>Crear, editar y eliminar productos</p>
          </Link>

          <Link to="/admin/pedidos" className="access-card">
            <span className="access-icon">📋</span>
            <h3>Ver Pedidos</h3>
            <p>Administrar pedidos de clientes</p>
          </Link>

          <Link to="/admin/productos/nuevo" className="access-card">
            <span className="access-icon">➕</span>
            <h3>Nuevo Producto</h3>
            <p>Agregar un producto nuevo</p>
          </Link>

          <Link to="/" className="access-card">
            <span className="access-icon">🏠</span>
            <h3>Volver a la Tienda</h3>
            <p>Ver sitio público</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;