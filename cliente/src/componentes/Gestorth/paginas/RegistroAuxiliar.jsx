import React from "react";
import { useState } from "react";
import EtiquetaInput from "../componentes/EtiquetaInput";
import ComboBox from "../componentes/ComboBox";
import Botones from "../componentes/Botones";
import { useForm } from "react-hook-form";
import './Registroauxiliar.css'
import BusquedaDocumento from "../componentes/BusquedaDocumento";
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
        <div>
            <h1 className="titulo-registro">Registro del auxiliar</h1>
        <BusquedaDocumento
        register={register("nro_doc")}
        onClick={() => buscarUsuario(watch("nro_doc"))}
        />

            {mostrarFormulario && 
                <form onSubmit={handleSubmit(onSubmit)} className="formulario-registro">
                <div className="grid-formulario">
                    <EtiquetaInput label="Nombre" type="text" placeholder="Nombres completos" register={register("datos_actualizar.first_name", { required: "campo obligatorio" })} />
                    <EtiquetaInput label="Apellidos" type="text" placeholder="Apellidos completos" register={register("datos_actualizar.last_name", { required: "campo obligatorio" })} />
                    
                    <EtiquetaInput label="Fecha de expedición" type="date" placeholder="Fecha de expedición" register={register("datos_actualizar.fecha_exp_doc", { required: "campo obligatorio" })} />
                    <EtiquetaInput label="Lugar de expedición" type="text" placeholder="Lugar de expedición" register={register("datos_actualizar.lugar_exp_doc", { required: "campo obligatorio" })} />

                    <EtiquetaInput label="Fecha de nacimiento" type="date" placeholder="Fecha de nacimiento" register={register("datos_actualizar.fecha_nacimiento", { required: "campo obligatorio" })} />
                    <EtiquetaInput label="Teléfono" type="text" placeholder="Teléfono" register={register("datos_actualizar.telefono", { required: "campo obligatorio" })} />

                    <EtiquetaInput label="Nacionalidad" type="text" placeholder="Nacionalidad" register={register("datos_actualizar.nacionalidad", { required: "campo obligatorio" })} />
                    <EtiquetaInput label="Municipio" type="text" placeholder="Municipio" register={register("datos_actualizar.municipio", { required: "campo obligatorio" })} />

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

                <div className="botones-centro">
                    <Botones name="Registrar" tipo="submit" />
                </div>
                </form>
                }
            
        </div>
        </>
    );

}

export default RegistroAuxiliar;