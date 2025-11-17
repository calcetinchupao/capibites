// src/pages/Categorias.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerProductos, obtenerCategorias } from "../data/data";
import "../styles/categorias.css";

function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Obtener todas las categorías únicas
        const cats = obtenerCategorias();

        // Contar productos por categoría
        const productos = obtenerProductos();
        const categoriasConDatos = cats.map(cat => {
            const productosCategoria = productos.filter(p => p.categoria === cat);
            const productoDestacado = productosCategoria[0]; // Primer producto como destacado

            return {
                nombre: cat,
                cantidad: productosCategoria.length,
                imagen: productoDestacado?.imagen || "/img/default.jpg",
                descripcion: obtenerDescripcionCategoria(cat)
            };
        });

        setCategorias(categoriasConDatos);
    }, []);

    const obtenerDescripcionCategoria = (categoria) => {
        const descripciones = {
            hamburguesas: "Deliciosas hamburguesas con carne de primera calidad",
            completos: "Los mejores completos al estilo chileno",
            acompañamientos: "Papas fritas y más para complementar tu comida",
            bebidas: "Refrescos y bebidas para acompañar",
            combos: "Combos familiares y personales al mejor precio"
        };
        return descripciones[categoria] || "Productos de calidad para ti";
    };

    const irACategoria = (categoria) => {
        // Redirigir a productos con filtro de categoría
        navigate(`/productos?categoria=${categoria}`);
    };

    const capitalizarPrimeraLetra = (texto) => {
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    };

    return (
        <div className="categorias-page">
            <div className="categorias-header container">
                <h1>Nuestras Categorías</h1>
                <p>Explora todos nuestros productos organizados por categoría</p>
            </div>

            <div className="categorias-grid container">
                {categorias.map((categoria) => (
                    <article
                        key={categoria.nombre}
                        className="categoria-card"
                        onClick={() => irACategoria(categoria.nombre)}
                    >
                        <div className="categoria-imagen-container">
                            <img
                                src={categoria.imagen}
                                alt={categoria.nombre}
                                className="categoria-imagen"
                            />
                            <div className="categoria-overlay">
                                <span className="ver-productos">Ver productos</span>
                            </div>
                        </div>

                        <div className="categoria-info">
                            <h2>{capitalizarPrimeraLetra(categoria.nombre)}</h2>
                            <p className="categoria-descripcion">{categoria.descripcion}</p>
                            <span className="cantidad-productos">
                                {categoria.cantidad} {categoria.cantidad === 1 ? 'producto' : 'productos'}
                            </span>
                        </div>
                    </article>
                ))}
            </div>

            {categorias.length === 0 && (
                <p className="sin-categorias">No hay categorías disponibles</p>
            )}
        </div>
    );
}

export default Categorias;