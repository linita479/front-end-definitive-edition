import React, { useState } from "react";
import ModalRegistrarCita from "./Formulario_cita";
import DetalleCitaModal from "./DetallesCitaModal";
import "./card_cita_horas.css";

const Card_cita_horas = ({ hora, dia, estado, cita }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className={`card-cita-hora card-cita-hora--${estado}`} onClick={handleOpen}>
        {hora} – <span className="estado">{estado}</span>
      </div>

     {estado === "disponible" && open && (
  <ModalRegistrarCita
    isOpen={open}
    isClose={handleClose}
    hora={hora}
    dia={dia}
  />
)}

{estado !== "disponible" && open && (
  <DetalleCitaModal
    isOpen={open}
    isClose={handleClose}
    cita={cita}
  />
)}

    </>
  );
};

export default Card_cita_horas;
