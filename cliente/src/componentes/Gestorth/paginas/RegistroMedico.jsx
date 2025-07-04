import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ComboBox from "../componentes/ComboBox";
import Botones from "../componentes/Botones";
import EtiquetaInput from "../componentes/EtiquetaInput";
import './Busqueda.css'
import './Registromedico.css'

const RegistrarMedico = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [errorBusqueda, setErrorBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();

  const buscarUsuario = async (nrodoc) => {
    setCargando(true);
    try {
      const response = await fetch(`http://127.0.0.1:8000/buscar_usuario/?nro_doc=${nrodoc}`, {
        method: "GET",
        headers: {
          "Authorization": `Token ${sessionStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMostrarFormulario(true);
        setErrorBusqueda("");
        console.log("Usuario encontrado:", data.usuario);
      } else {
        setMostrarFormulario(false);
        setErrorBusqueda("Usuario no encontrado.");
      }
    } catch (error) {
      setMostrarFormulario(false);
      setErrorBusqueda("Error de red.");
      console.error("Error:", error);
    } finally {
      setTimeout(() => {
        setCargando(false);
      }, 1000);
    }
  };

  const onSubmit = async (data) => {
    data.tipo_usuario = "medico";
    console.log("Datos del formulario:", data);

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
      console.error("❌ Error al registrar médico:", error);
    }
  };

  return (
    <div className="josessasa">
      <div className="cont-tlt-registro-medico">
          <h1 className="titulo-registro-medico-personal">Registro del médico</h1>
      </div>
      {/* 🔲 SUPER CONTENEDOR */}
      <div className="super-contenedor">

        {/* 🔍 FORMULARIO DE BÚSQUEDA */}
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
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" width="24" height="24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                </svg>
              </button>
            </div>
            {errorBusqueda && <p className="mensaje-error">{errorBusqueda}</p>}
          </div>
        </div>

        {/* 🧾 FORMULARIO DE REGISTRO */}
        {mostrarFormulario && (
          <form onSubmit={handleSubmit(onSubmit)} className="formulario-registro">
            <div className="grid-formulario">
              <div className="contenedor-etiqueta-form-medico">
                <EtiquetaInput label="Nombre" type="text" placeholder="Nombres completos" register={register("datos_actualizar.first_name")} />
                <EtiquetaInput label="Apellidos" type="text" placeholder="Apellidos completos" register={register("datos_actualizar.last_name")} />
              </div>
              <div className="contenedor-etiqueta-form-medico">
                <EtiquetaInput label="Fecha de expedición" type="date" placeholder="Fecha de expedición" register={register("datos_actualizar.fecha_exp_doc")} />
                <EtiquetaInput label="Lugar de expedición" type="text" placeholder="Lugar de expedición" register={register("datos_actualizar.lugar_exp_doc")} />
              </div>
              <div className="contenedor-etiqueta-form-medico">
                <EtiquetaInput label="Fecha de nacimiento" type="date" placeholder="Fecha de nacimiento" register={register("datos_actualizar.fecha_nacimiento")} />
                <EtiquetaInput label="Teléfono" type="text" placeholder="Teléfono" register={register("datos_actualizar.telefono")} />
              </div>
              <div className="contenedor-etiqueta-form-medico">
                <EtiquetaInput label="Nacionalidad" type="text" placeholder="Nacionalidad" register={register("datos_actualizar.nacionalidad")} />
                <EtiquetaInput label="Municipio" type="text" placeholder="Municipio" register={register("datos_actualizar.municipio")} />
              </div>
              <div className="contenedor-etiqueta-form-medico">
                <ComboBox label="Sexo" register={register("datos_actualizar.sexo")} options={[
                  { value: '', label: 'Selecciona una opción' },
                  { value: 'M', label: 'Masculino' },
                  { value: 'F', label: 'Femenino' },
                ]} />

                <ComboBox label="Estado civil" register={register("datos_actualizar.estado_civil")} options={[
                  { value: '', label: 'Selecciona una opción' },
                  { value: 'Soltero', label: 'Soltero' },
                  { value: 'Casado', label: 'Casado' },
                  { value: 'Divorciado', label: 'Divorciado' },
                  { value: 'Viudo', label: 'Viudo' },
                  { value: 'Union libre', label: 'Unión libre' },
                  { value: 'Separado', label: 'Separado' }
                ]} />
              </div>
              <div className="contenedor-etiqueta-form-medico">
                <ComboBox label="Especialidad" register={register("datos_profesional.especialidad")} options={[
                  { value: '', label: 'Selecciona una opción' },
                  { value: 'Pediatría', label: 'Pediatría' },
                  { value: 'Medicina General', label: 'Medicina General' },
                  { value: 'Enfermería', label: 'Enfermería' },
                ]} />

                <ComboBox label="Tipo de contrato" register={register("datos_rol.tipo_de_contrato")} options={[
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
              <div className="cont-btn-form-personam">
                  <Botones name="Registrar" tipo="submit" />
              </div>
            </div>
          </form>
        )}

      </div>

      {cargando && (
        <div className="modal-overlay">
          <div className="wrapper">
            <div className="bouncer"><div className="circle"></div><div className="shadow"></div></div>
            <div className="bouncer"><div className="circle"></div><div className="shadow"></div></div>
            <div className="bouncer"><div className="circle"></div><div className="shadow"></div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrarMedico;
