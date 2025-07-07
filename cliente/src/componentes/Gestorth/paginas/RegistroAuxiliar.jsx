import React from "react";
import { useState } from "react";
import EtiquetaInput from "../componentes/EtiquetaInput";
import ComboBox from "../componentes/ComboBox";
import Botones from "../componentes/Botones";
import { useForm } from "react-hook-form";
import './Registroauxiliar.css'
import Logo from "../../Homepage/componentes/Logo";
const RegistroAuxiliar = () =>{
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
    const onSubmit = async(data) => {
        console.log("Datos del formulario:", data);
        data.tipo_usuario = "auxiliar";
        console.log("Datos a enviar:", data);
        try {
            const response = await fetch("http://127.0.0.1:8000/actualizar_datos/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${sessionStorage.getItem("token")}`,
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            console.log("✅ Registro exitoso:", result);
        } catch (error) {
            console.error("Error al registrar el auxiliar:", error);
        }
    };

    return(
        <>
        <div className="josessasa">
            <div className="cont-logo-flex-start">
                <Logo/>
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
                {mostrarFormulario && 
                    <form onSubmit={handleSubmit(onSubmit)} className="formulario-registro">
                        <header className="header-form-personal-medico">
                            <h1 className="header-reGistro-medico-titulo">Registro del auxiliar medico</h1>
                        </header>
                        <div className="contenedor-etiqueta-form-medico">
                            <EtiquetaInput label="Nombre" type="text" placeholder="Nombres completos" register={register("datos_actualizar.first_name", { required: "campo obligatorio" })} />
                            <EtiquetaInput label="Apellidos" type="text" placeholder="Apellidos completos" register={register("datos_actualizar.last_name", { required: "campo obligatorio" })} />
                        </div>
                        <div className="contenedor-etiqueta-form-medico">
                            <EtiquetaInput label="Fecha de expedición" type="date" placeholder="Fecha de expedición" register={register("datos_actualizar.fecha_exp_doc", { required: "campo obligatorio" })} />
                            <EtiquetaInput label="Lugar de expedición" type="text" placeholder="Lugar de expedición" register={register("datos_actualizar.lugar_exp_doc", { required: "campo obligatorio" })} />
                        </div>
                        <div className="contenedor-etiqueta-form-medico">
                            <EtiquetaInput label="Fecha de nacimiento" type="date" placeholder="Fecha de nacimiento" register={register("datos_actualizar.fecha_nacimiento", { required: "campo obligatorio" })} />
                            <EtiquetaInput label="Teléfono" type="text" placeholder="Teléfono" register={register("datos_actualizar.telefono", { required: "campo obligatorio" })} />
                        </div>
                        <div className="contenedor-etiqueta-form-medico">
                            <EtiquetaInput label="Nacionalidad" type="text" placeholder="Nacionalidad" register={register("datos_actualizar.nacionalidad", { required: "campo obligatorio" })} />
                            <EtiquetaInput label="Municipio" type="text" placeholder="Municipio" register={register("datos_actualizar.municipio", { required: "campo obligatorio" })} />
                        </div>
                        <div className="contenedor-etiqueta-form-medico">
                            <ComboBox label="Sexo" register={register("datos_actualizar.sexo")} options={[
                            { value: '', label: 'Selecciona una opción' },
                            { value: 'M', label: 'Masculino' },
                            { value: 'F', label: 'Femenino' }
                            ]} />

                            <ComboBox label="Estado civil" register={register("datos_actualizar.estado_civil", { required: "campo obligatorio" })} options={[
                            { value: '', label: 'Selecciona una opción' },
                            { value: 'Soltero', label: 'Soltero' },
                            { value: 'Casado', label: 'Casado' },
                            { value: 'Divorciado', label: 'Divorciado' },
                            { value: 'Viudo', label: 'Viudo' },
                            { value: 'Union libre', label: 'Unión libre' },
                            { value: 'Separado', label: 'Separado' }
                            ]} />
                        </div>
                        <div className="contenedor-etiqueta-form-medico-solito">
                            <ComboBox label="Tipo de contrato" register={register("datos_rol.tipo_contrato", { required: "campo obligatorio" })} options={[
                            { value: '', label: 'Selecciona una opción' },
                            { value: '1', label: 'A término indefinido' },
                            { value: '2', label: 'A término fijo' },
                            { value: '3', label: 'Por obra o labor' },
                            { value: '4', label: 'Ocasional' },
                            { value: '5', label: 'Contrato de aprendizaje' },
                            { value: '6', label: 'Contrato de prestación de servicios' },
                            { value: '7', label: 'Contrato sindical' }
                            ]} />
                        </div>
                    <div className="botones-centro-registro-auxiliar">
                        <Botones name="Registrar" tipo="submit" />
                    </div>
                </form>
                }
            </div>
        </div>
        </>
    );

}

export default RegistroAuxiliar;