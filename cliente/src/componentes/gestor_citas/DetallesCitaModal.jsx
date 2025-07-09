import React from "react";
import "./detalle_cita_modal.css";

const DetalleCitaModal = ({ isOpen, isClose, cita }) => {
  if (!isOpen || !cita) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-cita">
        <h2>🗂️ Detalle de la Cita</h2>

        <p><strong>Hora:</strong> {cita.fecha_asignacion}</p>
        <p><strong>Estado:</strong> {cita.estado}</p>
        <p><strong>Especialidad:</strong> {cita.especialidad}</p>
        <p><strong>Tipo de atención:</strong> {cita.tipo_atencion}</p>

        {cita.estado === "pendiente" && (
          <button className="btn-modificar" onClick={() => console.log("⚙️ Ir a editar cita")}>
            ✏️ Modificar
          </button>
        )}

        <button className="btn-cerrar" onClick={isClose}>❌ Cerrar</button>
      </div>
    </div>
  );
};

export default DetalleCitaModal;
