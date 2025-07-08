import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Autoplay, Pagination } from "swiper/modules";

import Botones from "../../Gestorth/componentes/Botones";

import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

import "./Imagen.css";

/* --- DATA de cada slide --- */
const slides = [
    {
        tipo: "hero",
        fondo: "/foto.jpg",
        titulo: "Bienvenido a HealthSoft",
        texto:
        "Regístrate aquí para acceder fácilmente a todos nuestros servicios de salud y disfrutar de una gestión eficiente, segura y personalizada.",
        boton: "Registrarse",
    },
    {
        tipo: "info",          // ← cambiamos a “info” (todo en un solo div)
        imagen: "/baner2.jpg",
        titulo: "Kenay Healthsoft",
        texto:
        "Más de 50 años cuidando tu bienestar. Pioneros en telemedicina, cirugía mínimamente invasiva y atención integral al paciente.",
    },
    ];

    const Imagen = () => (
    <Swiper
        modules={[EffectCube, Autoplay, Pagination]}
        effect="cube"
        cubeEffect={{ shadow: false, slideShadows: false }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="banner-swiper"
    >
        {slides.map((s, i) =>
        s.tipo === "hero" ? (
            /* ---------- BANNER #1 (Hero) ---------- */
            <SwiperSlide key={i}>
            <section className="hero-container">
                <div className="hero-container__overlay-hero"></div>
                <img
                src={s.fondo}
                alt="Fondo"
                className="hero-container__background-image"
                />
                <div className="hero-container__hero-content">
                <h1 className="hero-container__hero-content__titulo">
                    {s.titulo}
                </h1>
                <p className="hero-container__hero-content__prrf">{s.texto}</p>
                <Botones name={s.boton} />
                </div>
            </section>
            </SwiperSlide>
        ) : (
            /* ---------- BANNER #2 (Info en un solo div) ---------- */
/* ---------- BANNER #2 (nuevo diseño con imagen de fondo) ---------- */
            <SwiperSlide key={i}>
            <section
                className="info-banner"
                style={{ backgroundImage: `url(${s.imagen})` }}   /* ← fondo */
            >
                <div className="info-banner__overlay"></div>       {/* filtro aguamarina */}
                <div className="info-banner__content">
                <h2 className="info-banner__titulo">{s.titulo}</h2>
                <p className="info-banner__texto">{s.texto}</p>
                </div>
            </section>
            </SwiperSlide>

        )
        )}
    </Swiper>
    );

export default Imagen;
