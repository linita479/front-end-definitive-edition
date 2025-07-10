// VerCentrosMedicos.jsx
import React, { useState, useEffect } from 'react';
import EditarCentroModal from './EditarCentroModal.jsx';
import './VerSede.css'; // Asegúrate de tener un archivo CSS para los estilos

const VerCentrosMedicos = () => {
    const [centros, setCentros] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [centroSeleccionado, setCentroSeleccionado] = useState(null);
    const cerrarModal = () => setMostrarModal(false);
    const abrirModal = (centro) => {
        setCentroSeleccionado(centro);
        setMostrarModal(true);
        };
  function fetchCentrosMedicos() {
    const url = "http://127.0.0.1:8000/api/gerente/centro_medico/";
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem("token")}`
      }
    })
      .then((response) => response.json())
      .then((data) => setCentros(data))
      .catch((error) => console.error("Error fetching centros médicos:", error));
  }

    useEffect(() => {
      fetchCentrosMedicos();
  }, [centros]);

  return (
    <div className='ver-centros-medicos'>
      <h2 className='ver-centros-medicos__titulo'>Centros Médicos Registrados</h2>
      <table border="1" cellPadding="8" cellSpacing="0" className="tabla-personal">
        <thead className='ver-centros-medicos__tabla__thead'>
          <tr className='ver-centros-medicos__tabla__tr'>
            <th className='item-tabla-sede'>NIT</th>
            <th className='item-tabla-sede'>Nombre</th>
            <th className='item-tabla-sede'>Dirección</th>
            <th className='item-tabla-sede'>Teléfono</th>
            <th className='item-tabla-sede'>Email</th>
          </tr>
        </thead>
        <tbody className='ver-centros-medicos__tabla__tbody'>
          {centros.map((centro, index) => (
            <tr key={index} className='ver-centros-medicos__tabla__tr'>
              <td>{centro.nit}</td>
              <td>{centro.nombre}</td>
              <td>{centro.direccion}</td>
              <td>{centro.telefono}</td>
              <td>{centro.email}</td>
              <td><button className='btn-detalles' onClick={() => abrirModal(centro)}>Editar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      {mostrarModal && (
        <EditarCentroModal 
            centro={centroSeleccionado}
            onClose={cerrarModal}
        />
        )}
    </div>
  );
};

export default VerCentrosMedicos;
