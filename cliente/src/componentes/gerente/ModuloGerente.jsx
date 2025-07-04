import React from "react";
import NavBar from "../objetos/NavBar";

const ModuloGerente = () => {
    const listOpcions = [
        {name: "Inicio", path: "/admin"},
        {
            name: "Centro Medico",
            subOpciones: [
                { name: "Crear Centro Medico", path: "centro/medico" },
                { name: "Ver Centros Medicos", path: "ver-centros-medicos" }
            ]
        },
        {
            name: "servicios",
            subOpciones: [
                { name: "Ver Servicios", path: "ver-servicios" }
            ]
        },
        {
            name: "personal",
            subOpciones: [
                { name: "Registrar Talento humano", path: "registro-th" },
            ]
        }
    ]

    return (
        <div className="modulo-gerente">
            <h1>Modulo Gerente</h1>
            <NavBar listOpcions={listOpcions} />
        </div>
    );
}

export default ModuloGerente;