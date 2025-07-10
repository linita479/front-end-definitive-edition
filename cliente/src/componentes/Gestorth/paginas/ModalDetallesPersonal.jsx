import React, { useEffect, useState } from "react";
import "./ModalDetallesPersonal.css";

const ModalDetallesPersonal = ({ visible, personal, onClose }) => {
  console.log(personal)
  
  const [mostrarAcademicos, setMostrarAcademicos] = useState(false);
  const [mostrarExperiencia, setMostrarExperiencia] = useState(false);
  const [listaAcademicos, setListaAcademicos] = useState([]);
  const [listaExperiencia, setListaExperiencia] = useState([]);
  const cargarAcademicos = async () => {
    try {
      const resp = await fetch(`http://127.0.0.1:8000/api/gestor_th/academicos/?nro_doc=${personal.nro_doc}`, {
        headers: { Authorization: `Token ${sessionStorage.getItem("token")}` }
      });
      const data = await resp.json();
      setListaAcademicos(data);
      setMostrarAcademicos(true);
    setMostrarExperiencia(false);
    } catch (err) {
      console.error("Error cargando académicos:", err);
    }
  };

  const cargarExperiencia = async () => {
    try {
      const resp = await fetch(`http://127.0.0.1:8000/api/gestor_th/experiencia/laboral/?nro_doc=${personal.nro_doc}`, {
        headers: { Authorization: `Token ${sessionStorage.getItem("token")}` }
      });
      const data = await resp.json();
      setListaExperiencia(data);
      setMostrarExperiencia(true);
    setMostrarAcademicos(false);
    } catch (err) {
      console.error("Error cargando experiencia laboral:", err);
    }
  };
  if (!visible || !personal) return null;

  return (
    <div className="detallesPersonal__overlay">
      <div className="detallesPersonal__card">
        <div className="detallesPersonal__burbuja">
          <p className="detallesPersonal__numero">02</p>
        </div>

        <div className="detallesPersonal__icono">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="#023535"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5Zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5Z"/>
          </svg>
        </div>

        <p className="detallesPersonal__titulo">Detalles del Personal</p>

        <div className="detallesPersonal__contenido">
          <p><strong className="strong-detalles-personla">Nombre:</strong> {`${personal.first_name} ${personal.last_name}`}</p>
          <p><strong className="strong-detalles-personla">Email:</strong> {personal.email}</p>
          <p><strong className="strong-detalles-personla">N° Documento:</strong> {personal.nro_doc}</p>
          <p><strong className="strong-detalles-personla">Tipo de Documento:</strong> {personal.tipo_doc}</p>
          <p><strong className="strong-detalles-personla">Tipo de Usuario:</strong> {personal.tipo_uduario}</p>
          <p><strong className="strong-detalles-personla">Estado Civil:</strong> {personal.estado_civil}</p>
          <p><strong className="strong-detalles-personla">Sexo:</strong> {personal.sexo}</p>
          <p><strong className="strong-detalles-personla">Nacionalidad:</strong> {personal.nacionalidad}</p>
          <p><strong className="strong-detalles-personla">Municipio:</strong> {personal.municipio}</p>
          <p><strong className="strong-detalles-personla">Lugar de Expedición:</strong> {personal.lugar_exp_doc}</p>
          <p><strong className="strong-detalles-personla">Fecha de Expedición:</strong> {personal.fecha_exp_doc}</p>
          <p><strong className="strong-detalles-personla">Fecha de Nacimiento:</strong> {personal.fecha_nacimiento}</p>
          <p><strong className="strong-detalles-personla">Teléfono:</strong> {personal.telefono}</p>
          <p><strong className="strong-detalles-personla">Activo:</strong> {personal.is_active ? "Sí" : "No"}</p>
          <div className="detallesPersonal__accionesBotones">
            <button onClick={cargarAcademicos}>🧠 Ver Académicos</button>
            <button onClick={cargarExperiencia}>🧰 Ver Experiencia Laboral</button>
          </div>

        </div>

        <button className="detallesPersonal__botonCerrar" onClick={onClose}>
          <span>Cerrar</span>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path fillRule="nonzero" d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 7.425 2.717-2.718c.146-.146.339-.219.531-.219.404 0 .75.325.75.75 0 .193-.073.384-.219.531l-2.717 2.717 2.727 2.728c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.384-.073-.53-.219l-2.729-2.728-2.728 2.728c-.146.146-.338.219-.53.219-.401 0-.751-.323-.751-.75 0-.192.073-.384.22-.531l2.728-2.728-2.722-2.722c-.146-.147-.219-.338-.219-.531 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/>
            </svg>
          </span>
        </button>
        {mostrarAcademicos && (
          <div className="seccion__tarjetas">
            {listaAcademicos.map((item, idx) => (
              <div key={idx} className="tarjeta__item">
                <h4>{item.titulo}</h4>
                <p><strong>Institución:</strong> {item.institucion_educativa}</p>
                <p><strong>Titulo:</strong> {item.titulo_obtenido}</p>
                <p><strong>Finalización:</strong> {item.fecha_culminado}</p>
              </div>
            ))}
          </div>
        )}

        {mostrarExperiencia && (
          <div className="seccion__tarjetas">
            {listaExperiencia.map((item, idx) => (
              <div key={idx} className="tarjeta__item">
                <h4>{item.cargo}</h4>
                <p><strong>Empresa:</strong> {item.nombre_empresa}</p>
                <p><strong>Inicio:</strong> {item.fecha_inicio}</p>
                <p><strong>Finalización:</strong> {item.fecha_finalizacion}</p>
                <p><strong>Tipo de contrato:</strong> {item.tipo_contrato}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ModalDetallesPersonal;
