import React from "react";
import "./ModalDetallesPersonal.css";

const ModalDetallesPersonal = ({ visible, personal, onClose }) => {
  if (!visible || !personal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenido">
        <h3>🧾 Detalles del Personal</h3>
        <p><strong>Nombre:</strong> {`${personal.first_name} ${personal.last_name}`}</p>
        <p><strong>Email:</strong> {personal.email}</p>
        <p><strong>N° Documento:</strong> {personal.nro_doc}</p>
        <p><strong>Tipo de Documento:</strong> {personal.tipo_doc}</p>
        <p><strong>Tipo de Usuario:</strong> {personal.tipo_uduario}</p>
        <p><strong>Estado Civil:</strong> {personal.estado_civil}</p>
        <p><strong>Sexo:</strong> {personal.sexo}</p>
        <p><strong>Nacionalidad:</strong> {personal.nacionalidad}</p>
        <p><strong>Municipio:</strong> {personal.municipio}</p>
        <p><strong>Lugar de Expedición:</strong> {personal.lugar_exp_doc}</p>
        <p><strong>Fecha de Expedición:</strong> {personal.fecha_exp_doc}</p>
        <p><strong>Fecha de Nacimiento:</strong> {personal.fecha_nacimiento}</p>
        <p><strong>Teléfono:</strong> {personal.telefono}</p>
        <p><strong>Activo:</strong> {personal.is_active ? "Sí" : "No"}</p>

        <button className="modal-cerrar-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ModalDetallesPersonal;
