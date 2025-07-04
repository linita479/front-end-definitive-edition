import React from "react";
import { Link, Outlet } from "react-router-dom";

const Personal = () =>{
    return(
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to='registromedico'>Registrar personal medico</Link>
                    </li>
                    <li>
                        <Link to='registroauxiliar'>Registrar auxiliar administrativo</Link>
                    </li>
                    <li>
                        <Link>Listar medico</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}
export default Personal;