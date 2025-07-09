import React from "react";
const ListaBloques = ({ bloques }) => {
    
  return (
    <div className="lista-bloques">
      <h4>🕐 Bloques disponibles</h4>
      {bloques && bloques.length > 0 ? (
        <ul>
          {bloques.map((bloque, index) => (
            <li key={index}>{bloque}</li>
          ))}
        </ul>
      ) : (
        <p>No hay bloques para este día</p>
      )}
    </div>
  );
};

export default ListaBloques;
