import React from "react";
import "../styles/contacto.css";

function Contacto() {
  return (
    <div className="contacto-page">
      <h1>Contacto</h1>
      <form>
        <label>Nombre</label>
        <input type="text" placeholder="Tu nombre" />
        <label>Email</label>
        <input type="email" placeholder="Tu correo" />
        <label>Mensaje</label>
        <textarea placeholder="Escribe tu mensaje"></textarea>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Contacto;
