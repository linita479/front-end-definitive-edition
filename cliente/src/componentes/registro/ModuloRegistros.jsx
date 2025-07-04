import React from "react";
import FormularioPacienteExtendido from "./FormularioPaciente";
import FormularioRoles from "./FormularioRoles";
import "./Formulario.css"

const ModuloRegistros = (props) => {

    return (
        <div className="modulo-registros">
            {props.formularioPaciente && <>
                <div className="modulo-registros__paciente">
                    <FormularioPacienteExtendido/>
                </div>
                {/* <div className="modulo-registros__paciente__info">
                    <h2>Información del Paciente</h2>
                    <p>Por favor, complete el formulario para registrar un nuevo paciente.</p>
                    <p>Los campos marcados con * son obligatorios.</p>                    
                </div>    */}
            </>}
            {props.formularioRol &&
                <div className="modulo-registros__rol">
                    <FormularioRoles/>
                </div>
            }
        </div>
    );
}
export default ModuloRegistros;