import React from "react";
import Titulo from "./Titulo";
import Boton from "./Boton";
import TarjetaBeneficio from "./Tarjetabeneficio";
import './beneficios.css'
import { FaRegUser, FaHeartbeat, FaHospital } from 'react-icons/fa';
import { FaRegEdit } from "react-icons/fa";



const Beneficios = ()=>{
    return(
        <>
        <div className="contenedor__registro-wrapper">
            <div className="contenedor__registro">
                <div className="contenedor__registro__card">
                <div className="contenedor__registro__card-details">
                    <div className="contenedor__registro__card-icon">
                        <FaRegEdit size={60} color="#00cfc8" />
                    </div>
                    <p className="contenedor__registro__text-title">Te ofrecemos servicios de salud</p>
                    <p className="contenedor__registro__text-body">Accede a atención médica de calidad, gestión eficiente de tus consultas, y acompañamiento en todo momento.</p>
                </div>
                <button className="contenedor__registro-button"><p>Registrate aquí</p></button>
                </div>
            <div className="tarjetasinfo_container">
                <TarjetaBeneficio texto="Registro" descripcion="Crea tu cuenta en segundos." icono={FaRegUser} rotacion={-15} />
                <TarjetaBeneficio texto="Salud" descripcion="Accede a tu historial médico." icono={FaHeartbeat} rotacion={5} />
                <TarjetaBeneficio texto="Sedes" descripcion="Encuentra la IPS más cercana." icono={FaHospital} rotacion={25} />
            </div>
            </div>
        </div>
        </>
    )
}

export default Beneficios;