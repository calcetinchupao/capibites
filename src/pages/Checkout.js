import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { crearPedido } from "../data/data";

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

    crearPedido(nuevoPedido);
    clearCart();
    alert("✅ ¡Pedido realizado con éxito!");
    navigate("/");
  };

  return (
    <div className="container" style={{ paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-6)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-6)', fontSize: 'var(--fs-xl)' }}>🧾 Finalizar Compra</h2>

      <div className="grid grid--2">
        <section>
          <h4 style={{ marginBottom: 'var(--space-3)' }}>Datos de Envío</h4>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Nombre completo *</label>
              <input
                type="text"
                className="input"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label className="label">Correo electrónico *</label>
              <input
                type="email"
                className="input"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label className="label">Teléfono</label>
              <input
                type="tel"
                className="input"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label className="label">Dirección *</label>
              <input
                type="text"
                className="input"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label className="label">Comuna</label>
              <input
                type="text"
                className="input"
                name="comuna"
                value={formData.comuna}
                onChange={handleChange}
              />
            </div>

            <div className="field">
              <label className="label">Notas adicionales</label>
              <textarea
                className="input"
                rows="3"
                name="notasAdicionales"
                value={formData.notasAdicionales}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn--primary" style={{ width: '100%', marginTop: 'var(--space-3)' }}>
              🛍️ Confirmar Pedido
            </button>
          </form>
        </section>

        <section>
          <h4 style={{ marginBottom: 'var(--space-3)' }}>Resumen del Pedido</h4>
          {cart.length > 0 ? (
            <div className="card">
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {cart.map((item) => (
                  <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid var(--color-border)`, paddingBottom: 'var(--space-3)' }}>
                    <div>
                      <strong>{item.nombre}</strong>
                      <br />
                      <small>x {item.cantidad}</small>
                    </div>
                    <span>${(item.precio * item.cantidad).toLocaleString("es-CL")}</span>
                  </li>
                ))}
                <li style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span>Total:</span>
                  <span>${calcularTotal().toLocaleString("es-CL")}</span>
                </li>
              </ul>
            </div>
          ) : (
            <p style={{ color: 'var(--color-muted)' }}>No hay productos en tu carrito.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default Checkout;
