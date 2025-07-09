import React from 'react';

const Overly = ({ onRegisterClick, onLoginClick }) => {
    return (
        <div className="overlay-contenedor">
        <div className="overlay">
            <div className="overlay-panel overlay-left">
            <h1 className="titulo">Bienvenido</h1>
            <p className='prrf-overlay-registro-personal'>
                ¿Eres paciente del hospital?
                Inicia sesión para consultar tu historia clínica, agendar citas y acceder a tus servicios de salud.
            </p>
            <button className="boton btn" id="login" onClick={onLoginClick}>
                Ingresar
            </button>
            </div>
            <div className="overlay-panel overlay-right">
            <h1 className="titulo">Bienvenido</h1>
            <p className='prrf-overlay-registro-personal'>
                ¿Eres parte del personal del hospital?
                Inicia sesión con tu cuenta para acceder a tus funciones y recursos asignados.
            </p>
            <button className="boton btn" id="registrar" onClick={onRegisterClick}>
                Ingresar
            </button>
            </div>
        </div>
        </div>
    );
};

export default Overly;