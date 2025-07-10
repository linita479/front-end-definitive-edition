import React, { useEffect, useState, useMemo } from "react";
import "./calendario_horas.css";
import Card_cita_horasP from "./Card_cita_horaP";

const Calendario_horasP = ({ isOpenCH, isCloseCH, dia, medicoSeleccionado }) => {
  const [citas, setCitas] = useState([]);
  const [bloquesAgenda, setBloquesAgenda] = useState([]);
  const nro_doc = medicoSeleccionado?.usuario?.nro_doc || null;

  // ✅ FUNCION LOCAL para evitar desfase UTC al guardar hora
  const formatearFechaYHora = (dia, horaTexto) => {
    const limpio = horaTexto.split(" ")[0]; // Elimina "a. m." o "p. m."
    const [hora, minuto] = limpio.split(":");
    const fecha = new Date(dia);
    fecha.setHours(parseInt(hora), parseInt(minuto), 0, 0);

    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const diaNum = String(fecha.getDate()).padStart(2, "0");
    const horaNum = String(fecha.getHours()).padStart(2, "0");
    const minutoNum = String(fecha.getMinutes()).padStart(2, "0");

    return `${año}-${mes}-${diaNum} ${horaNum}:${minutoNum}:00`;
  };

  const convertirADateISO = (fechaStr) => {
    try {
      const [dia, mes, anioHora] = fechaStr.split("-");
      const [anio, hora] = anioHora.split(" ");
      return new Date(`${anio}-${mes}-${dia}T${hora}`);
    } catch (e) {
      return new Date("invalid");
    }
  };

  const generarHoras = (inicio, fin, intervalo) => {
    const horas = [];
    const ahora = new Date();
    ahora.setHours(inicio, 0, 0, 0);
    const limite = new Date();
    limite.setHours(fin, 0, 0, 0);

    while (ahora < limite) {
      const horaLimpia = ahora.toTimeString().slice(0, 5); // formato "HH:MM"
      horas.push(horaLimpia);
      ahora.setMinutes(ahora.getMinutes() + intervalo);
    }

    return horas;
  };

  const arregloHoras = generarHoras(8, 17, 20);

  useEffect(() => {
    if (!isOpenCH || !dia) return;

    const fetchCitas = async () => {
      try {
        const resp = await fetch("http://127.0.0.1:8000/api/gestor-cita/cita", {
          headers: { Authorization: `Token ${sessionStorage.getItem("token")}` }
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

        const bloques = diaAgenda?.bloques?.length ? diaAgenda.bloques : [];
        setBloquesAgenda(bloques);
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
      .replace(/\s+/g, "")
      .replace(".", "")
      .replace("a.m", "am")
      .replace("p.m", "pm");
  };

  const horasMostrar = useMemo(() => {
    const usadas = new Set();

    citas.forEach((cita) => {
      const fechaObj = convertirADateISO(cita.fecha_asignacion);
      if (!isNaN(fechaObj)) {
        const hora = fechaObj.toTimeString().slice(0, 5); // formato "HH:MM"
        usadas.add(normalizarHora(hora));
      }
    });

    const horasBase = bloquesAgenda.length > 0 ? bloquesAgenda : arregloHoras;

    return horasBase.map((horaLimpia) => {
      const [h, m] = horaLimpia.split(":");
      const fecha = new Date();
      fecha.setHours(parseInt(h), parseInt(m), 0, 0);
      const horaVisual = fecha.toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit"
      });

      const clave = normalizarHora(horaLimpia);

      return {
        hora: horaVisual,
        horaLimpia,
        disponible: !usadas.has(clave)
      };
    });
  }, [bloquesAgenda, citas]);

  if (!isOpenCH || !dia) return null;

  return (
    <div className="calendario_horas">
      <h2 className="calendario_horas__titulo">🕑 Citas del {dia.toLocaleDateString("es-CO")}</h2>

      <button className="calendario__boton_atras" onClick={isCloseCH}>
        ← Volver
      </button>

      <div className="calendario_horas__contenedor">
        {horasMostrar.length === 0 ? (
          <p className="mensaje-vacio">No hay horas disponibles para este día.</p>
        ) : (
          horasMostrar.map(({ hora, horaLimpia, disponible }, idx) => (
            <Card_cita_horasP
              key={idx}
              hora={hora}
              horaLimpia={horaLimpia}
              dia={dia}
              estado={disponible ? "disponible" : "no_disponible"}
              deshabilitado={!disponible}
              medicoSeleccionado={medicoSeleccionado}
              formatearFechaYHora={formatearFechaYHora} // ✅ enviado como prop
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Calendario_horasP;
