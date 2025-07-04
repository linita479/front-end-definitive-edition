import React from "react";
import { Link, Outlet } from "react-router-dom";

const HojaVida =()=>{
    return(
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to='academico'>Agregar formacion academica</Link>
                    </li>
                    <li>
                        <Link to='experiencia'>Agregar experiencia laboral</Link>
                    </li>
                    <li>
                        <Link to='consultar'>Consultar personal</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}
export default HojaVida;