import { use, useState } from "react";
import { useForm } from "react-hook-form";
import BusquedaDocumento from "../componentes/BusquedaDocumento";
import CalendarioSeleccion from "./CalendarioAgenda";
import CalendarioSelecciondos from "./CalendarioSeleccionados";
import ListaBloques from "./ListaBloques";

const ConsultarAgenda = () => {
  const { register, watch } = useForm();

  const [medico, setMedico] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [errorBusqueda, setErrorBusqueda] = useState("");
  const [agendaDias, setAgendaDias] = useState([]);
  const [bloquesDiaSeleccionado, setBloquesDiaSeleccionado] = useState([]);
  const [agendaMeses,setAgendaMeses] = useState()

  const buscarUsuario = async (nrodoc) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/buscar_usuario/?nro_doc=${nrodoc}`, {
        method: "GET",
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMostrarFormulario(true);
        setMedico(data.usuario);
        setErrorBusqueda("");
        obtenerAgendaMes(data.usuario.nro_doc);
      } else {
        setMostrarFormulario(false);
        setErrorBusqueda("Usuario no encontrado.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorBusqueda("Error de red.");
    }
  };

  const obtenerAgendaMes = async (nrodoc) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/gestor_th/agenda-mes/?nro_doc=${nrodoc}`);
      const data = await res.json();
      console.log(data)
      setAgendaDias(data[0]?.agendadia || []);
      setAgendaMeses(data);
    } catch (error) {
      console.error("Error cargando agenda:", error);
    }
  };
  const handleMesCambio = (fechaMes) => {
  const nuevoMes = fechaMes.toISOString().slice(0, 7); // e.g., "2025-08"
  console.log("📅 Cambiando a mes:", nuevoMes);

  // Buscar el agendames correcto
  const mesEncontrado = agendaMeses.find((mes) => mes.mes.startsWith(nuevoMes));
  setAgendaDias(mesEncontrado?.agendadia || []);
};

  const seleccionarDia = (diaSeleccionado) => {
  if (!diaSeleccionado) {
    setBloquesDiaSeleccionado([]);
    return;
  }

  const diaString = String(diaSeleccionado).padStart(2, "0");
  const diaAgenda = agendaDias.find((d) => d.dia === diaString);

  console.log("Día seleccionado:", diaString);
  console.log("Agenda disponible:", agendaDias);
  console.log("Bloques encontrados:", diaAgenda?.bloques);

  setBloquesDiaSeleccionado(diaAgenda ? diaAgenda.bloques : []);
};


  return (
    <div className="consultar-agenda">
      <BusquedaDocumento
        register={register("nro_doc")}
        onClick={() => buscarUsuario(watch("nro_doc"))}
      />

      {errorBusqueda && <p className="error">{errorBusqueda}</p>}

      {mostrarFormulario && medico && (
        <>
        <div className="contenedor-tarjetprofecional-calendario">
          <div className="card-profesional-notificacion">
          <svg
          className="icono-doctor-profesional"
          width="80"
          height="80"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="32" cy="20" r="12" stroke="#00b4d8" strokeWidth="3" />
          <path
            d="M12 54V46C12 38.82 22 34 32 34C42 34 52 38.82 52 46V54"
            stroke="#90e0ef"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24 50L28 42"
            stroke="#00b4d8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M40 50L36 42"
            stroke="#00b4d8"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
              <h3>👤 Información del profesional</h3>
              <p><strong>Nombre:</strong> {`${medico.first_name} ${medico.last_name}`}</p>
              <p><strong>Tipo de documento:</strong> {medico.tipo_doc}</p>
              <p><strong>N° Documento:</strong> {medico.nro_doc}</p>
              <p><strong>Email:</strong> {medico.email || "No disponible"}</p>
            </div>
            <div className="cont-calendar">
              <CalendarioSelecciondos
              diasMarcados={agendaDias.map((d) => Number(d.dia))}
              onChangeDias={({ dias }) => seleccionarDia(dias[0])}
              onMesCambiado={handleMesCambio}
              />
            </div>
          </div>
            <ListaBloques bloques={bloquesDiaSeleccionado} />
        </>
      )}
    </div>
  );
};

export default ConsultarAgenda;
