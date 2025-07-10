import React from "react";
import BusquedaDocumento from "../componentes/BusquedaDocumento"; // asegúrate que la ruta sea la correcta
import { useForm } from "react-hook-form";
import { useState ,useEffect} from "react";
import CalendarioSeleccion from "./CalendarioAgenda";
import EtiquetaInput from "../componentes/EtiquetaInput";
import ComboBox from "../componentes/ComboBox";
import Botones from "../componentes/Botones";
import './CrearAgenda.css'

const CrearAgenda = () => {
      const [mostrarFormulario, setMostrarFormulario] = useState(false);
      const [errorBusqueda, setErrorBusqueda] = useState("");
      const[listaMedicos, setListaMedicos] = useState([]);
      const [medico,setMedico] = useState("")
      const [mes,setMes] = useState("")
      const [dia,setDia] = useState([])
      const { register , handleSubmit, watch, formState: { errors } } = useForm();
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

      const onSubmit = async (data) => {
        try {
          // 1️⃣ Crear el mes
          const payloadMes = {
            mes: mes + "-01", // aseguramos formato YYYY-MM-DD
            nro_doc: medico.nro_doc, // viene del usuario encontrado
          };

          const resMes = await fetch("http://127.0.0.1:8000/api/gestor_th/agenda-mes/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${sessionStorage.getItem("token")}`,
            },
            body: JSON.stringify(payloadMes),
          });

          if (!resMes.ok) {
            const err = await resMes.json();
            console.error("⛔ Error al crear AgendaMes:", err);
            return;
          }

          const agendaMesCreada = await resMes.json();
          const agendamesId = agendaMesCreada.id;
          console.log("✅ AgendaMes creada:", agendamesId);

          // 2️⃣ Crear AgendaDia por cada día seleccionado
          const payloadBase = {
            horainico: data.agenda_dia.horainico,
            horafin: data.agenda_dia.horafin,
            horaalmuerzo: data.agenda_dia.horaalmuerzo,
            agendames: agendamesId,
          };

          for (const diaNum of dia) {
            const payloadDia = {
              ...payloadBase,
              dia: String(diaNum).padStart(2, "0"), // convierte 5 → "05"
            };

            const resDia = await fetch("http://127.0.0.1:8000/api/gestor_th/agenda-dia/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${sessionStorage.getItem("token")}`,
              },
              body: JSON.stringify(payloadDia),
            });

            if (!resDia.ok) {
              const errDia = await resDia.json();
              console.warn(`⚠️ Error al crear día ${payloadDia.dia}:`, errDia);
            } else {
              console.log(`✅ Día ${payloadDia.dia} creado exitosamente.`);
            }
          }

          // ✅ Todo OK
          alert("Agenda creada correctamente 🧩");
        } catch (error) {
          console.error("❌ Error general en la creación:", error);
          alert("Error al crear agenda. Verifica la red o los datos.");
        }
      };

      const buscarUsuario = async (nrodoc)=>{
          try{
              const response = await fetch(`http://127.0.0.1:8000/buscar_usuario/?nro_doc=${nrodoc}`,{
                  method: "GET",
                  headers:{
                      "Authorization": `Token ${sessionStorage.getItem("token")}`,
                  },
              });
              if (response.ok){
                  const data = await response.json();
                  setMostrarFormulario(true); 
                  setErrorBusqueda("");
                  setMedico(data.usuario)
                  console.log("Usuario encontrado:", data.usuario);
              }else{
                  setMostrarFormulario(false);
                  setErrorBusqueda("Usuario no encontrado.");
              }
  
          }catch (error) {
              console.error("Error:", error);
              setErrorBusqueda("Error de red.");
          }
      }
      useEffect(() => {
          cargarMedicos();
        }, []);
  return (
    <div className="crear-agenda">
      <BusquedaDocumento
        register={register("nro_doc")}
        onClick={() => buscarUsuario(watch("nro_doc"))}
      />

      {mostrarFormulario && <>
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

        <p className="titulo-profesional-notif">Información del profesional</p>
        <p className="dato-profesional"><strong>Nombre:</strong> {`${medico.first_name} ${medico.last_name}`}</p>
        <p className="dato-profesional"><strong>Tipo de documento:</strong> {medico.tipo_doc}</p>
        <p className="dato-profesional"><strong>N° Documento:</strong> {medico.nro_doc}</p>
        <p className="dato-profesional"><strong>Email:</strong> {medico.email || "No disponible"}</p>
      </div>

          <div className="cont-calendar">
              <CalendarioSeleccion onChangeDias={(dias) => {setMes(dias.mes);setDia(dias.dias)}}/>
          </div>
      </div>

          <form onSubmit={handleSubmit(onSubmit)} className="form-crear-agenda">
            <header className="header-crear-agenda">
              <h1 className="header-crear-agenda-titulo">Crear agenda</h1>
            </header>
            <EtiquetaInput
            label="Hora inicio"
            type="time"
            register={register("agenda_dia.horainico", {
              required: "La hora de inicio es obligatoria",
            })}
          />
          <EtiquetaInput
          label="Hora fin"
          type="time"
          register={register("agenda_dia.horafin", {
            required: "La hora de fin es obligatoria",
          })}
        />
        <EtiquetaInput
          label="Hora de almuerzo"
          type="time"
          register={register("agenda_dia.horaalmuerzo")}
        />
      <button type="submit" className="btn-crear-agenda-medico">
        <span className="fold"></span>

        <div className="points_wrapper">
          {Array.from({ length: 10 }).map((_, i) => (
            <i key={i} className="point"></i>
          ))}
        </div>

        <span className="inner">
          <svg
            className="icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          >
            <polyline points="13.18 1.37 13.18 9.64 21.45 9.64 10.82 22.63 10.82 14.36 2.55 14.36 13.18 1.37" />
          </svg>
          Crear agenda
        </span>
      </button>
    </form>
      </>}
      
    </div>
  );
};

export default CrearAgenda;
