import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { calcularPrecioConDescuento } from "../data/data";
import { productsApi } from "../services/api";
import "../styles/productos.css";

const Productos = () => {
  const { addToCart } = useCart();
  const [productos, setProductos] = useState([]);
  const [errorApi, setErrorApi] = useState(false);

  useEffect(() => {
    productsApi
      .list()
      .then((data) => {
        setProductos(Array.isArray(data) ? data : []);
        setErrorApi(false);
      })
      .catch(() => {
        setProductos([]);
        setErrorApi(true);
      });
  }, []);

  return (
    <div className="productos-page">
      <header className="productos-header">
        <h2 className="productos-title">Nuestros Productos</h2>
        <p className="productos-subtitle">Calidad, sabor y frescura en cada bocado</p>
      </header>

      {errorApi && (
        <div className="productos-alert" role="alert">
          No se pudo cargar la lista de productos. Intenta recargar más tarde.
        </div>
      )}

      <section className="productos-grid">
        {productos.map((producto) => {
          const precioFinal = calcularPrecioConDescuento(producto);

          return (
            <article key={producto.id} className="producto-card" tabIndex="0">
              <div className="producto-media">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="producto-img"
                  loading="lazy"
                />
                {producto.enOferta && (
                  <span className="producto-badge">-{producto.descuento}%</span>
                )}
              </div>

              <div className="producto-body">
                <h3 className="producto-nombre">{producto.nombre}</h3>
                <p className="producto-descripcion">{producto.descripcion}</p>

                <div className="producto-precio">
                  {producto.enOferta ? (
                    <>
                      <span className="precio-final">${precioFinal.toLocaleString("es-CL")}</span>
                      <span className="precio-original">${producto.precio.toLocaleString("es-CL")}</span>
                    </>
                  ) : (
                    <span className="precio-final">${producto.precio.toLocaleString("es-CL")}</span>
                  )}
                </div>

                <button
                  className="producto-btn"
                  onClick={() => addToCart(producto)}
                >
                  <span className="material-icons-round" aria-hidden="true">add_shopping_cart</span>
                  Agregar al Carrito
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default Productos;
