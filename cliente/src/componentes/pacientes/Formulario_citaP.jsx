import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EtiquetaInput from "../objetos/EtiquetaInput";
import ComboBox from "../objetos/ComboBox";
import Botones from "../objetos/Botones";
import BusquedaDocumento from "../Gestorth/componentes/BusquedaDocumento";
// import "./modal_registrar_cita.css";

const ModalRegistrarCitaP = ({ isOpen, isClose, dia, hora, medicoSeleccionado }) => {
  const { register, handleSubmit, watch, setValue } = useForm();

  const [listaMedicos, setListaMedicos] = useState([]);
  const [centros, setCentros] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [listaPacientes, setListaPacientes] = useState([]);
const [busquedaPaciente, setBusquedaPaciente] = useState("");
const [pacientesFiltrados, setPacientesFiltrados] = useState([]);


  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resMedicos, resCentros, resServicios] = await Promise.all([
          fetch("http://127.0.0.1:8000/lista/medicos/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${sessionStorage.getItem("token")}`
            }
          }),
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
          }),
        ]);
        const resPacientes = await fetch("http://127.0.0.1:8000/lista/pacientes/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${sessionStorage.getItem("token")}`
        }
      });

      setListaPacientes(await resPacientes.json());
        setListaMedicos(await resMedicos.json());
        setCentros(await resCentros.json());
        setServicios(await resServicios.json());
        
      } catch (error) {
        console.error("❌ Error cargando datos:", error);
      }
    };

    cargarDatos();
  }, []);

  const convertirHora = (horaTexto) => {
    const [hora, minutos] = horaTexto.match(/\d+/g);
    const esPM = horaTexto.toLowerCase().includes("p. m.");
    let horas24 = parseInt(hora);
    if (esPM && horas24 !== 12) horas24 += 12;
    else if (!esPM && horas24 === 12) horas24 = 0;
    return { horas: horas24, minutos: parseInt(minutos) };
  };

  const formatearFechaYHora = (dia, horaTexto) => {
    const { horas, minutos } = convertirHora(horaTexto);
    const fecha = new Date(dia);
    fecha.setHours(horas, minutos, 0, 0);
    return fecha.toISOString();
  };

  const buscarUsuario = async (doc) => {
    console.log("📎 Buscando usuario con documento:", doc);
  };

  const onSubmit = async (data) => {
    const fechaAsignacion = formatearFechaYHora(dia, hora);
    const fechaSolicitud = new Date().toISOString();
    const medicoId = medicoSeleccionado ? medicoSeleccionado.id : parseInt(data.medico);

    const payload = {
      nro_doc: data.nro_doc,
      medico_id: medicoId,
      servicio_id: data.servicios,
      centro_medico_id: data.centro_medico,
      fecha_asignacion: fechaAsignacion,
      fecha_solicitud: fechaSolicitud,
      estado: "pendiente",
      especialidad: data.especialidad,
      tipo_atencion: data.tipo_atencion?.toLowerCase()
    };

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
        <h2>Registrar Cita Médica</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="busqueda-medico">
        <input
          type="text"
          className="busqueda-medico__input"
          placeholder="🔍 Buscar paciente por nombre..."
          value={busquedaPaciente}
          onChange={(e) => {
            const valor = e.target.value;
            setBusquedaPaciente(valor);
            const filtro = listaPacientes.filter(p =>
              `${p.usuario.first_name} ${p.usuario.last_name}`
                .toLowerCase()
                .includes(valor.toLowerCase())
            );
            setPacientesFiltrados(filtro);
          }}
          onBlur={() => setTimeout(() => setBusquedaPaciente(""), 200)}
        />

        {busquedaPaciente.trim() && pacientesFiltrados.length > 0 && (
          <ul className="busqueda-medico__lista">
            {pacientesFiltrados.map((paciente) => (
              <li
                key={paciente.id}
                onClick={() => {
                  setBusquedaPaciente(""); // Ocultar lista
                  setValue("nro_doc", paciente.usuario.nro_doc); // Guardar en hook form
                }}
              >
                {paciente.usuario.first_name} {paciente.usuario.last_name}
              </li>
            ))}
          </ul>
        )}
        {watch("nro_doc") && (
          <div className="paciente-seleccionado-banner">
            <span>
              👤 <strong>{pacientesFiltrados.find(p => p.usuario.nro_doc === watch("nro_doc"))?.usuario.first_name} {pacientesFiltrados.find(p => p.usuario.nro_doc === watch("nro_doc"))?.usuario.last_name}</strong> – 
              <em> Documento: {watch("nro_doc")} </em>
            </span>
            <button className="btn-limpiar-medico" onClick={() => setValue("nro_doc", "")}>
              ❌ Quitar paciente
            </button>
          </div>
        )}

      </div>

          <EtiquetaInput label="Especialidad" type="text" register={register("especialidad")} /> 
          <ComboBox label="Tipo de Atención" register={register("tipo_atencion")} options={[ { value: "Presencial", label: "Presencial" }, { value: "Virtual", label: "Virtual" } ]} />

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

          <Botones texto="Guardar Cita" tipo="submit" />
        </form>
      </div>
    </div>
  );
};

export default ModalRegistrarCitaP;
