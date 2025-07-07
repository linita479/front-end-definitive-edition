import React from "react";

const BusquedaDocumento = (props) => {
  return (
    <div className="contenedor-busqueda">
      <div className="fondo-blanco">
        <p className="texto-busqueda">Buscar por número de documento</p>
        <div className="searchBox">
          <input
            className="searchInput"
            type="text"
            placeholder="Número de documento"
            {...props.register}
          />
          <button className="searchButton" onClick={props.onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24" strokeWidth={2} stroke="white"
                 width="24" height="24">
              <path strokeLinecap="round" strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M16.65 16.65A7.5 
                       7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusquedaDocumento;
