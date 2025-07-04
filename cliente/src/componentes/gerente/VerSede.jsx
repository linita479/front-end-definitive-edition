// VerCentrosMedicos.jsx
import React, { useState, useEffect } from 'react';
import EditarCentroModal from './EditarCentroModal.jsx';

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
    <div>
      <h2>Centros Médicos Registrados</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>NIT</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {centros.map((centro, index) => (
            <tr key={index}>
              <td>{centro.nit}</td>
              <td>{centro.nombre}</td>
              <td>{centro.direccion}</td>
              <td>{centro.telefono}</td>
              <td>{centro.email}</td>
              <td><button onClick={() => abrirModal(centro)}>Editar</button></td>
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
