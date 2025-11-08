import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validarLogin } from "../data/data";

const IniciarSesion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuario = validarLogin(email, password);

    if (usuario) {
      localStorage.setItem("usuarioActual", JSON.stringify(usuario));

      alert(`✅ Bienvenido ${usuario.nombre}!`);
      // Si es admin, lo mandamos al panel
      if (usuario.rol === "administrador") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } else {
      alert("❌ Credenciales incorrectas. Intenta de nuevo.");
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4 fw-bold">🔐 Iniciar Sesión</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Iniciar Sesión
        </button>

        <p className="text-center mt-3">
          ¿No tienes cuenta?{" "}
          <span
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/registrarse")}
          >
            Regístrate aquí
          </span>
        </p>
      </form>
    </div>
  );
};

export default IniciarSesion;
