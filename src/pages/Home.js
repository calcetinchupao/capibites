import React from "react";
import "../styles/home.css";

function Home() {
  return (
    <div className="home-page">
      <section className="principio">
        <h1>Bienvenido a Capibites</h1>
        <p>Comida para ti o tu familia al mejor precio</p>
        <img src="/img/logo.png" alt="logo" className="logo" />

        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/HmUxS5DD04Q"
          title="Comida stock"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <a href="/productos" className="btn">Ver menú</a>
      </section>

      <section className="destacados">
        <h2>Nuestros favoritos</h2>
        <div className="cards">
          <article className="card">
            <img src="/img/smash-burger-que-es.jpg" alt="Hamburguesa" />
            <h3>Hamburguesas</h3>
          </article>
          <article className="card">
            <img src="/img/papas-fritas-saludables-1080x550-1-1200x720.jpg" alt="Papas fritas" />
            <h3>Papas fritas</h3>
          </article>
          <article className="card">
            <img src="/img/Foto_1.jpeg" alt="Completo" />
            <h3>Completo</h3>
          </article>
        </div>
      </section>

      <section className="ubicacion">
        <h2>Dónde estamos</h2>
        <ul>
          <li>Paine</li>
          <li>Buin</li>
          <li>San Bernardo</li>
          <li>Macul</li>
        </ul>
      </section>
    </div>
  );
}

export default Home;
