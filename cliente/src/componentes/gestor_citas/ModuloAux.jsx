import React from "react";
import NavBar from "../objetos/NavBar";

const ModuloCitas = () => {
    const listOpcions = [
        {
            name: "Citas",
            subOpciones: [
                { name: "Ver Calendario", path: "ver-calendario" },
                { name: "Ver Historial de Citas", path: "historial-citas" }
            ]
        },
        {
            name: "Pacientes",
            subOpciones: [
                { name: "Crear Paciente", path: "crear-paciente" },
                { name: "Consultar Paciente", path: "consultar-paciente" }
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
