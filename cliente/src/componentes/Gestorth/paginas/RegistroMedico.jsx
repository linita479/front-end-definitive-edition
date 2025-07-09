import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ComboBox      from "../componentes/ComboBox";
import Botones       from "../componentes/Botones";
import EtiquetaInput from "../componentes/EtiquetaInput";

import "./Busqueda.css";
import "./Registromedico.css";
import "./RegistroMedicoModal.css";   // ⬅️ estilos del modal
import Logo from "../../Homepage/componentes/Logo";

const RegistrarMedico = () => {
  /* ───────────── hooks ───────────── */
  const { register, handleSubmit, watch, formState:{ errors } } = useForm();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [errorBusqueda,     setErrorBusqueda]     = useState("");
  const [cargando,          setCargando]          = useState(false);
  const [usuario,          setUsuario]          = useState("");

  /* modal éxito / error */
  const [modal, setModal] = useState({
    visible : false,
    tipo    : "success",           // "success" | "error"
    mensaje : "",
  });
  const cerrarModal = () => setModal({ ...modal, visible:false });

  /* ───────────── buscar usuario ───────────── */
  const buscarUsuario = async (nroDoc) => {
    console.log(sessionStorage.getItem("token"))
    if(!nroDoc) return;
    setCargando(true);
    try{
      const resp = await fetch(
        `http://127.0.0.1:8000/buscar_usuario/?nro_doc=${nroDoc}`,
        { headers:{ Authorization:`Token ${sessionStorage.getItem("token")}` } }
      );

      if(resp.ok){
        setMostrarFormulario(true);
        setErrorBusqueda("");
      }else{
        setMostrarFormulario(false);
        setErrorBusqueda("Usuario no encontrado.");
      }
      const data = await resp.json()
      console.log(data)
        setUsuario(data)
    }catch{
      setMostrarFormulario(false);
      setErrorBusqueda("Error de red.");
    }finally{
      setTimeout(()=>setCargando(false),800);
    }
  };

  /* ───────────── submit ───────────── */
  const onSubmit = async (data) => {
  console.log(data)
  data.tipo_usuario = "medico";
  const dataHV = {
    ...data,
    usuario: usuario, // Asegúrate de que `usuario` contenga lo necesario
  };

  try {
    const resp = await fetch("http://127.0.0.1:8000/actualizar_datos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    });

    if (resp.ok) {
      // Si todo va bien, registramos también la hoja de vida
      const respHV = await fetch("http://127.0.0.1:8000/api/gestor_th/hoja/vida/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(dataHV),
      });

      if (!respHV.ok) {
        const errHV = await respHV.json();
        console.log(errHV)
        throw new Error(errHV?.detail || "Error al generar la hoja de vida.");
      }

      setModal({
        visible: true,
        tipo: "success",
        mensaje: "¡Registro y hoja de vida realizados con éxito!",
      });
      setMostrarFormulario(false);
    } else {
      const err = await resp.json();
      throw new Error(err?.detail || "Error al registrar.");
    }
  } catch (err) {
    setModal({
      visible: true,
      tipo: "error",
      mensaje: err.message || "Hubo un problema. Intenta nuevamente.",
    });
  }
};


  return(
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
                placeholder="Número de documento"
                {...register("nro_doc")}
              />
              <button
                type="button"
                className="searchButton"
                onClick={()=>buscarUsuario(watch("nro_doc"))}
              >
                <svg viewBox="0 0 24 24" width="22" height="22" stroke="white" strokeWidth="2" fill="none">
                  <path strokeLinecap="round" strokeLinejoin="round"
                        d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"/>
                </svg>
              </button>
            </div>
                <div className="aviso-registro-usuario">
      ⚠️ Este formulario permite registrar a un usuario ya existente como personal médico. Asegúrate de haberlo buscado correctamente antes de continuar.
    </div>

            {errorBusqueda && <p className="mensaje-error">{errorBusqueda}</p>}
          </div>
        </div>

        {mostrarFormulario && (
          <form onSubmit={handleSubmit(onSubmit)} className="formulario-registro">
            <header className="header-form-personal-medico">
              <h1 className="header-reGistro-medico-titulo">Registro personal médico</h1>
            </header>

            <div className="grid-formulario">
              {/* fila 1 */}
              <div className="contenedor-etiqueta-form-medico">
                <EtiquetaInput label="Nombre"
                               placeholder="Nombres completos"
                               register={register("datos_actualizar.first_name")}/>
                <EtiquetaInput label="Apellidos"
                               placeholder="Apellidos completos"
                               register={register("datos_actualizar.last_name")}/>
              </div>

              {/* fila 2 */}
              <div className="contenedor-etiqueta-form-medico">
                <EtiquetaInput label="Fecha de expedición"
                               type="date"
                               register={register("datos_actualizar.fecha_exp_doc")}/>
                <EtiquetaInput label="Lugar de expedición"
                               placeholder="Lugar de expedición"
                               register={register("datos_actualizar.lugar_exp_doc")}/>
              </div>

              {/* fila 3 */}
              <div className="contenedor-etiqueta-form-medico">
                <EtiquetaInput label="Fecha de nacimiento"
                               type="date"
                               register={register("datos_actualizar.fecha_nacimiento")}/>
                <EtiquetaInput label="Teléfono"
                               placeholder="Teléfono"
                               register={register("datos_actualizar.telefono")}/>
              </div>

              {/* fila 4 */}
              <div className="contenedor-etiqueta-form-medico">
                <EtiquetaInput label="Nacionalidad"
                               placeholder="Nacionalidad"
                               register={register("datos_actualizar.nacionalidad")}/>
                <EtiquetaInput label="Municipio"
                               placeholder="Municipio"
                               register={register("datos_actualizar.municipio")}/>
              </div>

              {/* fila 5 – combos */}
              <div className="contenedor-etiqueta-form-medico">
                <ComboBox label="Sexo"
                          register={register("datos_actualizar.sexo")}
                          options={[
                            {value:"",  label:"Selecciona una opción"},
                            {value:"M", label:"Masculino"},
                            {value:"F", label:"Femenino"},
                          ]}/>

                <ComboBox label="Estado civil"
                          register={register("datos_actualizar.estado_civil")}
                          options={[
                            {value:"",            label:"Selecciona una opción"},
                            {value:"Soltero",     label:"Soltero"},
                            {value:"Casado",      label:"Casado"},
                            {value:"Divorciado",  label:"Divorciado"},
                            {value:"Viudo",       label:"Viudo"},
                            {value:"Union libre", label:"Unión libre"},
                            {value:"Separado",    label:"Separado"},
                          ]}/>
              </div>

              {/* fila 6 – combos */}
              <div className="contenedor-etiqueta-form-medico">
                <ComboBox label="Especialidad"
                          register={register("datos_rol.especialidad")}
                          options={[
                            {value:"", label:"Selecciona una opción"},
                            {value:"Pediatría",        label:"Pediatría"},
                            {value:"Medicina General", label:"Medicina General"},
                            {value:"Enfermería",       label:"Enfermería"},
                          ]}/>

                <ComboBox label="Tipo de contrato"
                          register={register("datos_rol.contrato")}
                          options={[
                            {value:"",  label:"Selecciona una opción"},
                            {value:"1", label:"A término indefinido"},
                            {value:"2", label:"A término fijo"},
                            {value:"3", label:"Por obra o labor"},
                            {value:"4", label:"Ocasional"},
                            {value:"5", label:"Contrato de aprendizaje"},
                            {value:"6", label:"Prestación de servicios"},
                            {value:"7", label:"Contrato sindical"},
                          ]}/>
              </div>

              {/* botón */}
              <div className="cont-btn-form-personam">
                <Botones name="Registrar" tipo="submit"/>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* spinner de carga */}
      {cargando && (
        <div className="modal-overlay">
          <div className="wrapper">
            {[...Array(3)].map((_,i)=>(
              <div key={i} className="bouncer">
                <div className="circle"></div>
                <div className="shadow"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* modal éxito / error */}
      {modal.visible && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className={`modal-card ${modal.tipo}`}
               onClick={(e)=>e.stopPropagation()}>
            {modal.tipo==="success"?(
              <svg className="modal-icon" viewBox="0 0 24 24" width="48" height="48">
                <path fill="none" stroke="#fff" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"
                      d="M9 12l2 2 4-4"/>
                <circle cx="12" cy="12" r="10" fill="none" stroke="#fff" strokeWidth="2"/>
              </svg>
            ):(
              <svg className="modal-icon" viewBox="0 0 24 24" width="48" height="48">
                <line x1="18" y1="6" x2="6" y2="18" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                <line x1="6" y1="6" x2="18" y2="18" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="12" r="10" fill="none" stroke="#fff" strokeWidth="2"/>
              </svg>
            )}

            <h2 className="modal-message">{modal.mensaje}</h2>
            <button className="modal-btn" onClick={cerrarModal}>Aceptar</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default RegistrarMedico;
