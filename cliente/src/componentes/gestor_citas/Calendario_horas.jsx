import React, { useEffect, useState, useMemo } from "react";
import "./calendario_horas.css";
import Card_cita_horas from "./Card_cita_hora";

const Calendario_horas = ({ isOpenCH, isCloseCH, token, dia, nro_doc }) => {
  const [citas, setCitas] = useState([]);
  const [bloquesAgenda, setBloquesAgenda] = useState([]);

  const fechaStr = dia ? dia.toISOString().split("T")[0] : null;

  const generarHoras = (inicio, fin, intervalo) => {
    const horas = [];
    const ahora = new Date();
    ahora.setHours(inicio, 0, 0, 0);

    const limite = new Date();
    limite.setHours(fin, 0, 0, 0);

    while (ahora < limite) {
      horas.push(
        ahora.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })
      );
      ahora.setMinutes(ahora.getMinutes() + intervalo);
    }

    return horas;
  };

  const arregloHoras = generarHoras(8, 17, 20);

  const convertirADateISO = (fechaStr) => {
    const [dia, mes, anioHora] = fechaStr.split("-");
    const [anio, hora] = anioHora.split(" ");
    return new Date(`${anio}-${mes}-${dia}T${hora}Z`);
  };

  useEffect(() => {
    if (!isOpenCH) return;

    const fetchCitas = async () => {
      try {
        const resp = await fetch("http://127.0.0.1:8000/api/gestor-cita/cita", {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("token")}`,
          },
        });
        const data = await resp.json();

        const fechaStr = dia.toISOString().split("T")[0];

        const filtradas = data.filter((cita) => {
          const fechaObj = convertirADateISO(cita.fecha_asignacion);
          if (!isNaN(fechaObj)) {
            const fechaISO = fechaObj.toISOString().split("T")[0];
            return fechaISO === fechaStr;
          }
          return false;
        });

        setCitas(filtradas);
      } catch (err) {
        console.error("❌ Error cargando citas:", err);
      }
    };

    const fetchAgenda = async () => {
      if (!nro_doc) return;

      try {
        const resp = await fetch(
          `http://127.0.0.1:8000/api/gestor_th/agenda-mes/?nro_doc=${nro_doc}`,
          {
            headers: {
              Authorization: `Token ${sessionStorage.getItem("token")}`,
            },
          }
        );
        const data = await resp.json();
        const diaAgenda = data.agendadia?.find(
          (d) => parseInt(d.dia) === dia.getDate()
        );
        setBloquesAgenda(diaAgenda?.bloques || []);
      } catch (err) {
        console.error("❌ Error cargando bloques de agenda:", err);
      }
    };

    fetchCitas();
    fetchAgenda();
  }, [isOpenCH, dia, nro_doc]);

  const normalizarHora = (horaStr) => {
    return horaStr
      .toLowerCase()
      .replace(/\s+/g, "")        // quita espacios
      .replace(".", "")           // quita puntos si hay
      .replace("a.m", "am")       // unifica
      .replace("p.m", "pm");      // unifica
  };


  const citasPorHora = useMemo(() => {
  const mapa = {};
  citas.forEach(cita => {
    const fechaObj = convertirADateISO(cita.fecha_asignacion);
    if (!isNaN(fechaObj)) {
      const hora = fechaObj.toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit"
      });
      const clave = normalizarHora(hora);
      mapa[clave] = cita.estado;
    }
  });
  return mapa;
}, [citas]);

console.log("⏰ citasPorHora:", citasPorHora);

  if (!isOpenCH) return null;

  const horasMostrar = (nro_doc ? bloquesAgenda : arregloHoras).map(horaRaw => {
      if (!horaRaw.includes(":")) return horaRaw;

      const fechaDummy = new Date();
      const [hora, minuto] = horaRaw.split(":");
      fechaDummy.setHours(parseInt(hora), parseInt(minuto), 0, 0);
      return fechaDummy.toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit"
      });
    });


  return (
    <>
    <div className="super-cont-horas-calendario">
      <h1 className="calendario_horas__titulo">
        <i className="fas fa-clock reloj-icono"></i> Citas – {dia.toLocaleDateString("es-CO")}
      </h1>

      <div className="calendario_horas">
        <button className="btn-mes-anterior" onClick={isCloseCH}>
          <span>Volver</span>
              <div className="icono-btn-mes">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M7.828 11l5.364-5.364-1.414-1.414L4 12l7.778 7.778 1.414-1.414L7.828 13H20v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
        </button>

        <div className="calendario_horas__contenedor">
          {horasMostrar.map((horaStr, idx) => {
          const clave = normalizarHora(horaStr);

          // Filtra las citas que coinciden con esta hora exacta
          const citaFiltrada = citas.find(cita => {
            const fechaObj = convertirADateISO(cita.fecha_asignacion);
            if (!isNaN(fechaObj)) {
              const horaCita = fechaObj.toLocaleTimeString("es-CO", {
                hour: "2-digit",
                minute: "2-digit"
              });
              return normalizarHora(horaCita) === clave;
            }
            return false;
          });

          const estado = citaFiltrada?.estado || "disponible";

          return (
            <Card_cita_horas
              key={idx}
              hora={horaStr}
              dia={dia}
              estado={estado}
              cita={citaFiltrada}
            />
          );
        })}


        </div>
      </div>
    </div>
    </>
  );
};

export default Calendario_horas;
