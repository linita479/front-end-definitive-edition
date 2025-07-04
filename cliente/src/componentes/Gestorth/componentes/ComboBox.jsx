import React from "react";
import "./ComboBox.css"; // Asegúrate de importar el CSS

const ComboBox = (props) => {
    return (
        <div className="comboBox-container">
        <label className="comboBox-label">{props.label}</label>
        <select className="comboBox-select" {...props.register}>
            {props.options.map((option, index) => (
            <option key={index} value={option.value}>
                {option.label}
            </option>
            ))}
        </select>
        </div>
    );
};

export default ComboBox;
