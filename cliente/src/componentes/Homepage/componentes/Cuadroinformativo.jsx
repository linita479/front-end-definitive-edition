import React from "react";
import './SobreNosotros.css';

const CuadroInformativo = ({ titulo, parrf, icono, color }) => {
    return (
        <div className="e-card playing" style={{ "--wave-color": color }}>
        <div className="e-card__wave"></div>
        <div className="e-card__wave"></div>
        <div className="e-card__wave"></div>

        <div className="infotop">
            <div className="infotop__icon">{icono}</div>
            {titulo}
            <div className="infotop__name">{parrf}</div>
        </div>
        </div>
    );
    };

export default CuadroInformativo;
