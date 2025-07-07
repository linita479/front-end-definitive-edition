import React from "react";
import BusquedaDocumento from "../componentes/BusquedaDocumento"; // asegúrate que la ruta sea la correcta
import { useForm } from "react-hook-form";
import { useState } from "react";
import CalendarioSeleccion from "./CalendarioAgenda";


const CrearAgenda = () => {
      const [mostrarFormulario, setMostrarFormulario] = useState(false);
      const [errorBusqueda, setErrorBusqueda] = useState("");
      const { register , handleSubmit, watch, formState: { errors } } = useForm();
      const buscarUsuario = async (nrodoc)=>{
          try{
              const response = await fetch(`http://127.0.0.1:8000/buscar_usuario/?nro_doc=${nrodoc}`,{
                  method: "GET",
                  headers:{
                      "Authorization": `Token ${sessionStorage.getItem("token")}`,
                  },
              });
              if (response.ok){
                  const data = await response.json();
                  setMostrarFormulario(true); 
                  setErrorBusqueda("");
                  console.log("Usuario encontrado:", data.usuario);
              }else{
                  setMostrarFormulario(false);
                  setErrorBusqueda("Usuario no encontrado.");
              }
  
          }catch (error) {
              console.error("Error:", error);
              setErrorBusqueda("Error de red.");
          }
      }
  return (
    <div className="crear-agenda">
      <h1 className="titulo-registro">Registro del auxiliar</h1>
      <BusquedaDocumento
        register={register("nro_doc")}
        onClick={() => buscarUsuario(watch("nro_doc"))}
      />
      {mostrarFormulario && <>
        <CalendarioSeleccion/>

      </>}
    </div>
  );
};

export default CrearAgenda;
