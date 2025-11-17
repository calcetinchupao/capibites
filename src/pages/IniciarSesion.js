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
    <div className="container" style={{ maxWidth: "520px", paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-6)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-5)', fontSize: 'var(--fs-xl)' }}>🔐 Iniciar Sesión</h2>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Correo electrónico</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="field">
          <label className="label">Contraseña</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn--primary" style={{ width: '100%', marginTop: 'var(--space-3)' }}>
          Iniciar Sesión
        </button>

        <p style={{ textAlign: 'center', marginTop: 'var(--space-3)' }}>
          ¿No tienes cuenta?{" "}
          <span
            style={{ color: 'var(--color-primary)', cursor: 'pointer' }}
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
