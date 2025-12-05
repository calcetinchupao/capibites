// src/pages/admin/AdminPedidos.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { adminOrdersApi } from "../../services/api";
import "../../styles/admin.css";

function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("todos");

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = () => {
    adminOrdersApi
      .list()
      .then((data) => setPedidos(Array.isArray(data) ? data : []))
      .catch(() => setPedidos([]));
  };

  const cambiarEstado = (id, nuevoEstado) => {
    adminOrdersApi
      .updateStatus(id, nuevoEstado)
      .then(() => {
        cargarPedidos();
        alert(`Pedido actualizado a: ${nuevoEstado}`);
      })
      .catch(() => alert("No se pudo actualizar el estado"));
  };

  const formatearPrecio = (precio) => {
    return `$${Math.round(precio).toLocaleString('es-CL')}`;
  };

  const formatearFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleString('es-CL');
  };

  // Filtrar pedidos
  const pedidosFiltrados = pedidos.filter(p => {
    if (filtroEstado === "todos") return true;
    return p.estado === filtroEstado;
  });

  const getEstadoColor = (estado) => {
    const colores = {
      pendiente: "estado-pendiente",
      preparando: "estado-preparando",
      enviado: "estado-enviado",
      entregado: "estado-entregado",
      cancelado: "estado-cancelado"
    };
    return colores[estado] || "";
  };

  return (
    <div className="admin-pedidos">
      <div className="admin-header">
        <div>
          <h1>Gestión de Pedidos</h1>
          <p>Administra los pedidos de los clientes</p>
        </div>
      </div>

      {/* Filtro de estado */}
      <div className="admin-filtros">
        <label>Filtrar por estado:</label>
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="admin-select"
        >
          <option value="todos">Todos</option>
          <option value="pendiente">Pendientes</option>
          <option value="preparando">Preparando</option>
          <option value="enviado">Enviados</option>
          <option value="entregado">Entregados</option>
          <option value="cancelado">Cancelados</option>
        </select>
      </div>

      {/* Lista de pedidos */}
      <div className="pedidos-lista">
        {pedidosFiltrados.length > 0 ? (
          pedidosFiltrados.map(pedido => (
            <div key={pedido.id} className="pedido-card">
              <div className="pedido-header">
                <div>
                  <h3>Pedido #{pedido.id}</h3>
                  <p className="pedido-fecha">{formatearFecha(pedido.fecha)}</p>
                </div>
                <div className="pedido-total">
                  {formatearPrecio(pedido.total)}
                </div>
              </div>

              <div className="pedido-estado">
                <span className={`badge-estado ${getEstadoColor(pedido.estado)}`}>
                  {pedido.estado.toUpperCase()}
                </span>
              </div>

              {/* Datos del cliente */}
              <div className="pedido-cliente">
                <h4>Información del Cliente</h4>
                <p><strong>Nombre:</strong> {pedido.datosEnvio?.nombre || "No especificado"}</p>
                <p><strong>Email:</strong> {pedido.datosEnvio?.email || "No especificado"}</p>
                <p><strong>Teléfono:</strong> {pedido.datosEnvio?.telefono || "No especificado"}</p>
                <p><strong>Dirección:</strong> {pedido.datosEnvio?.direccion || "No especificado"}, {pedido.datosEnvio?.comuna || ""}</p>
                {pedido.datosEnvio?.notasAdicionales && (
                  <p><strong>Notas:</strong> {pedido.datosEnvio.notasAdicionales}</p>
                )}
              </div>

              {/* Productos */}
              <div className="pedido-productos">
                <h4>Productos ({pedido.productos?.length || 0})</h4>
                <div className="productos-resumen">
                  {pedido.productos?.map((item, index) => (
                    <div key={index} className="producto-item">
                      <img src={item.imagen} alt={item.nombre} />
                      <div>
                        <p className="producto-nombre">{item.nombre}</p>
                        <p className="producto-cantidad">Cantidad: {item.cantidad}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cambiar estado */}
              <div className="pedido-acciones">
                <label>Cambiar estado:</label>
                <select
                  value={pedido.estado}
                  onChange={(e) => cambiarEstado(pedido.id, e.target.value)}
                  className="select-estado"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="preparando">Preparando</option>
                  <option value="enviado">Enviado</option>
                  <option value="entregado">Entregado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <p className="sin-resultados">No hay pedidos {filtroEstado !== "todos" && `con estado "${filtroEstado}"`}</p>
        )}
      </div>

      <div className="admin-footer">
        <Link to="/admin" className="btn-volver">← Volver al Dashboard</Link>
        <p className="total-pedidos"><span className="material-icons-round" aria-hidden="true">list_alt</span> Total: {pedidosFiltrados.length} pedidos</p>
      </div>
    </div>
  );
}

export default AdminPedidos;