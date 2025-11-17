import React from "react";
import "../styles/contacto.css";

function Contacto() {
  return (
    <div className="container contacto-page" style={{ paddingTop: 'var(--space-6)', paddingBottom: 'var(--space-6)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 'var(--space-5)', fontSize: 'var(--fs-xl)' }}>Contacto</h1>
      <form aria-label="Formulario de contacto">
        <div className="field">
          <label className="label" htmlFor="nombre">Nombre</label>
          <input id="nombre" type="text" className="input" placeholder="Tu nombre" />
        </div>
        <div className="field">
          <label className="label" htmlFor="email">Email</label>
          <input id="email" type="email" className="input" placeholder="Tu correo" />
        </div>
        <div className="field">
          <label className="label" htmlFor="mensaje">Mensaje</label>
          <textarea id="mensaje" className="input" placeholder="Escribe tu mensaje" rows="5"></textarea>
        </div>
        <button type="submit" className="btn btn--primary">Enviar</button>
      </form>
    </div>
  );
}

export default Contacto;
