import React from "react";
import './Btnform.css'

const Btnform = (props) =>{
    return(
        <>
        <div>
        <button className="btnformularios">{props.boton}</button>
        </div>
        </>
    )
}

export default Btnform;