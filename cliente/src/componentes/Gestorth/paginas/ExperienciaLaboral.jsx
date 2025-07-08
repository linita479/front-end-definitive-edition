import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import EtiquetaInput from "../componentes/EtiquetaInput";
import ComboBox from "../componentes/ComboBox";
import Botones from "../componentes/Botones";
import './Experiencia.css'
import Logo from "../../Homepage/componentes/Logo";

const ExperienciaLaboral = () =>{
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [errorBusqueda, setErrorBusqueda] = useState("");
        const buscarUsuario = async (nrodoc) => {
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
        
    const onSubmit = async(data) => {
        console.log("Datos del formulario:", data);

        const formData= new FormData();
        formData.append("nro_doc", data.nro_doc);
        formData.append("nombre_empresa", data.nombre_empresa);
        formData.append("cargo", data.cargo);
        formData.append("fecha_inicio", data.fecha_inicio);
        formData.append("fecha_finalizacion", data.fecha_finalizacion);
        formData.append("tipo_contrato", data.tipo_contrato);
        formData.append("soporte", data.soporte[0]); 
        try {
            const token= "3488625e616171a36fb405847f77afb519d4e451";
            const response = await fetch("http://localhost:8000/api/gestor_th/experiencia/laboral/",{
                method: "POST",
                headers: {
                    Authorization: `Token ${sessionStorage.getItem("token")}`,
                },
                body: formData,
            });
            const result = await response.json();
            if (response.ok) {
                alert("✅ Registro de experiencia laboral exitoso");
                console.log("Resultado:", result);
            } else {
                console.warn("Error en registro:", result);
                alert(result.error || "❌ Ocurrió un error al registrar");
            }
        }catch (error) {
            console.error("Error:", error);
            alert("❌ Ocurrió un error al registrar la experiencia laboral");
        }
    }


    return(
        <>
        <div className="josessasa">
            <Logo />
            <div className="super-contenedor">
                <div className="contenedor-busqueda">
                <div className="fondo-blanco">
                    <p className="texto-busqueda">Buscar por número de documento</p>
                    <div className="searchBox">
                    <input
                        className="searchInput"
                        type="text"
                        placeholder="Número de documento"
                        {...register("nro_doc")}
                    />
                        <button className="searchButton" onClick={() => buscarUsuario(watch("nro_doc"))}>
                            {/* Lupa moderna (Heroicons) */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" width="24" height="24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <form action="" onSubmit={handleSubmit(onSubmit)} className="formulario-registro-academico">
                <header className="header-form-personal-medico">
                    <h1 className="header-reGistro-medico-titulo">Registrar experiencia laboral</h1>
                </header>
                <EtiquetaInput label="Nombre de la empresa" type="text" placeholder="Ingrese el nombre de la empresa" register={register("nombre_empresa")} />
                <EtiquetaInput label="Cargo desempeñado" type="text" placeholder="Ingrese el cargo desempeñado" register={register("cargo")} />
                <EtiquetaInput label="Fecha de inicio" type="date" placeholder="Fecha de inicio" register={register("fecha_inicio")} />
                <EtiquetaInput label="Fecha de finalización" type="date" placeholder="Fecha de finalización" register={register("fecha_finalizacion")} />
                <ComboBox label="Tipo de contrato" register={register("tipo_contrato")} options={[
                    { value: '', label: 'Selecciona un tipo de contrato' },
                    { value: 'A término indefinido', label: 'A término indefinido' },
                    { value: 'A término fijo', label: 'A término fijo' },
                    { value: 'Por obra o labor', label: 'Por obra o labor' },
                    { value: 'Ocasional', label: 'Ocasional' },
                    { value: 'Contrato de aprendizaje', label: 'Contrato de aprendizaje' },
                    { value: 'Contrato de prestación de servicios', label: 'Contrato de prestación de servicios' },
                    { value: 'Contrato sindical', label: 'Contrato sindical' }
                ]} />
                <EtiquetaInput label="Soporte" type="file" register={register("soporte")} placeholder="Sube el soporte de la experiencia laboral" />
                <Botones name="Registrar" tipo="submit" />
            </form>
            </div>
        </div>
        </>
    )
}

export default ExperienciaLaboral;