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
    const [registroExitoso, setRegistroExitoso] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [mostrarFormularioE, setMostrarFormularioE] = useState(false);
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
                setUsuario(data.usuario);
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
                setRegistroExitoso(true);
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
            {registroExitoso && (
                <div className="modal-registro-exitoso">
                    <div className="header-modal-registro-exitoso">
                    <div className="image image-exito">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="icono-exito"
                        >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div className="content-exito-hv">
                        <span className="title-exito-texto">Registro exitoso</span>
                        <p className="message-info-registro-exito">La experiencia laboral se ha guardado correctamente en el sistema. Puedes continuar con otros registros si lo deseas.</p>
                    </div>
                    <div className="barra-progreso"></div>
                    <div className="actions">
                        <button className="desactivate-exito" type="button" onClick={() => setRegistroExitoso(false)}>
                        Cerrar
                        </button>
                    </div>
                    </div>
                </div>
                )}
                {errorBusqueda && (
                    <div className="card modal-usuario-no-encontrado">
                        <div className="header-modal-usuario-no-encontrado">
                        <div className="image">
                            <svg
                            aria-hidden="true"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            >
                            <path
                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                strokeLinejoin="round"
                                strokeLinecap="round"
                            ></path>
                            </svg>
                        </div>
                        <div className="content-usuario-no-encontrado-hv">
                            <span className="title-usuario-noencontrado-texto">{errorBusqueda}</span>
                            <p className="message-info-usuario-no-encontrado">Lo sentimos, no hemos encontrado ningún usuario con ese número de documento. Por favor verifica que lo hayas digitado correctamente.</p>
                        </div>
                        <div className="actions">
                            <button className="desactivate" type="button" onClick={() => setErrorBusqueda("")}>
                            Cerrar
                            </button>
                        </div>
                        </div>
                    </div>
                    )}
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
            <div className="contenedor_exp_1">
            {mostrarFormulario && (
            <div className="contenedor-tarjetprofecional-r">
                <div className="card-profesional-notificacion">
                <svg
                    className="icono-doctor-profesional"
                    width="80"
                    height="80"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="32" cy="20" r="12" stroke="#00b4d8" strokeWidth="3" />
                    <path
                    d="M12 54V46C12 38.82 22 34 32 34C42 34 52 38.82 52 46V54"
                    stroke="#90e0ef"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
                    <path
                    d="M24 50L28 42"
                    stroke="#00b4d8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
                    <path
                    d="M40 50L36 42"
                    stroke="#00b4d8"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
                </svg>
                <h3>👤 Información del profesional</h3>
                <p><strong>Nombre:</strong> {`${usuario.first_name} ${usuario.last_name}`}</p>
                <p><strong>Tipo de documento:</strong> {usuario.tipo_doc}</p>
                <p><strong>N° Documento:</strong> {usuario.nro_doc}</p>
                <p><strong>Email:</strong> {usuario.email || "No disponible"}</p>

                <button className="btn-agregar-exp" onClick={() => setMostrarFormularioE(true)}>
                    ➕ Agregar experiencia
                </button>
                </div>
            </div>
            )}
            {mostrarFormularioE && <form action="" onSubmit={handleSubmit(onSubmit)} className="formulario-registro-academico">
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
            </form>}
            </div>
            </div>
        </div>
        </>
    )
}

export default ExperienciaLaboral;