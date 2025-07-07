import React, { useEffect } from "react";
import NavBar from "../objetos/NavBar";
import './Modulo.css';
import { useNavigate } from "react-router-dom";
const ModuloUsuarioSinRol = () => {
    console.log(sessionStorage.getItem("tipo_usuario"))
    const navigate = useNavigate();
     useEffect(() => {
    if (sessionStorage.getItem("token") == null) {
      navigate("/");
    }
  }, [navigate]);
    const listOpcions = [
        {name: "Inicio", path: "/admin"},
        {
            name: "Centro Medico",
            icono: "fas fa-hospital",
            subOpciones: [
                { name: "Crear Centro Medico", path: "centro/medico"  },
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
            
            <NavBar listOpcions={listOpcions} />
        </div>
    );
}

export default ModuloUsuarioSinRol