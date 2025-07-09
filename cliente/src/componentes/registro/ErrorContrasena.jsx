import React from "react";
import { AlertTriangle } from 'lucide-react'; // Asegúrate de tener lucide-react instalado
import './ErrorContrasena.css'

const ErrorContrasena = ({ mostrar }) => {
    if (!mostrar) return null;

    return (
        <div className="contenedor-error-password">
        <div className="barra-lateral"></div>
        <div className="contenido-error">
            <AlertTriangle size={20} color="#FFC107" style={{ marginRight: '8px' }} />
            <p className="texto-error">
            La contraseña debe tener entre 8 y 16 caracteres, incluir al menos una mayúscula, un número y un carácter especial.
            </p>
        </div>
        </div>
    );
};

export default ErrorContrasena;
