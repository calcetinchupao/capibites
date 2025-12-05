// src/pages/admin/AdminProductos.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productsApi } from "../../services/api";
import "../../styles/admin.css";

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    productsApi
      .adminList()
      .then((data) => setProductos(Array.isArray(data) ? data : []))
      .catch(() => setProductos([]));
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      productsApi
        .adminDelete(id)
        .then(() => {
          cargarProductos();
          alert("Producto eliminado correctamente");
        })
        .catch(() => alert("No se pudo eliminar el producto"));
    }
  };

  const toggleOferta = (producto) => {
    productsApi
      .adminUpdate(producto.id, { enOferta: !producto.enOferta })
      .then(() => cargarProductos())
      .catch(() => alert("No se pudo actualizar la oferta"));
  };

  const formatearPrecio = (precio) => {
    return `$${precio.toLocaleString('es-CL')}`;
  };

  // Filtrar productos
  const productosFiltrados = productos.filter(p => {
    const cumpleBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const cumpleCategoria = filtroCategoria === "todas" || p.categoria === filtroCategoria;
    return cumpleBusqueda && cumpleCategoria;
  });

  const categorias = ["todas", ...new Set(productos.map(p => p.categoria))];

  return (
    <div className="admin-productos">
      <div className="admin-header">
        <div>
          <h1>Gestión de Productos</h1>
          <p>Administra el catálogo de productos</p>
        </div>
        <Link to="/admin/productos/nuevo" className="btn-nuevo">
          <span className="material-icons-round" aria-hidden="true">add</span> Nuevo Producto
        </Link>
      </div>

      {/* Filtros */}
      <div className="admin-filtros">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="admin-busqueda"
        />
        
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="admin-select"
        >
          {categorias.map(cat => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla de productos */}
      <div className="admin-tabla-container">
        <table className="admin-tabla">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Oferta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map(producto => (
              <tr key={producto.id}>
                <td>
                  <img 
                    src={producto.imagen} 
                    alt={producto.nombre}
                    className="tabla-imagen"
                  />
                </td>
                <td>
                  <strong>{producto.nombre}</strong>
                  <br />
                  <small className="tabla-descripcion">{producto.descripcion}</small>
                </td>
                <td>
                  <span className="badge-categoria">{producto.categoria}</span>
                </td>
                <td>
                  {formatearPrecio(producto.precio)}
                  {producto.enOferta && (
                    <div className="tabla-descuento">-{producto.descuento}%</div>
                  )}
                </td>
                <td>
                  <span className={producto.stock < 10 ? "stock-bajo" : "stock-ok"}>
                    {producto.stock}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => toggleOferta(producto)}
                    className={`btn-toggle ${producto.enOferta ? 'activo' : ''}`}
                  >
                    {producto.enOferta ? '✅ Sí' : '❌ No'}
                  </button>
                </td>
                <td className="tabla-acciones">
              <Link
                to={`/admin/productos/editar/${producto.id}`}
                className="btn-editar"
                title="Editar"
              >
                    <span className="material-icons-round" aria-hidden="true">edit</span>
                  </Link>
                  <button
                    onClick={() => handleEliminar(producto.id)}
                    className="btn-eliminar"
                    title="Eliminar"
                  >
                    <span className="material-icons-round" aria-hidden="true">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {productosFiltrados.length === 0 && (
          <p className="sin-resultados">No se encontraron productos</p>
        )}
      </div>

      <div className="admin-footer">
        <Link to="/admin" className="btn-volver">← Volver al Dashboard</Link>
        <p className="total-productos">Total: {productosFiltrados.length} productos</p>
      </div>
    </div>
  );
}

export default AdminProductos;
