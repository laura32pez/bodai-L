import React, { useState } from "react";
import logo from "./logo.png";
import "./styles.css";

interface FormData {
  name: string;
  attending: string;
  companions: string;
  companionsNames: string;
  bus: string;
  intolerances: string;
  song: string;
  message: string;
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    attending: "",
    companions: "",
    companionsNames: "",
    bus: "",
    intolerances: "",
    song: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false); // ⬅️ estado para loading

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true); // ⬅️ mostramos loading

    try {
      await fetch("https://script.google.com/macros/s/AKfycbyCH-lbf8PaUe6iqxByBfAwhKMOZq7s9iXQFYCYa6YeJpBCLMhcWVaSQtzI2tHrARBw/exec", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString(),
      });

      setSubmitted(true);
      setFormData({
        name: "",
        attending: "",
        companions: "",
        companionsNames: "",
        bus: "",
        intolerances: "",
        song: "",
        message: "",
      });
    } catch (error) {
      console.error("Error enviando formulario:", error);
    } finally {
      setSubmitting(false); // ⬅️ ocultamos loading
    }
  };

  return (
    <div className="form-page">
      {/* Loading overlay mientras se envía */}
      {submitting && (
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Enviando…</p>
        </div>
      )}

      <header className="header">
        <img src={logo} alt="Logo Boda" className="logo" />
      </header>

      <div className="form-card">
        <h2>Confirma tu asistencia</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre y Apellidos"
            required
          />

          <select
            name="attending"
            value={formData.attending}
            onChange={handleChange}
            required
          >
            <option value="">¿Contamos contigo para la boda?</option>
            <option value="Sí">¡Por supuesto, me apunto!</option>
            <option value="No">No puedo, brindaré desde lejos</option>
          </select>

          <input
            type="number"
            name="companions"
            value={formData.companions}
            onChange={handleChange}
            placeholder="Número de acompañantes"
            min={0}
          />

          <input
            type="text"
            name="companionsNames"
            value={formData.companionsNames}
            onChange={handleChange}
            placeholder="Nombres de los acompañantes"
          />

          <select name="bus" value={formData.bus} onChange={handleChange}>
            <option value="">¿Necesitas autobús?</option>
            <option value="Sí">Sí</option>
            <option value="No">No</option>
          </select>

          <input
            type="text"
            name="intolerances"
            value={formData.intolerances}
            onChange={handleChange}
            placeholder="¿Tienes alguna intolerancia alimentaria?"
          />

          <input
            type="text"
            name="song"
            value={formData.song}
            onChange={handleChange}
            placeholder="Canción que no debería faltar 🎶"
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Si nos quieres decir algo más, es el momento ✨"
            rows={3}
          />

          <button type="submit" className="submit-button">
            Confirmar asistencia
          </button>
        </form>

        {submitted && (
          <div className="confirmation-message">
            ¡Gracias por confirmar tu asistencia! 💖
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
