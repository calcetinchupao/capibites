import React from "react";
import "../styles/iniciarSesion.css";

function IniciarSesion() {
  return (
    <div className="login-page">
      <h1>Iniciar Sesión</h1>
      <form>
        <label>Email</label>
        <input type="email" placeholder="Correo" />
        <label>Contraseña</label>
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default IniciarSesion;
