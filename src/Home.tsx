import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import foto1 from "./foto1.jpg";
import foto2 from "./foto2.jpg";
import foto3 from "./foto3.jpg";
import foto4 from "./foto4.jpg";
import foto6 from "./foto6.jpg";
import foto7 from "./foto7.jpg";
import foto8 from "./foto8.jpg";
import "./styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

const Home: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const weddingDate = new Date("2025-12-06T12:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance < 0) {
        setTimeLeft("💍 ¡Ya es el gran día!");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days} días ${hours} horas ${minutes} minutos ${seconds} segundos`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      {/* Logo y título */}
      <header className="header">
        <img src={logo} alt="Logo Boda" className="logo" />
        <h2 className="subtitle">Nuestra historia continúa con un “sí, quiero”</h2>
        <p className="wedding-date">06 · 12 · 2025</p>
      </header>

      {/* Galería de fotos tipo collage */}
      <section className="photo-carousel">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {[foto1, foto2, foto3, foto4, foto6, foto7, foto8].map((foto, i) => (
            <SwiperSlide key={i}>
              <img
                src={foto}
                alt={`Iván & Laura ${i + 1}`}
                className="carousel-photo"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Cuenta atrás */}
      <section className="countdown">
        <h3>⏰ Falta para el gran día:</h3>
        <div className="timer">{timeLeft}</div>
      </section>

      {/* Introducción al día */}
      <section className="intro-text">
      <p>
    Nos hace mucha ilusión compartir con vosotros uno de los días más
    importantes de nuestras vidas.
  </p>
  <p>
    La ceremonia tendrá lugar en la{" "}
    <strong>Iglesia Nuestra Señora de la Asunción</strong> a las <strong>12h</strong>, y
    continuaremos celebrando en <strong>Palomarejos Golf</strong>.
  </p>
  <p>
    Queremos que viváis con nosotros cada sonrisa, cada brindis y cada baile.
  </p>
  <p>¡Gracias por acompañarnos en esta aventura!</p>
      </section>

      <div className="button-group">
        {/* Botón CTA */}
        <a
          href="https://maps.app.goo.gl/qt9ghKrQU8BxvmPF7"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="cta-button flex items-center justify-center gap-2">
            Ubicación Iglesia ⛪
          </button>
        </a>

        <a
          href="https://maps.app.goo.gl/aaP6Pz5cygJJi7dL6"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="cta-button flex items-center justify-center gap-2">
            Ubicación Restaurante 🥂
          </button>
        </a>

        {/* Botón CTA */}
        <Link to="/confirmar">
          <button className="cta-button">Confirmar asistencia 💌</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
