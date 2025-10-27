import React from "react";
import { useCart } from "../context/CartContext";
import { obtenerProductos, calcularPrecioConDescuento } from "../data/data";

const Productos = () => {
  const { addToCart } = useCart();
  const productos = obtenerProductos();

  return (
    <div className="container mt-4">
      <h2 className="mb-4">🍔 Nuestros Productos</h2>

      <div className="row">
        {productos.map((producto) => {
          const precioFinal = calcularPrecioConDescuento(producto);

          return (
            <div key={producto.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={producto.imagen}
                  className="card-img-top"
                  alt={producto.nombre}
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-text">{producto.descripcion}</p>

                    {producto.enOferta ? (
                      <p className="text-danger fw-bold">
                        Oferta: ${precioFinal.toLocaleString("es-CL")}{" "}
                        <span className="text-muted text-decoration-line-through">
                          ${producto.precio.toLocaleString("es-CL")}
                        </span>
                      </p>
                    ) : (
                      <p className="fw-bold">
                        Precio: ${producto.precio.toLocaleString("es-CL")}
                      </p>
                    )}
                  </div>

                  <button
                    className="btn btn-success mt-2"
                    onClick={() => addToCart(producto, 1)}
                  >
                    🛒 Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Productos;
