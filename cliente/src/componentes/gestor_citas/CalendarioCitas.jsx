import React from "react";
import { useState } from "react";
import Card_cita from "./Card_cita"
import Calendario_horas from "./Calendario_horas";
// import "./calendario_citas.css"

const CalendarioCitas = () =>{
    const [index, setIndex] = useState(0);
    const [open,setOpen] = useState(false);
    const [dia,setDia] = useState(null)
    const [isOpen, setIsOpen] = useState(true); // Cambié isOpen a true para que el calendario se muestre inicialmente
    if (!isOpen){return null}

    
    function handleOpen (dia){
        setOpen(true)
        setDia(dia)
        console.log(dia)
    };

    const handleClose = () => {
        setOpen(false); 
      };


    function handleSumaMes() {
      setIndex(index + 1);
    }
    function handleRestaMes() {
        setIndex(index - 1);
      }

      function generarDiasDelAño(anio) {
        const diasDelAño = Array.from({ length: 12 }, () => []); // Inicializa un arreglo de 12 meses
        const fechaInicio = new Date(anio, 0, 1); // 1 de enero
        const fechaFin = new Date(anio + 1, 0, 1); // 1 de enero del siguiente año
      
        for (let fecha = fechaInicio; fecha < fechaFin; fecha.setDate(fecha.getDate() + 1)) {
          const mesActual = fecha.getMonth();
      
          // Si es el primer día del mes, llena los días anteriores con `null`
          if (fecha.getDate() === 1) {
            const primerDiaSemana = fecha.getDay(); // Índice del primer día de la semana
            for (let i = 0; i < primerDiaSemana; i++) {
              diasDelAño[mesActual].push(null);
            }
          }
      
          // Agregar el día correspondiente
          diasDelAño[mesActual].push(new Date(fecha));
        }
      
        return diasDelAño;
      }
      
      // Prueba el código
      const dias = generarDiasDelAño(2025);
   
      const texto_meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ];
      


    return(
                <>
                <h1 className="textoo">Crear cita</h1>
                <div className="calendario">
                <div className="calendario__meses_info">
                  <button onClick={handleRestaMes}> {texto_meses[index - 1]} </button>
                  <h1>{texto_meses[index]}</h1>
                  <button onClick={handleSumaMes}> {texto_meses[index + 1]} </button>
                </div>
                <div className="calendario__dias">
                  <h1>Domingo</h1>
                  <h1>Lunes</h1>
                  <h1>Martes</h1>
                  <h1>Miercoles</h1>
                  <h1>Jueves</h1>
                  <h1>Viernes</h1>
                  <h1>Sabado</h1>
                </div>
                <div className="calendario__contenedor">
                  {dias[index].map(dias_card => {
                    if (dias_card == null) {
                      // Días nulos (relleno para inicio de mes)
                      return <Card_cita dia={"*"} open={() => {}} className="calendario__dia--nulo" />;
                    } else {
                      const fechaHoy = new Date(); // Fecha actual
                      fechaHoy.setHours(0, 0, 0, 0); // Resetear hora para comparar solo fechas

                      const esPasado = dias_card < fechaHoy; // Comparar fechas
                      return (
                        <Card_cita
                          dia={dias_card.getDate()}
                          open={esPasado ? null : () => handleOpen(dias_card)} // Si es pasado, no ejecuta `onClick`
                          className={esPasado ? "calendario__dia--pasado" : "calendario__dia"}
                        />
                      );
                    }
                  })}
                </div>

                </div>

            <Calendario_horas isOpenCH={open} isCloseCH={handleClose}  dia={dia} ></Calendario_horas>


        </>

    )
    
}

export default CalendarioCitas