import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./NavBar.css"

const NavBar = ({ listOpcions }) => {

    return(
        <div className="navbar__contenedor">
            <nav className="navbar">
                <ul className="navbar__lista_opciones">
                    {listOpcions.map((opcion, index) => (
                        opcion.subOpciones ? (
                            <li key={index} className="nabvar__index">
                            <h1 className="nabvar__opcion">{opcion.name}</h1>
                            {opcion.subOpciones.map((subOpcion, subIndex) => (
                                <Link key={subIndex} to={subOpcion.path} className="navbar__link sublink">{subOpcion.name}</Link>
                            ))}
                            </li>
                        ) : (
                            <li key={index} className="navbar__index">
                            <Link to={opcion.path} className="navbar_link">{opcion.name}</Link>
                            </li>
                        )
                        ))}

                </ul>
            </nav>
            <Outlet />
        </div>
    )
}

export default NavBar;