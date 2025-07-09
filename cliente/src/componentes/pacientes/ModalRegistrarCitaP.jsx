import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EtiquetaInput from "../objetos/EtiquetaInput";
import ComboBox from "../objetos/ComboBox";
import Botones from "../objetos/Botones";
import "./modal_formulario_cita.css";

const ModalRegistrarCitaP = ({ isOpen, isClose, dia, hora, medicoSeleccionado }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [listaMedicos, setListaMedicos] = useState([]);
  const [centros, setCentros] = useState([]);
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const solicitudes = [
          fetch("http://127.0.0.1:8000/api/gerente/centro_medico/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${sessionStorage.getItem("token")}`,
            }
          }),
          fetch("http://127.0.0.1:8000/api/gerente/servicio/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${sessionStorage.getItem("token")}`,
            }
          })
        ];

        if (!medicoSeleccionado) {
          solicitudes.push(
            fetch("http://127.0.0.1:8000/lista/medicos/", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${sessionStorage.getItem("token")}`
              }
            })
          );
        }

        const resps = await Promise.all(solicitudes);
        const [resCentros, resServicios, resMedicos] = await Promise.all(resps.map(r => r.json()));

        setCentros(resCentros);
        setServicios(resServicios);
        if (!medicoSeleccionado) setListaMedicos(resMedicos);
      } catch (error) {
        console.error("❌ Error cargando datos:", error);
      }
    };

    cargarDatos();
  }, [medicoSeleccionado]);

  // ✅ NUEVA función con formato local correcto
const formatearFechaYHora = (dia, horaTexto) => {
  const limpio = horaTexto.split(" ")[0]; // Quita "a. m." / "p. m." si viene
  const [hora, minuto] = limpio.split(":");
  const fecha = new Date(dia);
  fecha.setHours(parseInt(hora), parseInt(minuto), 0, 0);

  const dd = String(fecha.getDate()).padStart(2, "0");
  const mm = String(fecha.getMonth() + 1).padStart(2, "0");
  const yyyy = fecha.getFullYear();
  const hh = String(fecha.getHours()).padStart(2, "0");
  const min = String(fecha.getMinutes()).padStart(2, "0");

  return `${dd}-${mm}-${yyyy} ${hh}:${min}:00`; // 🧠 Backend-friendly
};


  const onSubmit = async (data) => {
    const fechaAsignacion = formatearFechaYHora(dia, hora);
    const fechaSolicitud = formatearFechaYHora(new Date(), new Date().toTimeString().slice(0, 5));
    const nro_doc = sessionStorage.getItem("nro_doc");
    const medicoId = medicoSeleccionado ? medicoSeleccionado.id : parseInt(data.medico);

    const payload = {
      nro_doc,
      medico_id: medicoId,
      servicio_id: data.servicios,
      centro_medico_id: data.centro_medico,
      fecha_asignacion: fechaAsignacion,
      fecha_solicitud: fechaSolicitud,
      estado: "pendiente",
      especialidad: data.especialidad,
      tipo_atencion: data.tipo_atencion?.toLowerCase()
    };
    console.log(payload)
    try {
      const response = await fetch("http://127.0.0.1:8000/api/gestor-cita/cita/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log("✅ Cita creada:", result);
      isClose();
    } catch (error) {
      console.error("❌ Error al registrar cita:", error);
    }
  };

  if (!isOpen || !dia || !hora) return null;

  return (
    <div className="modal-fondo">
      <div className="modal-cita">
        <button className="cerrar-modal" onClick={isClose}>✖</button>
        <h2>Confirmar Cita</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <EtiquetaInput label="Especialidad" type="text" register={register("especialidad")} />

          <ComboBox
            label="Tipo de Atención"
            register={register("tipo_atencion")}
            options={[
              { value: "Presencial", label: "Presencial" },
              { value: "Virtual", label: "Virtual" }
            ]}
          />

          {!medicoSeleccionado && (
            <ComboBox
              label="Médico"
              register={register("medico")}
              options={listaMedicos.map((medico) => ({
                value: medico.id,
                label: `${medico.usuario.first_name} ${medico.usuario.last_name}`
              }))}
            />
          )}

          <ComboBox
            label="Centro médico"
            register={register("centro_medico")}
            options={centros.map((centro) => ({
              value: centro.nit,
              label: centro.nombre
            }))}
          />

          <ComboBox
            label="Servicios"
            register={register("servicios")}
            options={servicios.map((servicio) => ({
              value: servicio.capitulo,
              label: servicio.nombre
            }))}
          />

          <Botones texto="Reservar Cita" tipo="submit" />
        </form>
      </div>
    </div>
  );
};

export default ModalRegistrarCitaP;
