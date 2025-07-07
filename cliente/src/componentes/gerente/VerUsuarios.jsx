import React, { useEffect, useState } from 'react';
import './VerUsuarios.css'; // Asegúrate de crear este archivo si deseas estilizar

const VerUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  async function fetchUsuarios() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/gerente/usuarios/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${sessionStorage.getItem("token")}`
        }
      });
      if (!response.ok) throw new Error('Error al obtener usuarios');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleVerDetalles = (usuario) => {
    console.log('Detalles del usuario:', usuario);
    // Aquí podrías redirigir o mostrar un modal con más detalles
  };

  const handleEditar = (usuario) => {
    console.log('Editar usuario:', usuario);
    // Aquí podrías redirigir a una ruta como /editar-usuario/${usuario.nro_doc}
  };

  return (
    <div className='ver-usuarios'>
      <h2 className='ver-usuarios__titulo'>Usuarios Registrados</h2>
      <table className='ver-usuarios__tabla'>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>N° Documento</th>
            <th>Tipo Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user, index) => (
            <tr key={index}>
              <td>{`${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Sin nombre'}</td>
              <td>{user.nro_doc}</td>
              <td>{user.tipo_uduario || 'No definido'}</td>
              <td>
                <button className='ver-usuarios__btn' onClick={() => handleVerDetalles(user)}>Detalles</button>
                <button className='ver-usuarios__btn editar' onClick={() => handleEditar(user)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerUsuarios;
