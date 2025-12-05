import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // <-- usa el hook
import "../styles/carrito.css";

const Carrito = () => {
   const { cart, removeFromCart, clearCart } = useCart(); 

  // Si el carrito no existe o está vacío
  if (!cart || cart.length === 0) {
    return (
      <div className="carrito-vacio">
        <h2>Tu carrito está vacío 🛒</h2>
        <p>Agrega productos desde la página de productos.</p>
        <Link to="/productos" className="btn-volver">
          Ir a Productos
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
    <div className="carrito-page">
      <h1>🛍️ Tu Carrito de Compras</h1>

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
              className="btn-eliminar"
              onClick={() => removeFromCart(item.id)}
            >
              ❌ Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className="carrito-total">
        <h2>Total: ${total.toLocaleString("es-CL")}</h2>
        <div className="carrito-acciones">
          <button className="btn-vaciar" onClick={clearCart}>
            Vaciar carrito
          </button>
          <Link to="/checkout" className="btn-comprar">
            Finalizar compra
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
