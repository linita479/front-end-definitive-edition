import React from "react";
import './EtiquetaInput.css'; // asegúrate de crear este archivo


const EtiquetaInput = (props) => {
  const isFile = props.type === "file";

    return (
        <div className="input-wrapper">
            <label className="label-formulario" htmlFor={props.name}>{props.label}</label>
            {isFile ? (
                <input
                type="file"
                id={props.name}
                {...props.register}
                className="input-file-formulario"
                />
            ) : (
                <input
                type={props.type}
                placeholder={props.placeholder}
                {...props.register}
                className="input-formulario-objetos"
                />
            )}
        </div>
    );
};

export default EtiquetaInput;



