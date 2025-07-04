import React from "react";
import './Imagen.css';

const Imagen = () => {
    return (
        <div className="hero-container">
        <div className="hero-container__overlay-hero"></div>
        <img src="/foto.jpg" alt="Fondo" className="hero-container__background-image" />
        <div className="hero-container__hero-content">
            <h1 className="hero-container__hero-content__titulo">Bienvenido a HealthSoft</h1>
            <p className="hero-container__hero-content__prrf">  Regístrate aquí para acceder fácilmente a todos nuestros servicios de salud y disfrutar de una gestión eficiente, segura y personalizada.</p>
            <button className="hero-container__hero-content_buttonr">
                <span className="hero-container__hero-content_buttonr-text">Registrarse</span>
            </button>
        </div>
        </div>
    );
};

export default Imagen;

