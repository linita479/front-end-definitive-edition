import React from "react";
import "./calendario_horas.css"
import Card_cita_horas from "./Card_cita_hora";

const Calendario_horas = ({isOpenCH,isCloseCH,token,dia,nro_doc}) =>{

    function generarHoras(margenInicio, margenFin, intervalo) {
        const horas = [];
        let horaActual = new Date();
        horaActual.setHours(margenInicio, 0, 0, 0);
      
        const horaFinal = new Date();
        horaFinal.setHours(margenFin, 0, 0, 0); 
      
        while (horaActual < horaFinal) {
          horas.push(horaActual.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }));
          horaActual.setMinutes(horaActual.getMinutes() + intervalo); 
        }
      
        return horas;
      }
      
      // Generar el arreglo con intervalos de 20 minutos entre 8:00 AM y 5:00 PM
      const arregloHoras = generarHoras(8, 17, 20);

    if (!isOpenCH){return null}
    return(

        <>
        <h1>Crear cita</h1>
        <div className="calendario_horas">
            <button className="calendario__boton_atras" onClick={isCloseCH}>{"<="}</button>
            <div className="calendario_horas__contenedor">
                {arregloHoras.map(horas => <Card_cita_horas hora={horas} dia={dia} > </Card_cita_horas> )}
            </div>
        </div>
        </>

    )

}

export default Calendario_horas