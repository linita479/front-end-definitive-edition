import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import './Sidebar.css';
import Logo from "../../Homepage/componentes/Logo";

const NavBar = ({ listOpcions }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [opcionesVisibles, setOpcionesVisibles] = useState({});

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleOpcion = (nombre) => {
        setOpcionesVisibles((prev) => ({
        ...prev,
        [nombre]: !prev[nombre],
        }));
    };

    return (
        <>
        <div className={`sidebar__container ${isCollapsed ? 'collapsed' : ''}`}>
        <div className={`sidebar__header ${isCollapsed ? 'collapsed' : ''}`}>
            {!isCollapsed && (
                <span className="sidebar__brand">Kenayhealthsoft</span>
            )}
            <button className="sidebar__toggle-btn" onClick={toggleSidebar}>
                <i className="fas fa-bars"></i>
            </button>
        </div>

            <ul className="sidebar__menu">
            {listOpcions.map((opcion, index) => (
                <li className="sidebar__item" key={index}>
                {opcion.subOpciones ? (
                    <>
                    <div
                        className="sidebar__title"
                        onClick={() => toggleOpcion(opcion.name)}
                    >
                        <div className="sidebar__icon-wrapper">
                        <i className={`${opcion.icono || 'fas fa-bars'} sidebar__icon`}></i>
                        </div>
                        <span className="sidebar__text">{opcion.name}</span>
                        {isCollapsed && <div className="sidebar__tooltip">{opcion.name}</div>}
                    </div>
                    {opcionesVisibles[opcion.name] && !isCollapsed && (
                        opcion.subOpciones.map((sub, subIndex) => (
                        <Link
                            key={subIndex}
                            to={sub.path}
                            className="sidebar__link subopcion"
                        >
                            <div className="sidebar__icon-wrapper">
                            <i className={`${sub.icono || 'fas fa-link'} sidebar__icon`}></i>
                            </div>
                            <span className="sidebar__text">{sub.name}</span>
                        </Link>
                        ))
                    )}
                    </>
                ) : (
                    <Link to={opcion.path} className="sidebar__principal-link">
                    <div className="sidebar__icon-wrapper">
                        <i className={`${opcion.icono || 'fas fa-link'} sidebar__icon`}></i>
                    </div>
                    <span className="sidebar__text">{opcion.name}</span>
                    {isCollapsed && <div className="sidebar__tooltip">{opcion.name}</div>}
                    </Link>
                )}
                </li>
            ))}
            </ul>

            {/* <div className="sidebar__logo-final">
            <Logo />
            </div> */}
            <div className="sidebar__footer">
                <div className="sidebar__profile">
                    <div className="sidebar__avatar">
                        <i className="fas fa-user-circle"></i>
                    {/* O usa una <img src="..." /> si tienes imagen */}
                    </div>
                    {!isCollapsed && <span className="sidebar__username">Juan Pérez</span>}
                </div>
            </div>
        </div>

        <div className={`main__content ${isCollapsed ? 'collapsed' : ''}`}>
            <Outlet />
        </div>
        </>
    );
};

export default NavBar;



