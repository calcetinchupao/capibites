import React, { useState } from 'react';

export function Greeting({ name }) {
  return <h1 data-testid="greeting">Hola, {name}</h1>;
}

export function OfferBadge({ enOferta }) {
  return enOferta ? <span data-testid="badge">¡Oferta!</span> : null;
}

export function ToggleMessage() {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <button onClick={() => setVisible(v => !v)} data-testid="toggle-btn">Mostrar/Ocultar</button>
      {visible && <p data-testid="message">Mensaje visible</p>}
    </div>
  );
}

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p data-testid="count">Contador: {count}</p>
      <button onClick={() => setCount(c => c + 1)} data-testid="inc-btn">Incrementar</button>
    </div>
  );
}

export function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        data-testid="email-input"
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        data-testid="password-input"
      />
      <button type="submit" data-testid="submit-btn">Ingresar</button>
    </form>
  );
}