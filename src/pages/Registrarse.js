import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearUsuario, obtenerUsuarioPorEmail } from "../data/data";
import "../styles/registrarse.css";

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
    <div className="register-shell">
      <div className="register-card">
          <div className="register-title">
            <h2>Crear Cuenta</h2>
            <p>Únete y disfruta de nuestras mejores promociones</p>
          </div>

          <form onSubmit={handleSubmit} className="text-center">
            <div className="mb-3">
              <label className="form-label">Nombre completo</label>
              <input
                type="text"
                className="form-control mx-auto"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej: Juan Pérez"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control mx-auto"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@correo.cl"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control mx-auto"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                required
              />
            </div>

            <div className="row g-3 justify-content-center">
              <div className="col-10 col-md-8">
                <label className="form-label">Dirección</label>
                <input
                  type="text"
                  className="form-control mx-auto"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  placeholder="Calle y número"
                />
              </div>
              <div className="col-10 col-md-8">
                <label className="form-label">Teléfono</label>
                <input
                  type="tel"
                  className="form-control mx-auto"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="+569 1234 5678"
                />
              </div>
            </div>

            <div className="register-actions">
              <button type="submit" className="btn btn-primary register-btn">
                Crear cuenta
              </button>
            </div>

            <p className="text-center mt-3 mb-0">
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
    </div>
  );
};

export default Registrarse;
