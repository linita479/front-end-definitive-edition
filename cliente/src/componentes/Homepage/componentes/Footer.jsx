import React from "react";
import RedesSociales from "./RedesSociales";
import "./Footer.css";

const Footer = () => {
  return (
        <footer className="footer">
        <div className="footer__content">

            {/* Información del sitio */}
            <div className="footer__contet__section">
            <h4 className="footer__contet__section-subtlt">Sobre la clínica</h4>
            <ul className="footer__contet__section-lista">
                <li className="footer__contet__section-lista__op"><a href="#">¿Quiénes somos?</a></li>
                <li className="footer__contet__section-lista__op"><a href="#">Historia</a></li>
                <li className="footer__contet__section-lista__op"><a href="#">Misión y visión</a></li>
                <li className="footer__contet__section-lista__op"><a href="#">Valores corporativos</a></li>
                <li className="footer__contet__section-lista__op"><a href="#">Nuestro equipo</a></li>
                <li className="footer__contet__section-lista__op"><a href="#">Instalaciones</a></li>
                <li className="footer__contet__section-lista__op"><a href="#">Noticias y eventos</a></li>
            </ul>
            </div>

            {/* Servicios */}
            <div className="footer__contet__section">
            <h4 className="footer__contet__section-subtlt">Servicios</h4>
            <ul className="footer__contet__section-lista">
                <li className="footer__contet__section-lista__op"><a href="#">Consultas generales</a></li>
                <li className="footer__contet__section-lista__op"><a href="#">Especialistas</a></li>
                <li className="footer__contet__section-lista__op"><a href="#">Urgencias 24h</a></li>
                <li className="footer__contet__section-lista__op"><a href="#">Hospitalización</a></li>
                <li className="footer__contet__section-lista__op"><a href="#">Imágenes diagnósticas</a></li>
                <li className="footer__contet__section-lista__op"><a href="#">Cirugías</a></li>
                <li className="footer__contet__section-lista__op"><a href="#">Laboratorio clínico</a></li>
            </ul>
            </div>

            {/* Enlaces útiles */}
            <div className="footer__contet__section">
            <h4 className="footer__contet__section-subtlt">Enlaces útiles</h4>
            <ul className="footer__contet__section-lista">
                <li className="footer__contet__section-lista__op"><a href="#">Agendar cita</a></li>
                <li className="footer__contet__section-lista__op"><a href="#">Portal del paciente</a></li>
                <li className="footer__contet__section-lista__op"><a href="#">Preguntas frecuentes</a></li>
                <li className="footer__contet__section-lista__op"><a href="#">Términos y condiciones</a></li>
                <li className="footer__contet__section-lista__op"><a href="#">Política de privacidad</a></li>
                <li className="footer__contet__section-lista__op"><a href="#">PQRS</a></li>
                <li className="footer__contet__section-lista__op"><a href="#">Trabaje con nosotros</a></li>
            </ul >
            </div>

            {/* Atención al usuario */}
            <div className="footer__contet__section">
            <h4 className="footer__contet__section-subtlt">Atención al usuario</h4>
            <ul className="footer__contet__section-lista">
                <li className="footer__contet__section-lista__op"><a href="#">Líneas de atención</a></li>
                <li className="footer__contet__section-lista__op"><a href="#">Correo institucional</a></li>
                <li className="footer__contet__section-lista__op"><a href="#">Chat en línea</a></li>
                <li className="footer__contet__section-lista__op"><a href="#">Horario de atención</a></li>
                <li className="footer__contet__section-lista__op"><a href="#">Ubicación y cómo llegar</a></li>
                <li className="footer__contet__section-lista__op"><a href="#">Manual del usuario</a></li>
            </ul>
            </div>

            {/* Redes sociales (alineadas más a la derecha) */}
            <div className="footer-section redes-container right-align">
            {/* <h4>Síguenos</h4> */}
            <RedesSociales />
            </div>

        </div>
        </footer>
  );
};

export default Footer;
