import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearUsuario, obtenerUsuarioPorEmail } from "../data/data";

const Registrarse = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    direccion: "",
    telefono: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obtenerUsuarioPorEmail(form.email)) {
      alert("⚠️ Ya existe una cuenta con este correo.");
      return;
    }

    const nuevoUsuario = crearUsuario(form);
    localStorage.setItem("usuarioActual", JSON.stringify(nuevoUsuario));

    alert("✅ ¡Registro exitoso! Bienvenido a Capibites 🍔");
    navigate("/");
  };

  return (
    <div className="container" style={{ maxWidth: "520px", paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-6)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-5)', fontSize: 'var(--fs-xl)' }}>📝 Crear Cuenta</h2>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Nombre completo</label>
          <input
            type="text"
            className="input"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label className="label">Correo electrónico</label>
          <input
            type="email"
            className="input"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label className="label">Contraseña</label>
          <input
            type="password"
            className="input"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="field">
          <label className="label">Dirección</label>
          <input
            type="text"
            className="input"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label className="label">Teléfono</label>
          <input
            type="tel"
            className="input"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn--primary" style={{ width: '100%', marginTop: 'var(--space-3)' }}>
          Registrarme
        </button>

        <p style={{ textAlign: 'center', marginTop: 'var(--space-3)' }}>
          ¿Ya tienes cuenta?{" "}
          <span
            style={{ color: 'var(--color-primary)', cursor: 'pointer' }}
            onClick={() => navigate("/iniciar-sesion")}
          >
            Inicia sesión
          </span>
        </p>
      </form>
    </div>
  );
};

export default Registrarse;
