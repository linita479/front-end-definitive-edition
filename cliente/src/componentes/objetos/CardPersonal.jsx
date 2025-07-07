import React from "react";
import { useState } from "react";
import ListaAcademicos from "./ListaAcademicos";

const CardPersonal = ({datos, onClose}) =>{
    const [mostrarAcademicos, setMostrarAcademicos] = useState(false);

    if(!datos) return null;
    const nroDoc = datos.usuario_objeto?.nro_doc;



    return(
        <div>
            <h3>Datos del personal</h3>
            <p><strong>Número de documento:</strong> {datos.usuario_objeto?.nro_doc || "N/D"}</p>
            <p><strong>Nombre:</strong> {datos.usuario_objeto?.first_name || "N/D"}</p>
            <p><strong>Apellido:</strong> {datos.usuario_objeto?.last_name || "N/D"}</p>
            <p><strong>Sexo:</strong> {datos.usuario_objeto?.sexo || "N/D"}</p>
            <p><strong>Rol:</strong> {datos.rol}</p>
            {datos.rol === "medico" && (
                <p><strong>Especialidad:</strong> {datos.especialidad || "No registrada"}</p>
            )}
            
            <button onClick={() => setMostrarAcademicos(true)}>Ver académicos</button>
            <button onClick={onClose}>Cerrar</button>
            {mostrarAcademicos && <ListaAcademicos nroDoc={nroDoc} />}
        </div>

    )
}

export default CardPersonal;