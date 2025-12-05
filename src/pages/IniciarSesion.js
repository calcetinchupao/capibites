import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/iniciarSesion.css";
import { authApi } from "../services/api";

const IniciarSesion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    authApi
      .login({ email, password })
      .then((res) => {
        const usuario = res?.user;
        if (!usuario) throw new Error("Usuario no encontrado");
        localStorage.setItem("usuarioActual", JSON.stringify(usuario));
        alert(`✅ Bienvenido ${usuario.nombre}!`);
        if (usuario.rol === "administrador") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      })
      .catch(() => {
        alert("❌ Credenciales incorrectas. Intenta de nuevo.");
      });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-title">
          <h2>Iniciar Sesión</h2>
          <p>Accede con tu cuenta para administrar o comprar</p>
        </div>

      <form onSubmit={handleSubmit} className="text-center">
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control mx-auto"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control mx-auto"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="login-actions">
          <button type="submit" className="btn btn-primary" style={{ width: 200 }}>
            Iniciar Sesión
          </button>
        </div>

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
    </div>
  );
};

export default IniciarSesion;
