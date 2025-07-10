// VerServicios.jsx
import React, { useState, useEffect } from 'react';
import './VerServicios.css'; // Asegúrate de tener un archivo CSS para los estilos

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
    <div className='ver-usuarios'>
      <h2 className='ver-usuarios__titulo'>Servicios Registrados</h2>
      <table border="1" cellPadding="8" cellSpacing="0" className='ver-servicios__tabla'>
        <thead className='ver-usuarios__tabla__thead'>
          <tr className='ver-usuarios__tabla__tr'>
            <th className='item-ver-servicios'>Capítulo</th>
            <th className='item-ver-servicios'>Nombre</th>
            <th className='item-ver-servicios'>Estado</th>
          </tr>
        </thead>
        <tbody className='ver-usuarios__tabla__tbody'>
          {servicios.map((servicio, index) => (
            <tr key={index} className='ver-usuarios__tabla__tr'>
              <td>{servicio.capitulo}</td>
              <td>{servicio.nombre}</td>
              <td>{servicio.estado ? 'Activo' : 'Inactivo'}</td>
              <td><input className='vver-usuarios__checkbox' type="checkbox" checked={servicio.estado} onChange={() => {fetchServiciosActualizar(servicio.capitulo, servicio.estado)}} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerServicios;
