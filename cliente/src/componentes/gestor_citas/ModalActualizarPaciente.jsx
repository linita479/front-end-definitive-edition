import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import EtiquetaInput from "../Gestorth/componentes/EtiquetaInput";
import ComboBox from "../Gestorth/componentes/ComboBox";
import Botones from "../Gestorth/componentes/Botones";
import "./modal_actualizar_paciente.css";

const ModalActualizarPaciente = ({ isOpen, onClose, paciente }) => {
  const { register, handleSubmit, setValue } = useForm();
  


  useEffect(() => {
    if (paciente) {
      const { usuario } = paciente;

      // Rellenar datos del usuario
      setValue("datos_actualizar.first_name", usuario.first_name || "");
      setValue("datos_actualizar.last_name", usuario.last_name || "");
      setValue("datos_actualizar.telefono", usuario.telefono || "");
      setValue("datos_actualizar.estado_civil", usuario.estado_civil || "");
      setValue("datos_actualizar.sexo", usuario.sexo || "");
      setValue("datos_actualizar.fecha_exp_doc", usuario.fecha_exp_doc || "");
      setValue("datos_actualizar.lugar_exp_doc", usuario.lugar_exp_doc || "");
      setValue("datos_actualizar.fecha_nacimiento", usuario.fecha_nacimiento || "");
      setValue("datos_actualizar.municipio", usuario.municipio || "");
      setValue("datos_actualizar.nacionalidad", usuario.nacionalidad || "");

      // Rellenar datos del paciente
      setValue("datos_rol.ocupacion", paciente.ocupacion || "");
      setValue("datos_rol.regimen", paciente.regimen || "");
      setValue("datos_rol.eps", paciente.eps || "");
      setValue("datos_rol.estrato", paciente.estrato || "");
      setValue("datos_rol.grupo_atencion_especial", paciente.grupo_atencion_especial || "");
      setValue("datos_rol.grupo_sanguineo", paciente.grupo_sanguineo || "");
    }
  }, [paciente, setValue]);

  const onSubmit = async (data) => {
    const payload = {
      nro_doc: paciente.usuario.nro_doc,
      tipo_usuario: "paciente",
      datos_actualizar: data.datos_actualizar,
      datos_rol: data.datos_rol,
    };

    try {
      const resp = await fetch("http://127.0.0.1:8000/actualizar_datos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await resp.json();
      if (resp.ok) {
        alert("✅ Datos actualizados correctamente.");
        onClose();
      } else {
        console.error("❌ Error:", result);
        alert("❌ Error al actualizar: " + JSON.stringify(result));
      }
    } catch (err) {
      console.error("❌ Error inesperado:", err);
      alert("❌ Error inesperado al actualizar.");
    }
  };

  if (!isOpen || !paciente) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <h2>📝 Actualizar datos del paciente</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* --- DATOS PERSONALES --- */}
          <div className="columna-formulario">
            <h3>👤 Datos del usuario</h3>
            <div className="contenedor-inputs-doble-rol">
              <EtiquetaInput label="Nombre" register={register("datos_actualizar.first_name")} />
              <EtiquetaInput label="Apellidos" register={register("datos_actualizar.last_name")} />
            </div>
            <div className="contenedor-inputs-doble-rol">
              <EtiquetaInput label="Fecha expedición" type="date" register={register("datos_actualizar.fecha_exp_doc")} />
              <EtiquetaInput label="Lugar expedición" register={register("datos_actualizar.lugar_exp_doc")} />
            </div>
            <div className="contenedor-inputs-doble-rol">
              <EtiquetaInput label="Fecha nacimiento" type="date" register={register("datos_actualizar.fecha_nacimiento")} />
              <EtiquetaInput label="Teléfono" register={register("datos_actualizar.telefono")} />
            </div>
            <div className="contenedor-inputs-doble-rol">
              <EtiquetaInput label="Nacionalidad" register={register("datos_actualizar.nacionalidad")} />
              <EtiquetaInput label="Municipio" register={register("datos_actualizar.municipio")} />
            </div>
            <div className="contenedor-inputs-doble-rol">
              <ComboBox label="Sexo" register={register("datos_actualizar.sexo")} options={[
                { value: "M", label: "Masculino" },
                { value: "F", label: "Femenino" }
              ]} />
              <ComboBox label="Estado civil" register={register("datos_actualizar.estado_civil")} options={[
                { value: "Soltero", label: "Soltero" },
                { value: "Casado", label: "Casado" },
                { value: "Divorciado", label: "Divorciado" },
                { value: "Viudo", label: "Viudo" },
                { value: "Union libre", label: "Unión libre" },
                { value: "Separado", label: "Separado" }
              ]} />
            </div>
          </div>
          <div className="columna-formulario">
            <h3>🏥 Información clínica</h3>
              <div className="contenedor-inputs-doble-rol">
              <EtiquetaInput label="Ocupación" register={register("datos_rol.ocupacion")} />
              <EtiquetaInput label="EPS" register={register("datos_rol.eps")} />
            </div>
            <div className="contenedor-inputs-doble-rol">
              <ComboBox label="Régimen" register={register("datos_rol.regimen")} options={[
                { value: "RC", label: "Régimen Contributivo" },
                { value: "RS", label: "Régimen Subsidiado" },
                { value: "RE", label: "Régimen Especial" },
                { value: "PA", label: "Particular" }
              ]} />
              <ComboBox label="Estrato" register={register("datos_rol.estrato")} options={[
                { value: "1", label: "Estrato 1" },
                { value: "2", label: "Estrato 2" },
                { value: "3", label: "Estrato 3" },
                { value: "4", label: "Estrato 4" },
                { value: "5", label: "Estrato 5" },
                { value: "6", label: "Estrato 6" }
              ]} />
            </div>
            <div className="contenedor-inputs-doble-rol">
              <ComboBox label="Grupo atención especial" register={register("datos_rol.grupo_atencion_especial")} options={[
                { value: "I", label: "Indígena" },
                { value: "N", label: "Negro" },
                { value: "D", label: "Desplazado" },
                { value: "O", label: "Otro" }
              ]} />
              <ComboBox label="Grupo sanguíneo (RH)" register={register("datos_rol.grupo_sanguineo")} options={[
                { value: "A+", label: "A Positivo" },
                { value: "A-", label: "A Negativo" },
                { value: "B+", label: "B Positivo" },
                { value: "B-", label: "B Negativo" },
                { value: "AB+", label: "AB Positivo" },
                { value: "AB-", label: "AB Negativo" },
                { value: "O+", label: "O Positivo" },
                { value: "O-", label: "O Negativo" }
              ]} />
            </div>

            {/* Botones */}
            <div className="contenedor-inputs-doble-rol botones-finales">
              <Botones texto="Actualizar" tipo="submit" />
              <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ModalActualizarPaciente;

