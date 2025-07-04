import React from "react";
import '../registro/Mensaje.css'
const Mensaje = ({ children, visible, onClose }) => {
    if (!visible) return null;

    return (
        <div className="modal-registro-exitoso">
            <div className="modal-registro-mensaje">
                {/* Si quieres título, usa la clase card-title */}
                <p className="card-title">¡Registro exitoso!</p>

                {/* Contenido principal */}
                <p>{children}</p>

                <div className="contenedor-boton-cerrar button-borders">
                <button onClick={onClose} className="btn-cerrar-modal">
                    Cerrar
                </button>
                </div>
            </div>
        </div>

    );
};


export default Mensaje;