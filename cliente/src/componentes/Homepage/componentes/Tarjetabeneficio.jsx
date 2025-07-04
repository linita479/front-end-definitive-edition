import React from "react";
import './Tarjetabeneficio.css'


const TarjetaBeneficio = ({ texto, descripcion, icono: Icon, rotacion }) => {
    return (
        <div data-text={texto} style={{ "--r": rotacion }} className="glass">
        <div className="beneficio-contenido">
            <div className="beneficio-icono">
            <Icon size="2.5em" />
            </div>
            <p className="beneficio-descripcion">{descripcion}</p>
        </div>
        </div>
    );
    };

export default TarjetaBeneficio;