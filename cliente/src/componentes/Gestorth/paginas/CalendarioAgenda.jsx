import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./CalendarioAgenda.css"

const CalendarioSeleccion = ({ onChangeDias }) => {
  const [selectedDays, setSelectedDays] = useState([]);

  const handleSelect = (days) => {
    console.log(days)
  if (!days) {
    setSelectedDays([]);
    return;
  }

  const diasNumericos = Array.isArray(days)
    ? days.map(fecha => {
        const dateObj = new Date(fecha);
        return !isNaN(dateObj) ? dateObj.getDate() : null;
      }).filter(dia => dia !== null)
    : [new Date(days).getDate()];

  setSelectedDays(diasNumericos);
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

export default CalendarioSeleccion