import React, { useState ,useEffect } from "react";
import Card_citaP from "./Card_citaP";
import Calendario_horasP from "./Calendario_horasP";
import "./calendario_citas.css";

const CalendarioCitasP = () => {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [dia, setDia] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [citasPorDia, setCitasPorDia] = useState({});
  const [medicoSeleccionado, setMedicoSeleccionado] = useState(null);
  const [agendaMedico, setAgendaMedico] = useState([]);
  if (!isOpen) return null;
  
  const [listaMedicos, setListaMedicos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [medicosFiltrados, setMedicosFiltrados] = useState([]);
  const cargarAgenda = async () => {
    if (!medicoSeleccionado) {
      setAgendaMedico([]);
      return;
    }

    try {
      console.log(
        medicoSeleccionado.usuario.nro_doc
      )
      const res = await fetch(
        `http://127.0.0.1:8000/api/gestor_th/agenda-mes/?nro_doc=${medicoSeleccionado.usuario.nro_doc}`,
        {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("token")}`,
          },
        }
      );
      const data = await res.json();
      console.log(data)
      setAgendaMedico(data);
    } catch (error) {
      console.error("❌ Error cargando agenda del médico:", error);
    }
  };
  const cargarMedicos = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/lista/medicos/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      });
      const result = await response.json();
      setListaMedicos(result);
      setMedicosFiltrados(result); // inicializamos
    } catch (error) {
      console.error("❌ Error al cargar médicos:", error);
    }
  };

  const convertirADateISO = (fechaStr) => {
  // Espera: "10-07-2025 07:00:00"
    const [dia, mes, anioHora] = fechaStr.split("-");
    const [anio, hora] = anioHora.split(" ");
    return new Date(`${anio}-${mes}-${dia}T${hora}Z`);
  };


  const fetchCitas = async () => {
    try {
      const resp = await fetch("http://127.0.0.1:8000/api/gestor-cita/cita/", {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      });
      const data = await resp.json();
      console.log("▶️ Resultado del endpoint de citas:", data);

      const agrupadas = {};

      data.forEach(cita => {
        const fechaObj = convertirADateISO(cita.fecha_asignacion);

        if (!isNaN(fechaObj)) {
          const fecha = fechaObj.toISOString().split("T")[0];
          agrupadas[fecha] = (agrupadas[fecha] || 0) + 1;
        } else {
          console.warn("⚠️ Fecha inválida:", cita.fecha_asignacion);
        }
      });

      setCitasPorDia(agrupadas);
    } catch (err) {
      console.error("Error al traer citas:", err);
    }
  };

    useEffect(() => {
      fetchCitas();
      cargarMedicos();
      cargarAgenda();
    }, [medicoSeleccionado]);

    const handleOpen = (dia) => {
      setOpen(true);
      setDia(dia);
      console.log(dia);
    };

  const handleClose = () => setOpen(false);

  const handleSumaMes = () => setIndex((prev) => Math.min(prev + 1, 11));
  const handleRestaMes = () => setIndex((prev) => Math.max(prev - 1, 0));

  const generarDiasDelAño = (anio) => {
    const diasDelAño = Array.from({ length: 12 }, () => []);
    const fechaInicio = new Date(anio, 0, 1);
    const fechaFin = new Date(anio + 1, 0, 1);

    for (let fecha = fechaInicio; fecha < fechaFin; fecha.setDate(fecha.getDate() + 1)) {
      const mesActual = fecha.getMonth();
      if (fecha.getDate() === 1) {
        const primerDiaSemana = fecha.getDay();
        for (let i = 0; i < primerDiaSemana; i++) {
          diasDelAño[mesActual].push(null);
        }
      }
      diasDelAño[mesActual].push(new Date(fecha));
    }

    return diasDelAño;
  };

  const dias = generarDiasDelAño(2025);
  const texto_meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  const anioActual = 2025; // o lo que estés usando con `generarDiasDelAño(anio)`
  const mesActualNumero = (index + 1).toString().padStart(2, "0");

  // Buscar el mes dentro de la agenda del médico
  const mesAgenda = agendaMedico.find(m =>
    m.mes.startsWith(`${anioActual}-${mesActualNumero}`)
  );

  // Extraer días habilitados
  const diasHabilitados = mesAgenda
    ? mesAgenda.agendadia.map(d => parseInt(d.dia))
    : [];
  return (
    <>
      <h1 className="calendario__titulo">📅 Crear cita</h1>

      <div className="calendario">
        <div className="busqueda-medico">
          <input
          onBlur={() => setTimeout(() => setBusqueda(""), 200)} 
            type="text"
            className="busqueda-medico__input"
            placeholder="🔍 Buscar médico por nombre..."
            value={busqueda}
            onChange={(e) => {
              const valor = e.target.value;
              setBusqueda(valor);
              const filtro = listaMedicos.filter(m =>
                `${m.usuario.first_name} ${m.usuario.last_name}`
                  .toLowerCase()
                  .includes(valor.toLowerCase())
              );
              setMedicosFiltrados(filtro);
            }}
          />
          {busqueda.trim() && medicosFiltrados.length > 0 && (
            <ul className="busqueda-medico__lista">
              {medicosFiltrados.map((medico) => (
                <li
                  key={medico.id}
                  onClick={() => {
                    setMedicoSeleccionado(medico);
                    setBusqueda(""); // oculta la lista
                  }}
                >
                  {medico.usuario.first_name} {medico.usuario.last_name}
                </li>
              ))}
            </ul>
          )}
          {medicoSeleccionado && (
            <div className="medico-seleccionado-banner">
              <span>
                👨‍⚕️ <strong>{medicoSeleccionado.usuario.first_name} {medicoSeleccionado.usuario.last_name}</strong> – 
                <em> {medicoSeleccionado.especialidad || "Sin especialidad"} </em>
              </span>
              <button className="btn-limpiar-medico" onClick={() => setMedicoSeleccionado(null)}>
                ❌ Quitar filtro
              </button>
            </div>
          )}

        </div>
            

        <div className="calendario__mes-navegacion">
          <button
            className="calendario__btn-mes"
            onClick={handleRestaMes}
            disabled={index === 0}
          >
            ← {texto_meses[index - 1] || ""}
          </button>

          <h2 className="calendario__mes-actual">{texto_meses[index]}</h2>

          <button
            className="calendario__btn-mes"
            onClick={handleSumaMes}
            disabled={index === 11}
          >
            {texto_meses[index + 1] || ""} →
          </button>
        </div>

        <div className="calendario__cabecera-semana">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((dia, i) => (
            <div key={i} className="calendario__dia-nombre">{dia}</div>
          ))}
        </div>

        <div className="calendario__grid">
          {dias[index].map((diaCard, idx) => {
            const key = `dia-${index}-${idx}`;

            if (!diaCard) {
              return <div key={key} className="calendario__dia calendario__dia--relleno" />;
            }

            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            const esPasado = diaCard < hoy;
            const diaNumerico = diaCard.getDate();
            const estaEnAgenda = !medicoSeleccionado || diasHabilitados.includes(diaNumerico);

            const clase = `calendario__dia ${
              esPasado
                ? "calendario__dia--pasado"
                : estaEnAgenda
                ? "calendario__dia--activo"
                : "calendario__dia--bloqueado"
            }`;

            return (
              <Card_citaP
                key={key}
                dia={diaNumerico}
                citasCount={citasPorDia[diaCard.toISOString().split("T")[0]] || 0}
                maxCitas={24}
                open={!esPasado && estaEnAgenda ? () => handleOpen(diaCard) : null}
                className={clase}
              />
            );
          })}
        </div>
      </div>

      <Calendario_horasP isOpenCH={open} isCloseCH={handleClose} dia={dia} />
    </>
  );
};

export default CalendarioCitasP;
