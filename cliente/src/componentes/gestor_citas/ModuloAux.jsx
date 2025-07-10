import React from "react";
import NavBar from "../objetos/NavBar";

const ModuloCitas = () => {
    const listOpcions = [

  { name: "Inicio", path: "dashboar-aux", icono: "fas fa-home" },
  {
            name: "Citas",
            icono: "fas fa-calendar-check", // 📅 ícono principal
            subOpciones: [
                {
                    name: "Ver Calendario",
                    path: "ver-calendario",
                    icono: "fas fa-calendar-alt" // 🗓️
                },
                {
                    name: "Ver Historial de Citas",
                    path: "historial-citas",
                    icono: "fas fa-history" // ⏳
                }
            ]
        },
        {
            name: "Pacientes",
            icono: "fas fa-user-injured", // 🧍‍♂️ ícono principal
            subOpciones: [
                {
                    name: "Crear Paciente",
                    path: "crear-paciente",
                    icono: "fas fa-user-plus" // ➕
                },
                {
                    name: "Consultar Paciente",
                    path: "paciente",
                    icono: "fas fa-search" // 🔍
                }
            ]
        }
    ];

    return (
        <div className="modulo-citas">
            <h1>Módulo de Citas</h1>
            <NavBar listOpcions={listOpcions} />
        </div>
    );
};

export default ModuloCitas;
