import React from "react";
import ModalRegistrarCita from "./Formulario_cita";
import { useState } from "react";
import "./card_cita_horas.css";


const Card_cita_horas = ({hora,dia}) => {
    const [open,setOpen] = useState(false)

    function handleOpen(){
        setOpen(true)
    }    

    function handleClose(){
        setOpen(false)
    }

    return(
        <>
        <div className="card_cita_hora" onClick={handleOpen}>
            <p>{hora}</p>
        </div>
        <ModalRegistrarCita isOpen={open} dia={dia}  hora={hora} isClose={handleClose}></ModalRegistrarCita>
        </>
    )
}

export default Card_cita_horas