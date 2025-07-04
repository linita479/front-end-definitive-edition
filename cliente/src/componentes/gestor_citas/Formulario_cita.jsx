
import { useState , useEffect } from "react";
// Puedes diseñar el fondo opaco y contenedor
import { useForm } from "react-hook-form";
import EtiquetaInput from "../objetos/EtiquetaInput";
import ComboBox from "../objetos/ComboBox";
import Botones from "../objetos/Botones";

const ModalRegistrarCita = ({ isOpen, isClose, dia, hora }) => {
  const { register, handleSubmit } = useForm();
  const [listaMedicos, setListaMedicos] = useState([]);
  const [id_paciente, setIdPaciente] = useState("");

  const cargarMedicos = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/lista/medicos/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${sessionStorage.getItem("token")}`
        }
      });
      const result = await response.json();
      console.log("✅ Médicos cargados:", result);
      setListaMedicos(result);
    } catch (error) {
      console.error("❌ Error al cargar médicos:", error);
    }
  };

//   const onSubmit = async (data) => {
//     data.paciente = id_paciente;
//     data.fecha_solicitud = new Date().toISOString().split("T")[0];

//     try {
//       const response = await fetch("http://127.0.0.1:8000/citas/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${sessionStorage.getItem("token")}`
//         },
//         body: JSON.stringify(data)
//       });

//       const result = await response.json();
//       console.log("✅ Cita registrada:", result);
//       cerrar();
//     } catch (error) {
//       console.error("❌ Error al registrar cita:", error);
//     }
//   };
    useEffect(() => {
    cargarMedicos();
  }, []);
  if (!isOpen) return null;
  return (
    <div className="modal-fondo">
      <div className="modal-cita">
        <button className="cerrar-modal" onClick={isClose}>✖</button>
        <h2>Registrar Cita Médica</h2>
        <form onSubmit={handleSubmit("")}>
          <EtiquetaInput label="Fecha de Asignación" type="date" register={register("fecha_asignacion")} />
          <EtiquetaInput label="Especialidad" type="text" register={register("especialidad")} />

          <ComboBox label="Estado" register={register("estado")} options={[
            { value: "Pendiente", label: "Pendiente" },
            { value: "Confirmada", label: "Confirmada" },
            { value: "Cancelada", label: "Cancelada" },
            { value: "Atendida", label: "Atendida" },
          ]} />

          <ComboBox label="Tipo de Atención" register={register("tipo_atencion")} options={[
            { value: "Presencial", label: "Presencial" },
            { value: "Virtual", label: "Virtual" }
          ]} />
            <ComboBox label="Médico" register={register("medico")}
            onChange={(e) => setIdPaciente(e.target.value)}
            options={listaMedicos.map(medico => ({
            value: medico.id,
            label: medico.usuario.first_name + " " + medico.usuario.last_name
          }))} />
          <EtiquetaInput label="ID del Servicio" type="number" register={register("servicio")} />
          <EtiquetaInput label="ID del Centro Médico" type="number" register={register("centro_medico")} />
          <EtiquetaInput label="ID del Médico" type="number" register={register("medico")} />

          <Botones texto="Guardar Cita" tipo="submit" />
        </form>
      </div>
    </div>
  );
};

export default ModalRegistrarCita;
