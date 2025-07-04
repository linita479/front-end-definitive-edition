import React from "react";
import './botoniniciar.css'
const BotonIniciarSesion = () => {
  return (
    <button className="btn_iniciarsesion">
      <span className="btn_iniciarsesion__text">Iniciar sesión</span>
      <svg width="15px" height="10px" viewBox="0 0 13 10" className="btn_iniciarsesion__svg">
        <path d="M1,5 L11,5"></path>
        <polyline points="8 1 12 5 8 9"></polyline>
      </svg>
    </button>
  );
};

export default BotonIniciarSesion;