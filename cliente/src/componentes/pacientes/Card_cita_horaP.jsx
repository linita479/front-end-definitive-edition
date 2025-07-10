import React, { useState } from "react";
import ModalRegistrarCitaP from "./ModalRegistrarCitaP";
// import "./card_cita_hora.css";

const Card_cita_horasP = ({ hora, dia, estado, medicoSeleccionado }) => {
  console.log("🧪 Estado recibido:", estado, "para hora", hora);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div
        className={`hora-card ${estado}`}
        onClick={estado === "disponible" ? handleOpen : null}
      >
        <span className="hora-card__hora">{hora}</span>
        <span className="hora-card__estado">
          {estado === "disponible" ? "Disponible" : "No disponible"}
        </span>
      </div>

      {estado === "disponible" && open && (
        <ModalRegistrarCitaP
          isOpen={open}
          isClose={handleClose}
          hora={hora}
          dia={dia}
          medicoSeleccionado={medicoSeleccionado}
        />
      )}

    </>
  );
};

export default Card_cita_horasP;
