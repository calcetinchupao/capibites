import React from "react";
import { useCart } from "../context/CartContext";
import { obtenerProductos, calcularPrecioConDescuento } from "../data/data";

const Productos = () => {
  const { addToCart } = useCart();
  const productos = obtenerProductos();

  return (
    <div className="container" style={{ paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-6)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-6)', fontSize: 'var(--fs-xl)' }}>🍔 Nuestros Productos</h2>

      <div className="grid grid--3">
        {productos.map((producto) => {
          const precioFinal = calcularPrecioConDescuento(producto);

          return (
            <article key={producto.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <img
                src={producto.imagen}
                alt={producto.nombre}
                style={{ height: '200px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
              />

              <div>
                <h3 style={{ textAlign: 'center', margin: 0, fontSize: 'var(--fs-lg)' }}>{producto.nombre}</h3>
                <p style={{ color: 'var(--color-muted)', fontSize: 'var(--fs-sm)', textAlign: 'center', marginTop: 'var(--space-2)' }}>
                  {producto.descripcion}
                </p>
                <div style={{ textAlign: 'center', marginTop: 'var(--space-3)' }}>
                  {producto.enOferta ? (
                    <>
                      <p style={{ color: 'var(--color-danger)', fontWeight: 700, margin: 0 }}>
                        ${precioFinal.toLocaleString("es-CL")}
                      </p>
                      <p style={{ color: 'var(--color-muted)', textDecoration: 'line-through', fontSize: 'var(--fs-sm)', margin: 0 }}>
                        ${producto.precio.toLocaleString("es-CL")}
                      </p>
                    </>
                  ) : (
                    <p style={{ fontWeight: 700, margin: 0 }}>
                      ${producto.precio.toLocaleString("es-CL")}
                    </p>
                  )}
                </div>
              </div>

              <button
                className="btn btn--primary"
                onClick={() => addToCart(producto)}
                aria-label={`Agregar ${producto.nombre} al carrito`}
              >
                Agregar al carrito
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Productos;
