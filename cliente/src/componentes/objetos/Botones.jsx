import React from "react";
import './Botones.css'

const Botones = (props) =>{
    return(
        <div>
            <button className="btn-registro-medico" onClick={props.onClick ? props.onClick : () => {}}
>{props.name}</button>
        </div>
    )
}
export default Botones;