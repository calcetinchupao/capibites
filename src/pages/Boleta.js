import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Boleta() {
  const { state } = useLocation();
  const navigate = useNavigate();
  let order = state?.order;
  if (!order) {
    try { order = JSON.parse(localStorage.getItem("ultimaBoleta")); } catch {}
  }

  if (!order) {
    return (
      <div className="boleta-page">
        <div className="boleta-card">
          <h2>Boleta</h2>
          <p>No hay boleta disponible.</p>
          <button className="btn" onClick={() => navigate("/")}>Volver al inicio</button>
        </div>
      </div>
    );
  }

  const fecha = order.fecha ? new Date(order.fecha).toLocaleString("es-CL") : "";
  const items = Array.isArray(order.productos) ? order.productos : [];

  return (
    <div className="boleta-page">
      <div className="boleta-card">
        <div className="boleta-header">
          <h2>🧾 Boleta</h2>
          <div className="boleta-meta">
            <div><strong>Folio:</strong> {order.boletaFolio || order.id}</div>
            <div><strong>Fecha:</strong> {fecha}</div>
            <div><strong>Cliente:</strong> {order.datosEnvio?.nombre || ""}</div>
            <div><strong>Email:</strong> {order.datosEnvio?.email || ""}</div>
            <div><strong>Dirección:</strong> {order.datosEnvio?.direccion || ""}</div>
          </div>
        </div>

        <table className="boleta-items">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i}>
                <td>{it.nombre}</td>
                <td>{it.cantidad}</td>
                <td>${Math.round(it.precio).toLocaleString("es-CL")}</td>
                <td>${Math.round(it.precio * it.cantidad).toLocaleString("es-CL")}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" style={{ textAlign: "right", fontWeight: 700 }}>Total</td>
              <td style={{ fontWeight: 800 }}>
                ${Math.round(order.total).toLocaleString("es-CL")}
              </td>
            </tr>
          </tfoot>
        </table>

        <div className="boleta-actions">
          <button className="btn" onClick={() => window.print()}>Imprimir boleta</button>
          <button className="btn" onClick={() => navigate("/")}>Volver al inicio</button>
        </div>
      </div>
    </div>
  );
}

export default Boleta;
