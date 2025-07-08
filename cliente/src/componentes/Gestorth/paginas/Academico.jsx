import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import EtiquetaInput from "../componentes/EtiquetaInput";
import ComboBox from "../componentes/ComboBox";
import Botones from "../componentes/Botones";
import Logo from "../../Homepage/componentes/Logo";
import './Academico.css'

const Academico = () =>{
    const { register , handleSubmit, watch, formState: { errors } } = useForm();
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [errorBusqueda, setErrorBusqueda] = useState("");

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
        
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("nro_doc", data.nro_doc);
        formData.append("titulo_obtenido", data.titulo_obtenido);
        formData.append("institucion_educativa", data.institucion);
        formData.append("fecha_inicio", data.fecha_inicio);
        formData.append("fecha_culminado", data.fecha_finalizacion);
        formData.append("nivel_educativo", data.nivel_educativo || "");
        formData.append("soporte", data.Soporte[0]);
        console.log(formData)
        try {
            const token = "3488625e616171a36fb405847f77afb519d4e451";
            const response = await fetch("http://localhost:8000/api/gestor_th/academicos/", {
            method: "POST",
            headers: {
                Authorization: `Token ${sessionStorage.getItem("token")}`,
            },
            body: formData,
            });

            const result = await response.json();
            if (response.ok) {
            alert("✅ Registro académico exitoso");
            console.log("Resultado:", result);
            } else {
            console.warn("Error en registro:", result);
            alert(result.error || "❌ Ocurrió un error al registrar");
            }
        } catch (error) {
            console.error("Error al registrar:", error);
            alert("⚠️ Error de red al registrar");
        }
    };

    return(
        <>
        <div className="josessasa">
            <div className="cont-logo-principal">
                <Logo />
            </div>
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
                        <h1 className="header-reGistro-medico-titulo">Registrar información academica</h1>
                    </header>
                    <div className="contenedor-form-academico">
                        <EtiquetaInput label="Titulo obtenido" type="text" placeholder="Ingrese el titulo obtenido" register={register("titulo_obtenido")} />
                        <EtiquetaInput label="Institucion" type="text" placeholder="Ingrese la institucion" register={register("institucion")} />
                        <EtiquetaInput label="Fecha de inicio" type="date" placeholder="Fecha de inicio" register={register("fecha_inicio")}/>
                        <EtiquetaInput label="Fecha de finalizacion" type="date" placeholder="Fecha de finalizacion" register={register("fecha_finalizacion")} />
                        <ComboBox label="Nivel educativo" register={register("nivel_educativo")} options={[
                            { value:"", label: "Selecciona una opcion"},
                            { value: "1",label:'Tecnico laboral en salud'},
                            { value: "2",label:'Auxiliar de enfermeria'},
                            { value: "3",label:'Auxiliar en salud oral'},
                            { value: "4",label:'Auxiliar en servicios farmaceuticos'},
                            { value: "5",label:'Auxiliar en atencion Prehospitalaria'},
                            { value: "6",label:'Tecnologo en salud'},
                            { value: "7",label:'Tecnologia en regencia de farmacia'},
                            {value: "8",label:'Tecnologia en atenciaon prehospitalaria'},
                            { value: "9",label:'Tecnologo en laboratorio clinico' },
                            { value: "10",label:'medicina' },
                            {value: "11",label:'enfermeria'},
                            {value: "12",label:'odontologia'},
                            {value: "13",label:'Fisioterapia'},
                            { value: "14",label:'Terapia ocupacional'},
                            { value: "15",label:'Bacteriologia y laboratorio clinico'}
                        ]} />
                        <EtiquetaInput label="Soporte" type="file" placeholder="Sube el soporte academico" register={register("Soporte")} />
                    </div>
                    <Botones name="Registrar" tipo="submit" />
                </form>
            </div>
        </div>
        </>
    );
}
export default Academico;