import React from "react";
import "../styles/registrarse.css";

function Registrarse() {
  return (
    <div className="register-page">
      <h1>Registrarse</h1>
      <form>
        <label>Nombre</label>
        <input type="text" placeholder="Nombre" />
        <label>Email</label>
        <input type="email" placeholder="Correo" />
        <label>Contraseña</label>
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Crear cuenta</button>
      </form>
    </div>
  );
}

export default Registrarse;
