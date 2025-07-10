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
    {
      name: "Inicio",
      icono: "fas fa-home",
      path: "/paciente"
    },
    {
      name: "Mis Citas",
      icono: "fas fa-calendar-check",
      subOpciones: [
        { name: "Agendar Cita", path: "ver-calendario" },
        { name: "Historial", path: "ver-historial" }
      ]
    },
    {
      name: "Mi Información",
      icono: "fas fa-id-card",
      subOpciones: [
        { name: "Ver Perfil", path: "ver-datos" },
        { name: "Actualizar Datos", path: "editar-datos" }
      ]
    },
    {
      name: "Documentos",
      icono: "fas fa-file-medical",
      subOpciones: [
        { name: "Historia Clínica", path: "historia-clinica" },
        { name: "Documentos Médicos", path: "documentos-medicos" }
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
