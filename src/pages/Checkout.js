import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { ordersApi } from "../services/api";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    comuna: "",
    notasAdicionales: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calcularTotal = () => {
    return cart.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Tu carrito está vacío 😅");
      return;
    }

    if (!formData.nombre || !formData.email || !formData.direccion) {
      alert("Por favor completa los campos obligatorios 📝");
      return;
    }

    const nuevoPedido = {
      productos: cart,
      total: calcularTotal(),
      datosEnvio: formData,
    };

    ordersApi
      .create(nuevoPedido)
      .then((order) => {
        try { localStorage.setItem("ultimaBoleta", JSON.stringify(order)); } catch {}
        clearCart();
        navigate("/boleta", { state: { order } });
      })
      .catch((err) => {
        alert("❌ Error al crear el pedido. Intenta nuevamente.");
        console.error(err);
      });
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">🧾 Finalizar Compra</h2>

      <div className="row">
        {/* Columna izquierda - Formulario */}
        <div className="col-md-6">
          <h4 className="mb-3">Datos de Envío</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre completo *</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Correo electrónico *</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="tel"
                className="form-control"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Dirección *</label>
              <input
                type="text"
                className="form-control"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Comuna</label>
              <input
                type="text"
                className="form-control"
                name="comuna"
                value={formData.comuna}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Notas adicionales</label>
              <textarea
                className="form-control"
                rows="3"
                name="notasAdicionales"
                value={formData.notasAdicionales}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-100 mt-3">
              🛍️ Confirmar Pedido
            </button>
          </form>
        </div>

        {/* Columna derecha - Resumen */}
        <div className="col-md-6">
          <h4 className="mb-3">Resumen del Pedido</h4>
          {cart.length > 0 ? (
            <ul className="list-group mb-3">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{item.nombre}</strong>
                    <br />
                    <small>x {item.cantidad}</small>
                  </div>
                  <span>${(item.precio * item.cantidad).toLocaleString("es-CL")}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <strong>Total:</strong>
                <span className="fw-bold">
                  ${calcularTotal().toLocaleString("es-CL")}
                </span>
              </li>
            </ul>
          ) : (
            <p>No hay productos en tu carrito.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
