import React, { useState } from 'react';
import './InfoUsuario.css';

const InfoUsuario = ({ isCollapsed }) => {
  const [mostrarOpciones, setMostrarOpciones] = useState(false);

  const nombre = sessionStorage.getItem('nombre') || 'Usuario';
  const apellido = sessionStorage.getItem('apellido') || '';
  const rol = sessionStorage.getItem('tipo_usuario') === 'gerente' ? 'Gerente' : 'Usuario';

  const handleCerrarSesion = () => {
    async function cerrarSesion() {
      try {
        const response = await fetch('http://127.0.0.1:8000/logout/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${sessionStorage.getItem('token')}`
          }
        });
        if (!response.ok) throw new Error('Error al cerrar sesión');
        console.log('Sesión cerrada exitosamente');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      } finally {
        sessionStorage.clear();
        window.location.href = '/login';
      }
    }
    cerrarSesion();
  };

  return (
    <div className="sidebar__footer">
      <div className="sidebar__profile" onClick={() => setMostrarOpciones(!mostrarOpciones)}>
        <div className="sidebar__avatar">
          <i className="fas fa-user-circle"></i>
        </div>
        {!isCollapsed && (
          <div className="sidebar__info">
            <span className="sidebar__username">{`${nombre} ${apellido}`}</span>
            <span className="sidebar__rol">{rol}</span>
          </div>
        )}
      </div>

      {mostrarOpciones && (
        <div className="sidebar__menu-opciones">
          <button className="sidebar__logout" onClick={handleCerrarSesion}>
            <i className="fas fa-sign-out-alt"></i> Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default InfoUsuario;
