import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./CalendarioAgenda.css";

const CalendarioSeleccion = ({ onChangeDias }) => {
  const [selectedDays, setSelectedDays] = useState([]);

  const handleSelect = (days) => {
  if (!days) {
    setSelectedDays([]);
    onChangeDias({ dias: [], mes: null });
    return;
  }

  const fechas = Array.isArray(days) ? days : [days];
  setSelectedDays(fechas);

  const diasNumericos = fechas
    .map((fecha) => new Date(fecha).getDate())
    .filter((dia) => !isNaN(dia));

  const primerFecha = new Date(fechas[0]);
  const mesTexto = primerFecha.toISOString().slice(0, 7); // Ej: "2025-05"

  onChangeDias({
    dias: diasNumericos,
    mes: mesTexto, // formato "YYYY-MM"
  });
};


  return (
    <div className="calendario-wrapper">
      <DayPicker
        mode="multiple"
        selected={selectedDays}
        onSelect={handleSelect}
        modifiersClassNames={{ selected: 'dia-seleccionado' }}
        disabled={{ before: new Date() }}
      />
    </div>
  );
};

export default CalendarioSeleccion;
