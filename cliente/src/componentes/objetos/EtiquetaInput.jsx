import React from "react";
import "./EtiquetaInput.css"; // Assuming you have a CSS file for styling
const EtiquetaInput = (props) => {
    return (
        <div className="input-wrapper-etiqueta">
            <label htmlFor={props.name} className="input-wrapper-etiqueta__input-label">
                {props.label}
            </label>
            <input
                type={props.type}
                id={props.name}
                placeholder=" "
                className="input-wrapper-etiqueta__input-field"
                {...props.register}
            />
        </div>
    );
    };

export default EtiquetaInput;