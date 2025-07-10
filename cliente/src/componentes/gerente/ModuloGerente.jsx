import React, { useEffect } from "react";
import NavBar from "../objetos/NavBar";
import './ModuloGerente.css';
import { useNavigate } from "react-router-dom";
const ModuloGerente = () => {
    console.log(sessionStorage.getItem("token"))
    const navigate = useNavigate();
     useEffect(() => {
    if (sessionStorage.getItem("token") == null) {
      navigate("/");
    }
  }, [navigate]);
    const listOpcions = [
  { name: "Inicio", path: "dashboar-admin", icono: "fas fa-home" },
  {
    name: "Centro Medico",
    icono: "fas fa-hospital",
    subOpciones: [
      { name: "Crear Centro Medico", path: "centro/medico", icono: "fas fa-plus-circle" },
      { name: "Ver Centros Medicos", path: "ver-centros-medicos", icono: "fas fa-clinic-medical" }
    ]
  },
  {
    name: "servicios",
    icono: "fas fa-concierge-bell",
    subOpciones: [
      { name: "Ver Servicios", path: "ver-servicios", icono: "fas fa-list" }
    ]
  },
  {
    name: "personal",
    icono: "fas fa-user-md",
    subOpciones: [
      { name: "Registrar Talento humano", path: "registro-th", icono: "fas fa-user-plus" },
      { name: "Ver Usuarios", path: "ver-usuarios", icono: "fas fa-users" }
    ]
  }
];


    return (
        <div className="modulo-gerente">
        
            <NavBar listOpcions={listOpcions} />
        </div>
    );
}

export default ModuloGerente;