import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ComboBox from "../componentes/ComboBox";
import Botones from "../componentes/Botones";
import EtiquetaInput from "../componentes/EtiquetaInput";
import BusquedaDocumento from "../componentes/BusquedaDocumento";
import Logo from "../../Homepage/componentes/Logo";

import "./Busqueda.css";
import "./Registromedico.css";
import "./RegistroMedicoModal.css";

const RegistroAuxiliar = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [errorBusqueda, setErrorBusqueda] = useState("");
  const [cargando, setCargando] = useState(false);
  const [usuario, setUsuario] = useState(null);

  const [modal, setModal] = useState({
    visible: false,
    tipo: "success",
    mensaje: "",
  });
  const cerrarModal = () => setModal({ ...modal, visible: false });

  const buscarUsuario = async (nroDoc) => {
    if (!nroDoc) return;
    setCargando(true);
    try {
      const resp = await fetch(`http://127.0.0.1:8000/buscar_usuario/?nro_doc=${nroDoc}`, {
        headers: { Authorization: `Token ${sessionStorage.getItem("token")}` }
      });

      const data = await resp.json();

      if (resp.ok) {
        setUsuario(data);
        setMostrarFormulario(true);
        setErrorBusqueda("");
      } else {
        setUsuario(null);
        setMostrarFormulario(false);
        setErrorBusqueda("Usuario no encontrado.");
      }
    } catch (err) {
      setUsuario(null);
      setMostrarFormulario(false);
      setErrorBusqueda("Error de red.");
    } finally {
      setTimeout(() => setCargando(false), 800);
    }
  };

  const onSubmit = async (data) => {
    console.log(data)
    data.tipo_usuario = "auxiliar";
    const payload = { ...data, usuario };

    try {
      const resp = await fetch("http://127.0.0.1:8000/actualizar_datos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify(data)
      });

      if (!resp.ok) throw new Error("Error al actualizar datos.");

      const respHV = await fetch("http://127.0.0.1:8000/api/gestor_th/hoja/vida/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify(payload)
      });

      if (!respHV.ok) {
        const errHV = await respHV.json();
        throw new Error(errHV?.detail || "Error al crear hoja de vida.");
      }

      setModal({
        visible: true,
        tipo: "success",
        mensaje: "¡Registro y hoja de vida creados exitosamente!",
      });

      setMostrarFormulario(false);
    } catch (err) {
      setModal({
        visible: true,
        tipo: "error",
        mensaje: err.message || "Hubo un problema. Intenta nuevamente.",
      });
    }
  };

  return (
    <>
      <div className="josessasa">
        <div className="cont-logo-flex-start">
          <Logo />
        </div>

        <div className="super-contenedor">
          <BusquedaDocumento
            register={register("nro_doc")}
            onClick={() => buscarUsuario(watch("nro_doc"))}
          />
          {errorBusqueda && <p className="mensaje-error">{errorBusqueda}</p>}

          {mostrarFormulario && (
            <form onSubmit={handleSubmit(onSubmit)} className="formulario-registro">
              <div className="grid-formulario">
                <EtiquetaInput label="Nombre" type="text" placeholder="Nombres completos"
                  register={register("datos_actualizar.first_name", { required: "Campo obligatorio" })} />
                <EtiquetaInput label="Apellidos" type="text" placeholder="Apellidos completos"
                  register={register("datos_actualizar.last_name", { required: "Campo obligatorio" })} />
                <EtiquetaInput label="Fecha de expedición" type="date" placeholder="Fecha de expedición"
                  register={register("datos_actualizar.fecha_exp_doc", { required: "Campo obligatorio" })} />
                <EtiquetaInput label="Lugar de expedición" type="text" placeholder="Lugar de expedición"
                  register={register("datos_actualizar.lugar_exp_doc", { required: "Campo obligatorio" })} />
                <EtiquetaInput label="Fecha de nacimiento" type="date" placeholder="Fecha de nacimiento"
                  register={register("datos_actualizar.fecha_nacimiento", { required: "Campo obligatorio" })} />
                <EtiquetaInput label="Teléfono" type="text" placeholder="Teléfono"
                  register={register("datos_actualizar.telefono", { required: "Campo obligatorio" })} />
                <EtiquetaInput label="Nacionalidad" type="text" placeholder="Nacionalidad"
                  register={register("datos_actualizar.nacionalidad", { required: "Campo obligatorio" })} />
                <EtiquetaInput label="Municipio" type="text" placeholder="Municipio"
                  register={register("datos_actualizar.municipio", { required: "Campo obligatorio" })} />

                <ComboBox label="Sexo" register={register("datos_actualizar.sexo")}
                  options={[
                    { value: '', label: 'Selecciona una opción' },
                    { value: 'M', label: 'Masculino' },
                    { value: 'F', label: 'Femenino' }
                  ]} />

                <ComboBox label="Estado civil" register={register("datos_actualizar.estado_civil")}
                  options={[
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
                <ComboBox label="Tipo de contrato" register={register("datos_rol.tipo_contrato")}
                  options={[
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
          )}
        </div>
      </div>

      {cargando && (
        <div className="modal-overlay">
          <div className="wrapper">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bouncer">
                <div className="circle"></div>
                <div className="shadow"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {modal.visible && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className={`modal-card ${modal.tipo}`} onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-message">{modal.mensaje}</h2>
            <button className="modal-btn" onClick={cerrarModal}>Aceptar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default RegistroAuxiliar;
