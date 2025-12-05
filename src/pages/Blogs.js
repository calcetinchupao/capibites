import React from "react";
import "../styles/blogs.css";

function Blogs() {
  return (
    <div className="blogs-page">
      <h1>Blogs</h1>
      <div className="blogs-list">
        <article className="card">
          <h3>Recetas fáciles</h3>
          <p>Aprende a preparar platos deliciosos en casa.</p>
        </article>
        <article className="card">
          <h3>Tips de alimentación</h3>
          <p>Consejos para comer sano y delicioso.</p>
        </article>
      </div>
    </div>
  );
}

export default Blogs;
