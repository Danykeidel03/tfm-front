import React, { useState } from 'react';
import './Contacto.css';

const Contacto = () => {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.mensaje) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    // Aquí puedes integrar tu lógica de envío (API, email, etc)
    setEnviado(true);
    setForm({ nombre: '', email: '', mensaje: '' });
  };

  return (
    <section className="contacto-section">
      <h2>Contacto</h2>
      <p className="contacto-desc">¿Tienes dudas, sugerencias o quieres colaborar? ¡Escríbenos!</p>
      <form className="contacto-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre"
          value={form.nombre}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Tu email"
          value={form.email}
          onChange={handleChange}
        />
        <textarea
          name="mensaje"
          placeholder="Escribe tu mensaje"
          rows={5}
          value={form.mensaje}
          onChange={handleChange}
        />
        {error && <div className="contacto-error">{error}</div>}
        {enviado && <div className="contacto-success">¡Mensaje enviado correctamente!</div>}
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
};

export default Contacto;