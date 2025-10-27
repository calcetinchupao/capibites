import React from "react";
import { useCart } from "../context/CartContext";
import { calcularPrecioConDescuento } from "../data/data";

const Carrito = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  // Calcular total del carrito
  const total = cartItems.reduce((acc, item) => {
    const precioFinal = calcularPrecioConDescuento(item);
    return acc + precioFinal * item.cantidad;
  }, 0);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🛍️ Carrito de Compras</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-info">
          Tu carrito está vacío. Agrega algunos productos para comenzar 😋
        </div>
      ) : (
        <>
          <ul className="list-group mb-4">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <div>
                    <h6 className="mb-1">{item.nombre}</h6>
                    <small>
                      Cantidad: {item.cantidad} | Precio: $
                      {calcularPrecioConDescuento(item).toLocaleString("es-CL")}
                    </small>
                  </div>
                </div>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  ❌ Eliminar
                </button>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>
              Total:{" "}
              <strong>${Math.round(total).toLocaleString("es-CL")}</strong>
            </h5>
            <div>
              <button className="btn btn-secondary me-2" onClick={clearCart}>
                Vaciar Carrito
              </button>
              <button className="btn btn-success">Proceder al Pago 💳</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
