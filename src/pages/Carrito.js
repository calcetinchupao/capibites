import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // <-- usa el hook
import "../styles/carrito.css";

const Carrito = () => {
   const { cart, removeFromCart, clearCart } = useCart(); 

  // Si el carrito no existe o está vacío
  if (!cart || cart.length === 0) {
    return (
      <div className="container carrito-vacio" style={{ paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-6)' }}>
        <h2>Tu carrito está vacío 🛒</h2>
        <p>Agrega productos desde la página de productos.</p>
        <Link to="/productos" className="btn btn--primary">
          Ir a productos
        </Link>
      </div>
    );
  }

  // Calcular el total
  const total = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div className="container carrito-page" style={{ paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-6)' }}>
      <h1 style={{ fontSize: 'var(--fs-xl)', marginBottom: 'var(--space-5)' }}>🛍️ Tu Carrito de Compras</h1>

      <ul className="carrito-lista">
        {cart.map((item) => (
          <li key={item.id} className="carrito-item">
            <img src={item.imagen} alt={item.nombre} />
            <div className="carrito-detalle">
              <h3>{item.nombre}</h3>
              <p>Cantidad: {item.cantidad}</p>
              <p>Precio: ${item.precio.toLocaleString("es-CL")}</p>
              <p>
                Subtotal: ${(item.precio * item.cantidad).toLocaleString("es-CL")}
              </p>
            </div>
            <button
              className="btn btn--danger"
              onClick={() => removeFromCart(item.id)}
              aria-label={`Eliminar ${item.nombre} del carrito`}
            >
              ❌ Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className="carrito-total">
        <h2 style={{ fontSize: 'var(--fs-lg)' }}>Total: ${total.toLocaleString("es-CL")}</h2>
        <div className="carrito-acciones">
          <button className="btn" onClick={clearCart}>
            Vaciar carrito
          </button>
          <Link to="/checkout" className="btn btn--primary">
            Finalizar compra
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
