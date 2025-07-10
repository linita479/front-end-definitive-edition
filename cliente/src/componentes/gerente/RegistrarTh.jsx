import React from "react";
import { useState } from "react";
import EtiquetaInput from "../objetos/EtiquetaInput";
import ComboBox from "../objetos/ComboBox";
import Botones from "../objetos/Botones";
import { useForm } from "react-hook-form";
import './th.css'
const RegistroTh = () =>{
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [errorBusqueda, setErrorBusqueda] = useState("");
    const { register , handleSubmit, watch, formState: { errors } } = useForm();
    const [registroExitoso, setRegistroExitoso] = useState(false);

    const buscarUsuario = async (nrodoc)=>{
        console.log(sessionStorage.getItem("token"))
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
        data.tipo_usuario = "gestor_th";
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
            setRegistroExitoso(true);

            setTimeout(() => {
            setRegistroExitoso(false);
        }, 3000);
        } catch (error) {
            console.error("Error al registrar el auxiliar:", error);
        }
    };

    return(
        <>
        {registroExitoso && (
        <div className="modal-exito">
            <div className="modal-contenido">
            <span className="check-icono">✔️</span>
            <p>¡Registro exitoso!</p>
            </div>
        </div>
        )}

        <div>
            <div>
                <EtiquetaInput label="Numero de documento" type="number" placeholder="Numero de documento" register={register("nro_doc")} />
                <Botones name="Buscar" onClick={()=> buscarUsuario(watch("nro_doc"))}></Botones>
                {errorBusqueda && <p className="error">{errorBusqueda}</p>}
            </div>
            {mostrarFormulario && 
            <form action="" onSubmit={handleSubmit(onSubmit)} className="formulario-registro">
                <header className="header-form-personal-medico">
                    <h1 className="header-reGistro-medico-titulo">Registrar gestor de talento humano</h1>
                </header>
                <div className="contenedor-etiqueta-form-medico">
                    <EtiquetaInput label="Nombre" type="text" placeholder="Nombres completos" register={register("datos_actualizar.first_name",{required:"campo obligatorio"})} />
                    {errors.first_name && <span className="error">{errors.first_name.message}</span>}
                    <EtiquetaInput label="Apellidos" type="text" placeholder="Apellidos completos" register={register("datos_actualizar.last_name",{required:"campo obligatorio"})} />
                    {errors.last_name && <span className="error">{errors.last_name.message}</span>}
                </div>
                <div className="contenedor-etiqueta-form-medico">
                    <EtiquetaInput label="Fecha de expedicion" type="date" placeholder="Fecha de expedicion" register={register("datos_actualizar.fecha_exp_doc",{required:"campo obligatorio"})} />
                    {errors.fecha_exp_doc && <span className="error">{errors.fecha_exp_doc.message}</span>}
                    <EtiquetaInput label="Lugar de expedicion" type="text" placeholder="Lugar de expedicion" register={register("datos_actualizar.lugar_exp_doc",{required:"campo obligatorio"})} />
                    {errors.lugar_exp_doc && <span className="error">{errors.lugar_exp_doc.message}</span>}
                </div>
                <div className="contenedor-etiqueta-form-medico">
                    <EtiquetaInput label="Fecha de Nacimiento" type="date" placeholder="Fecha de nacimiento" register={register("datos_actualizar.fecha_nacimiento",{required:"campo obligatorio"})} />
                    {errors.fecha_nacimiento && <span className="error">{errors.fecha_nacimiento.message}</span>}
                    <EtiquetaInput label="Telefono" type="text" placeholder="Telefono" register={register("datos_actualizar.telefono",{required:"campo obligatorio"})} />
                    {errors.telefono && <span className="error">{errors.telefono.message}</span>}
                </div>
                <div className="contenedor-etiqueta-form-medico">
                    <EtiquetaInput label="Nacionalidad" type="text" placeholder="Nacionalidad" register={register("datos_actualizar.nacionalidad",{required:"campo obligatorio"})} />
                    {errors.nacionalidad && <span className="error">{errors.nacionalidad.message}</span>}
                    <EtiquetaInput label="Municipio" type="text" placeholder="Municipio" register={register("datos_actualizar.municipio",{required:"campo obligatorio"})} />
                    {errors.municipio && <span className="error">{errors.municipio.message}</span>}
                </div>
                <div className="contenedor-etiqueta-form-medico">
                    <ComboBox label="Sexo" register={register("datos_actualizar.sexo")}  options={[
                        { value: '', label: 'Selecciona una opción' },
                        { value: 'M', label: 'Masculino' },
                        { value: 'F', label: 'Femenino' },
                    ]} />
                    {errors.sexo && <span className="error">{errors.sexo.message}</span>}
                    <ComboBox label="Estado civil" register={register("datos_actualizar.estado_civil",{required:"campo obligatorio"})} options={[
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
                    <ComboBox label="Tipo de contrato" register={register("datos_rol.tipo_contrato",{required:"campo obligatorio"})} options={[
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
                <Botones name="Registrar" tipo="submit" />
            </form>
            
            }
        </div>
        </>
    );

}

export default RegistroTh;