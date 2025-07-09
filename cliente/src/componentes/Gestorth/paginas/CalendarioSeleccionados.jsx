import { useState, useEffect, useRef } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./CalendarioAgenda.css";

const CalendarioSelecciondos =  ({ onChangeDias, diasMarcados = [], onMesCambiado }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const yaInicializado = useRef(false);

  useEffect(() => {
    if (!yaInicializado.current && diasMarcados.length > 0) {
      const hoy = new Date();
      const fechaRef = new Date(hoy.getFullYear(), hoy.getMonth());

      const diasASeleccionar = diasMarcados.map((d) =>
        new Date(fechaRef.getFullYear(), fechaRef.getMonth(), Number(d))
      );

      setSelectedDays(diasASeleccionar);
      yaInicializado.current = true;

      // 🔐 Ejecutamos después del render para evitar el error
      setTimeout(() => {
        onChangeDias({
          dias: diasASeleccionar.map((f) => f.getDate()),
          mes: diasASeleccionar[0]?.toISOString().slice(0, 7) || null,
        });
      }, 0);
    }
  }, [diasMarcados]);

  const handleSelect = (days) => {
  if (!days) return;

  const fechas = Array.isArray(days) ? days : [days];
  const ultimoDia = fechas[fechas.length - 1];
  const diaNum = ultimoDia.getDate();

  if (!diasMarcados.includes(diaNum)) return; // ❌ Ignorar días no agendados

  setSelectedDays(fechas);

  const mesTexto = ultimoDia.toISOString().slice(0, 7);
  onChangeDias({ dias: [diaNum], mes: mesTexto });
};


  return (
    <div className="calendario-wrapper">
       <DayPicker
        mode="multiple"
        selected={selectedDays}
        onSelect={handleSelect}
        onMonthChange={onMesCambiado} // 🆕 notifica el mes
        modifiersClassNames={{ selected: "dia-seleccionado" }}
      />
    </div>
  );
};

export default CalendarioSelecciondos;
