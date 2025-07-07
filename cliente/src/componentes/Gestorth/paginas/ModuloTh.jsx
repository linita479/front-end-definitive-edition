import React from "react";
import NavBar from "../componentes/NavBar";

const ModuloTh = () => {
    const listOpcions = [
    {
        name: "Personal",
        icono: "fas fa-user-friends",
        subOpciones: [
        { name: "Registrar Médico", path: "registromedico", icono: "fas fa-user-md" },
        { name: "Registrar Auxiliar", path: "registroauxiliar", icono: "fas fa-user-nurse" }
        ]
    },
    {
        name: "Hoja de Vida",
        icono: "fas fa-file-medical",
        subOpciones: [
        { name: "Formación Académica", path: "academico", icono: "fas fa-graduation-cap" },
        { name: "Experiencia Laboral", path: "experiencia", icono: "fas fa-briefcase" },
        { name: "Consultar Personal", path: "consultar", icono: "fas fa-search" }
        ]
    },
    {
        name: "Gestionar Personal",
        path: "gestionar-personal",
        icono: "fas fa-user-cog"
    },
    {
        name: "Gestionar Agenda",
        icono: "fas fa-calendar-alt",
        subOpciones: [
            { name: "Crear agenda", path: "crear-agenda", icono: "fas fa-graduation-cap" },
            { name: "Consultar Solicitudes", path: "academico", icono: "fas fa-graduation-cap" },
        ]
    }
    ];






return (
    
        <div className="modulo-th">
            <div className="curva-superior">

            </div>
            <NavBar listOpcions={listOpcions} />
        </div>
    );
};

export default ModuloTh;
