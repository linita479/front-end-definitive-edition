
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
          <Logo />
          <form className="fromulario__registro__rol" onSubmit={handleSubmit(onSubmit)}>
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
            <div className="contenedor-inputs-doble-rol">
              <Botones name="Actualizar" tipo="submit" />
              <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormActualizar;
