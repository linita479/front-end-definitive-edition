// VerServicios.jsx
import React, { useState, useEffect } from 'react';

const VerServicios = () => {
  const [servicios, setServicios] = useState([]);

  async function fetchServiciosActualizar(id, estado) {
    console.log(id, estado);
    let body = {}
    if (estado == false) {
        body = {
        estado: true,
    };
    } else {
        body = {
        estado: false,
    };
    }
    try {
        const response = await fetch(`http://127.0.0.1:8000/api/gerente/servicio/${id}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem("token")}`
          },
          body: JSON.stringify(body) // Asegúrate de enviar el ID si es necesario
        });
        if (!response.ok) {
          throw new Error('Error en la petición');
        }
        const data = await response.json();
        console.log('Servicio actualizado:', data);
    } catch (error) {
      console.error('Error al obtener servicios:', error);
    }
  }

  async function fetchServicios() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/gerente/servicio/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${sessionStorage.getItem("token")}`
        }
      });
      if (!response.ok) {
        throw new Error('Error en la petición');
      }
      const data = await response.json();
      setServicios(data);
    } catch (error) {
      console.error('Error al obtener servicios:', error);
    }
  }
    useEffect(() => {
        fetchServicios();
    }, [servicios]);
  return (
    <div>
      <h2>Servicios Registrados</h2>
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>Capítulo</th>
            <th>Nombre</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((servicio, index) => (
            <tr key={index}>
              <td>{servicio.capitulo}</td>
              <td>{servicio.nombre}</td>
              <td>{servicio.estado ? 'Activo' : 'Inactivo'}</td>
              <td><input type="checkbox" checked={servicio.estado} onChange={() => {fetchServiciosActualizar(servicio.capitulo, servicio.estado)}} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerServicios;
