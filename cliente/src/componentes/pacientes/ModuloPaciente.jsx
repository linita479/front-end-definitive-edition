import React, { useEffect } from "react";
import NavBar from "../objetos/NavBar";
import './ModuloPaciente.css';
import { useNavigate } from "react-router-dom";

const ModuloPaciente = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token") == null) {
      navigate("/");
    }
  }, [navigate]);

  const listOpcions = [
    { name: "Inicio", path: "/paciente" },
    {
      name: "Citas",
      icono: "fas fa-calendar-check",
      subOpciones: [
        { name: "Solicitar Cita", path: "solicitar-cita" },
        { name: "Consultar Historial de Citas", path: "historial-citas" }
      ]
    },
    {
      name: "Historia Clínica",
      icono: "fas fa-file-medical",
      subOpciones: [
        { name: "Ver Mis Historias Clínicas", path: "historias-clinicas" }
      ]
    }
  ];

  return (
    <div className="modulo-paciente">
        
      <NavBar listOpcions={listOpcions} />
    </div>
  );
};

export default ModuloPaciente;
