import React from "react";

const Card_cita = ({dia,open}) =>{

    return(
        <>
        <button className="calendario__card_cita" onClick={open}>
            <h1>{dia}</h1>
        </button>
        </>
    )

}

export default Card_cita