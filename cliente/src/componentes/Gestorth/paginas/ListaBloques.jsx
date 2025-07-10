import React from "react";
import './ListaBloques.css'
const ListaBloques = ({ bloques }) => {
    
  return (
    <div className="lista-bloques">
      <h4 className="tlt-bloques-disponibles">🕐 Bloques disponibles</h4>
      {bloques && bloques.length > 0 ? (
        <ul className="ul-lista-bloques-agenda">
          {bloques.map((bloque, index) => (
            <li key={index} className="item-lista-bloques-agenda">{bloque}</li>
          ))}
        </ul>
      ) : (
        <p className="prrf-informativo-bloques">No hay bloques para este día</p>
      )}
    </div>
  );
};

export default ListaBloques;
