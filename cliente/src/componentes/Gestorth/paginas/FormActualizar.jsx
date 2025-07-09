
import React from "react";
import { useForm } from "react-hook-form";
import Logo from "../../Homepage/componentes/Logo";
import EtiquetaInput from "../componentes/EtiquetaInput";
import ComboBox from "../componentes/ComboBox";
import Botones from "../componentes/Botones";
import "./FormActualizar.css";

const FormActualizar = ({ visible, onClose, tipoUsuario, setModal, setMostrarFormulario }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    data.tipo_usuario = tipoUsuario;

    try {
      const response = await fetch("http://127.0.0.1:8000/actualizar_datos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err?.detail || "Error al registrar.");
      }

      setModal({
        visible: true,
        tipo: "success",
        mensaje: "¡Usuario actualizado correctamente!",
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

  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <div className="form-contenedor__registro_rol">
          <form className="fromulario__actualizar-registro-personal" onSubmit={handleSubmit(onSubmit)}>
            <header className="header-form-registro-rol">
              <h1 className="tlt-header-formulario-rol">
                Actualizar {tipoUsuario === "auxiliar" ? "Auxiliar" : "Médico"}
              </h1>
            </header>

            {/* Datos personales comunes */}
            <div className="contenedor-inputs-doble-rol">
              <EtiquetaInput label="Nombre" placeholder="Nombres completos" register={register("datos_actualizar.first_name")} />
              <EtiquetaInput label="Apellidos" placeholder="Apellidos completos" register={register("datos_actualizar.last_name")} />
            </div>
            <div className="contenedor-inputs-doble-rol">
              <EtiquetaInput label="Fecha de expedición" type="date" register={register("datos_actualizar.fecha_exp_doc")} />
              <EtiquetaInput label="Lugar de expedición" placeholder="Lugar de expedición" register={register("datos_actualizar.lugar_exp_doc")} />
            </div>
            <div className="contenedor-inputs-doble-rol">
              <EtiquetaInput label="Fecha de nacimiento" type="date" register={register("datos_actualizar.fecha_nacimiento")} />
              <EtiquetaInput label="Teléfono" placeholder="Teléfono" register={register("datos_actualizar.telefono")} />
            </div>
            <div className="contenedor-inputs-doble-rol">
              <EtiquetaInput label="Nacionalidad" placeholder="Nacionalidad" register={register("datos_actualizar.nacionalidad")} />
              <EtiquetaInput label="Municipio" placeholder="Municipio" register={register("datos_actualizar.municipio")} />
            </div>
            <div className="contenedor-inputs-doble-rol">
              <ComboBox
                label="Sexo"
                register={register("datos_actualizar.sexo")}
                options={[
                  { value: "", label: "Selecciona una opción" },
                  { value: "M", label: "Masculino" },
                  { value: "F", label: "Femenino" },
                ]}
              />
              <ComboBox
                label="Estado civil"
                register={register("datos_actualizar.estado_civil")}
                options={[
                  { value: "", label: "Selecciona una opción" },
                  { value: "Soltero", label: "Soltero" },
                  { value: "Casado", label: "Casado" },
                  { value: "Divorciado", label: "Divorciado" },
                  { value: "Viudo", label: "Viudo" },
                  { value: "Union libre", label: "Unión libre" },
                  { value: "Separado", label: "Separado" },
                ]}
              />
            </div>

            {/* Formulario dinámico por tipo de usuario */}
            <div className="contenedor-inputs-doble-rol">
              {tipoUsuario === "medico" ? (
                <>
                  <ComboBox
                    label="Especialidad"
                    register={register("datos_rol.especialidad")}
                    options={[
                      { value: "", label: "Selecciona una opción" },
                      { value: "Pediatría", label: "Pediatría" },
                      { value: "Medicina General", label: "Medicina General" },
                      { value: "Enfermería", label: "Enfermería" },
                    ]}
                  />
                  <ComboBox
                    label="Tipo de contrato"
                    register={register("datos_rol.tipo_contrato")}
                    options={[
                      { value: "", label: "Selecciona una opción" },
                      { value: "1", label: "A término indefinido" },
                      { value: "2", label: "A término fijo" },
                      { value: "3", label: "Por obra o labor" },
                      { value: "4", label: "Ocasional" },
                      { value: "5", label: "Contrato de aprendizaje" },
                      { value: "6", label: "Contrato de prestación de servicios" },
                      { value: "7", label: "Contrato sindical" },
                    ]}
                  />
                </>
              ) : (
                <>
                  <ComboBox
                    label="Área de Apoyo"
                    register={register("datos_rol.area")}
                    options={[
                      { value: "", label: "Selecciona un área" },
                      { value: "Admisiones", label: "Admisiones" },
                      { value: "Archivo clínico", label: "Archivo clínico" },
                      { value: "Facturación", label: "Facturación" },
                      { value: "Call Center", label: "Call Center" },
                      { value: "Atención al usuario", label: "Atención al usuario" },
                    ]}
                  />
                  <ComboBox
                    label="Tipo de contrato"
                    register={register("datos_rol.tipo_contrato")}
                    options={[
                      { value: "", label: "Selecciona una opción" },
                      { value: "1", label: "A término indefinido" },
                      { value: "2", label: "A término fijo" },
                      { value: "3", label: "Por obra o labor" },
                      { value: "4", label: "Ocasional" },
                      { value: "5", label: "Contrato de aprendizaje" },
                      { value: "6", label: "Contrato de prestación de servicios" },
                      { value: "7", label: "Contrato sindical" },
                    ]}
                  />
                </>
              )}
            </div>

            {/* Botones */}
            <div className="contenedor-botones-editar-personal">
              <button className="btn-formactualizar btn-formactualizar--azul" onClick={onClose}>
                <svg
                  className="icono-formactualizar icono-formactualizar--actualizar"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 
                    7.04a1.003 1.003 0 0 0 0-1.41l-2.34-2.34a1.003 
                    1.003 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                </svg>
                <span className="texto-formactualizar">Actualizar</span>
              </button>

              {/* Botón Cerrar */}
              <button className="btn-formactualizar btn-formactualizar--rojo" onClick={onClose}>
                <svg
                  className="icono-formactualizar icono-formactualizar--cerrar"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path
                    fillRule="nonzero"
                    d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
                  />
                </svg>
                <span className="texto-formactualizar">Cerrar</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormActualizar;
