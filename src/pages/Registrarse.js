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
    <div className="container my-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4 fw-bold">📝 Crear Cuenta</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre completo</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="tel"
            className="form-control"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-success w-100 mt-3">
          Registrarme
        </button>

        <p className="text-center mt-3">
          ¿Ya tienes cuenta?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
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
