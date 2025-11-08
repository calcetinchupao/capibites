import React from "react";
import { useCart } from "../context/CartContext";
import { obtenerProductos, calcularPrecioConDescuento } from "../data/data";

const Productos = () => {
  const { addToCart } = useCart();
  const productos = obtenerProductos();

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5 fw-bold">🍔 Nuestros Productos</h2>

      <div className="row g-4">
        {productos.map((producto) => {
          const precioFinal = calcularPrecioConDescuento(producto);

          return (
            <div key={producto.id} className="col-12 col-sm-6 col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={producto.imagen}
                  className="card-img-top rounded-top"
                  alt={producto.nombre}
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title text-center fw-bold mb-2">
                      {producto.nombre}
                    </h5>
                    <p className="text-muted small text-center">
                      {producto.descripcion}
                    </p>

                    <div className="text-center mt-3">
                      {producto.enOferta ? (
                        <>
                          <p className="text-danger fw-bold mb-1">
                            ${precioFinal.toLocaleString("es-CL")}
                          </p>
                          <p className="text-muted text-decoration-line-through small">
                            ${producto.precio.toLocaleString("es-CL")}
                          </p>
                        </>
                      ) : (
                        <p className="fw-bold mb-1">
                          ${producto.precio.toLocaleString("es-CL")}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    className="btn btn-success mt-3 w-100 fw-bold"
                    onClick={() => addToCart(producto)}
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
