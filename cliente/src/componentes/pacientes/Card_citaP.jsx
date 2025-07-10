import React from "react";

const Card_citaP = ({ dia, open, className, citasCount = 0, maxCitas = 24 }) => {
  const porcentaje = Math.min(citasCount / maxCitas, 1);

  return (
    <div className={className} onClick={open}>
      <span className="card-cita__numero-dia">{dia}</span>
      <div className="card-cita__barra-citas">
        <div
          className="card-cita__progreso"
          style={{ width: `${porcentaje * 100}%` }}
        />
      </div>
      <span className="card-cita__contador">{citasCount}/{maxCitas}</span>
    </div>
  );
};

export default Card_citaP