import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import "./Sidebar.css";

const NavBar = ({ listOpcions = [] }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [open, setOpen] = useState({});
    const [hover, setHover] = useState(null);
    const { pathname } = useLocation();

    const toggleSidebar = () => setCollapsed(!collapsed);

    const toggleClick = name =>
        setOpen(prev => ({ ...prev, [name]: !prev[name] }));

    const onEnter = name => collapsed && setHover(name);
    const onLeave = () => collapsed && setHover(null);

    return (
        <>
        <aside className={`sb ${collapsed ? "sb--collapsed" : ""}`}>
            {/* header */}
            <header className="sb__header">
                {!collapsed && <span className="sb__brand">Kenayhealthsoft</span>}
                <button className="sb__btn" onClick={toggleSidebar}>
                    <i className="fas fa-bars" />
                </button>
            </header>

            {/* menú */}
            <nav className="sb__menu">
                {listOpcions.map(op => (
                    <div
                        className="sb__item"
                        key={op.name}
                        onMouseEnter={() => onEnter(op.name)}
                        onMouseLeave={onLeave}
                    >
                        {op.subOpciones ? (
                            <>
                                <div
                                    role="button"
                                    tabIndex={0}
                                    className={`sb__link ${pathname.includes(op.path) ? "is-active" : ""}`}
                                    onClick={() => !collapsed && toggleClick(op.name)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") toggleClick(op.name);
                                    }}
                                >
                                    <i className={`${op.icono || "fas fa-folder"} sb__ico`} />
                                    {!collapsed && <span>{op.name}</span>}
                                    {!collapsed && (
                                        <i className={`fas fa-chevron-${open[op.name] ? "up" : "down"} sb__chevron`} />
                                    )}
                                </div>

                                <div className={`sb__submenu ${open[op.name] ? "show" : ""}`}>
                                    {op.subOpciones.map(sub => (
                                        <NavLink
                                            to={sub.path}
                                            key={sub.name}
                                            className={({ isActive }) =>
                                                `sb__sublink${isActive ? " is-active" : ""}`
                                            }
                                        >
                                            <i className={`${sub.icono || "fas fa-circle"} sb__ico`} />
                                            <span>{sub.name}</span>
                                        </NavLink>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <NavLink
                                to={op.path}
                                end={false}
                                className={({ isActive }) =>
                                    `sb__link${isActive ? " is-active" : ""}`
                                }
                            >
                                <i className={`${op.icono || "fas fa-file"} sb__ico`} />
                                {!collapsed && <span>{op.name}</span>}
                            </NavLink>
                        )}
                    </div>
                ))}
            </nav>

            {/* footer */}
            <footer className="sb__footer">
                <i className="fas fa-user-circle sb__avatar" />
                {!collapsed && <span className="sb__user">Juan Pérez</span>}
            </footer>
        </aside>

        <main className={`main ${collapsed ? "main--collapsed" : ""}`}>
            <Outlet />
        </main>
        </>
    );
};

export default NavBar;









// import React, { useState } from "react";
// import { Link, Outlet } from "react-router-dom";
// import './Sidebar.css';
// import Logo from "../../Homepage/componentes/Logo";

// const NavBar = ({ listOpcions }) => {
//     const [isCollapsed, setIsCollapsed] = useState(false);
//     const [opcionesVisibles, setOpcionesVisibles] = useState({});

//     const toggleSidebar = () => {
//         setIsCollapsed(!isCollapsed);
//     };

//     const toggleOpcion = (nombre) => {
//         setOpcionesVisibles((prev) => ({
//         ...prev,
//         [nombre]: !prev[nombre],
//         }));
//     };

//     return (
//         <>
//         <div className={`sidebar__container ${isCollapsed ? 'collapsed' : ''}`}>
//         <div className={`sidebar__header ${isCollapsed ? 'collapsed' : ''}`}>
//             {!isCollapsed && (
//                 <span className="sidebar__brand">Kenayhealthsoft</span>
//             )}
//             <button className="sidebar__toggle-btn" onClick={toggleSidebar}>
//                 <i className="fas fa-bars"></i>
//             </button>
//         </div>

//             <ul className="sidebar__menu">
//             {listOpcions.map((opcion, index) => (
//                 <li className="sidebar__item" key={index}>
//                 {opcion.subOpciones ? (
//                     <>
//                     <div
//                         className="sidebar__title"
//                         onClick={() => toggleOpcion(opcion.name)}
//                     >
//                         <div className="sidebar__icon-wrapper">
//                         <i className={`${opcion.icono || 'fas fa-bars'} sidebar__icon`}></i>
//                         </div>
//                         <span className="sidebar__text">{opcion.name}</span>
//                         {isCollapsed && <div className="sidebar__tooltip">{opcion.name}</div>}
//                     </div>
//                     {opcionesVisibles[opcion.name] && !isCollapsed && (
//                         opcion.subOpciones.map((sub, subIndex) => (
//                         <Link
//                             key={subIndex}
//                             to={sub.path}
//                             className="sidebar__link subopcion"
//                         >
//                             <div className="sidebar__icon-wrapper">
//                             <i className={`${sub.icono || 'fas fa-link'} sidebar__icon`}></i>
//                             </div>
//                             <span className="sidebar__text">{sub.name}</span>
//                         </Link>
//                         ))
//                     )}
//                     </>
//                 ) : (
//                     <Link to={opcion.path} className="sidebar__principal-link">
//                     <div className="sidebar__icon-wrapper">
//                         <i className={`${opcion.icono || 'fas fa-link'} sidebar__icon`}></i>
//                     </div>
//                     <span className="sidebar__text">{opcion.name}</span>
//                     {isCollapsed && <div className="sidebar__tooltip">{opcion.name}</div>}
//                     </Link>
//                 )}
//                 </li>
//             ))}
//             </ul>

//             {/* <div className="sidebar__logo-final">
//             <Logo />
//             </div> */}
//             <div className="sidebar__footer">
//                 <div className="sidebar__profile">
//                     <div className="sidebar__avatar">
//                         <i className="fas fa-user-circle"></i>
//                     {/* O usa una <img src="..." /> si tienes imagen */}
//                     </div>
//                     {!isCollapsed && <span className="sidebar__username">Juan Pérez</span>}
//                 </div>
//             </div>
//         </div>

//         <div className={`main__content ${isCollapsed ? 'collapsed' : ''}`}>
//             <Outlet />
//         </div>
//         </>
//     );
// };

// export default NavBar;



