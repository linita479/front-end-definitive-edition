import React from "react";
import "./Botones.css";

const Botones = (props) =>{
    return(
        <div>
            <button className="btnform" onClick={props.onClick ? props.onClick : null} type={props.tipo}>{props.name}</button>
        </div>
    )
}
export default Botones;