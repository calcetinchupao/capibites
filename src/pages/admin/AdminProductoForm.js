// src/pages/admin/AdminProductoForm.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { crearProducto, actualizarProducto, obtenerProductoPorId } from "../../data/data";
import "../../styles/admin.css";

function AdminProductoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    descripcion: "",
    imagen: "",
    enOferta: false,
    descuento: 0,
    stock: 0
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (esEdicion) {
      const producto = obtenerProductoPorId(id);
      if (producto) {
        setFormData(producto);
      } else {
        alert("Producto no encontrado");
        navigate("/admin/productos");
      }
    }
  }, [id, esEdicion, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio";
    }

    if (!formData.categoria) {
      nuevosErrores.categoria = "La categoría es obligatoria";
    }

    if (!formData.precio || formData.precio <= 0) {
      nuevosErrores.precio = "El precio debe ser mayor a 0";
    }

    if (!formData.descripcion.trim()) {
      nuevosErrores.descripcion = "La descripción es obligatoria";
    }

    if (!formData.imagen.trim()) {
      nuevosErrores.imagen = "La imagen es obligatoria";
    }

    if (formData.stock < 0) {
      nuevosErrores.stock = "El stock no puede ser negativo";
    }

    if (formData.enOferta && (formData.descuento <= 0 || formData.descuento > 100)) {
      nuevosErrores.descuento = "El descuento debe estar entre 1 y 100";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    const datos = {
      ...formData,
      precio: parseFloat(formData.precio),
      stock: parseInt(formData.stock),
      descuento: parseInt(formData.descuento)
    };

    if (esEdicion) {
      actualizarProducto(id, datos);
      alert("Producto actualizado correctamente");
    } else {
      crearProducto(datos);
      alert("Producto creado correctamente");
    }

    navigate("/admin/productos");
  };

  return (
    <div className="admin-form-page">
      <div className="admin-form-header">
        <h1>{esEdicion ? "Editar Producto" : "Nuevo Producto"}</h1>
        <p>{esEdicion ? "Modifica los datos del producto" : "Completa el formulario para agregar un nuevo producto"}</p>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-grid">
          {/* Nombre */}
          <div className="form-group">
            <label htmlFor="nombre">Nombre del producto *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={errores.nombre ? "error" : ""}
            />
            {errores.nombre && <span className="error-mensaje">{errores.nombre}</span>}
          </div>

          {/* Categoría */}
          <div className="form-group">
            <label htmlFor="categoria">Categoría *</label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className={errores.categoria ? "error" : ""}
            >
              <option value="">Selecciona una categoría</option>
              <option value="hamburguesas">Hamburguesas</option>
              <option value="completos">Completos</option>
              <option value="acompañamientos">Acompañamientos</option>
              <option value="bebidas">Bebidas</option>
              <option value="combos">Combos</option>
            </select>
            {errores.categoria && <span className="error-mensaje">{errores.categoria}</span>}
          </div>

          {/* Precio */}
          <div className="form-group">
            <label htmlFor="precio">Precio *</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              min="0"
              step="1"
              className={errores.precio ? "error" : ""}
            />
            {errores.precio && <span className="error-mensaje">{errores.precio}</span>}
          </div>

          {/* Stock */}
          <div className="form-group">
            <label htmlFor="stock">Stock *</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className={errores.stock ? "error" : ""}
            />
            {errores.stock && <span className="error-mensaje">{errores.stock}</span>}
          </div>

          {/* Descripción */}
          <div className="form-group full-width">
            <label htmlFor="descripcion">Descripción *</label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="3"
              className={errores.descripcion ? "error" : ""}
            ></textarea>
            {errores.descripcion && <span className="error-mensaje">{errores.descripcion}</span>}
          </div>

          {/* Imagen */}
          <div className="form-group full-width">
            <label htmlFor="imagen">URL de la imagen *</label>
            <input
              type="text"
              id="imagen"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              placeholder="/img/producto.jpg"
              className={errores.imagen ? "error" : ""}
            />
            {errores.imagen && <span className="error-mensaje">{errores.imagen}</span>}
            {formData.imagen && (
              <img src={formData.imagen} alt="Preview" className="imagen-preview" />
            )}
          </div>

          {/* En Oferta */}
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="enOferta"
                checked={formData.enOferta}
                onChange={handleChange}
              />
              Producto en oferta
            </label>
          </div>

          {/* Descuento (solo si está en oferta) */}
          {formData.enOferta && (
            <div className="form-group">
              <label htmlFor="descuento">Descuento (%) *</label>
              <input
                type="number"
                id="descuento"
                name="descuento"
                value={formData.descuento}
                onChange={handleChange}
                min="1"
                max="100"
                className={errores.descuento ? "error" : ""}
              />
              {errores.descuento && <span className="error-mensaje">{errores.descuento}</span>}
            </div>
          )}
        </div>

        <div className="form-acciones">
          <Link to="/admin/productos" className="btn-cancelar">
            Cancelar
          </Link>
          <button type="submit" className="btn-guardar">
            {esEdicion ? "Actualizar Producto" : "Crear Producto"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminProductoForm;