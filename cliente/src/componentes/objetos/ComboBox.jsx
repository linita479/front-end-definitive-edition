import React from "react";
import "./ComboBox.css"

const ComboBox = (props)=>{

    return(
        <div className="input-wrapper-etiqueta">
            <label htmlFor="" className="input-wrapper__input-label">{props.label}</label>
            <select {...props.register} onChange={props.onChange ? props.onChange : null} className="input-wrapper__input-field">
                {props.options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>

    )
}
export default ComboBox;