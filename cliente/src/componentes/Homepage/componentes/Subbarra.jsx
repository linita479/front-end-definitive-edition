import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaHome, FaHospitalAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Home, Hospital, MapPin } from 'lucide-react'; 
import './Homepage.css'
import Logo from "./Logo";
import Boton from "./Boton";
import BotonIniciarSesion from "./BotonIniciar";

const SubBarra = () =>{
    return(
        <div>
            <nav className="navbar-homepage">
                <div className="navbar-homepage__navbar-logo">
                    <Logo />
                </div>

                <ul className="navbar-homepage__navbar-menu">
                    <li className="navbar-homepage__navbar-item">
                        <Link to="/">
                            <Home size={20} />
                            <span>Inicio</span>
                        </Link>
                    </li>
                    <li className="navbar-homepage__navbar-item">
                        <Link to="/servicios">
                            <Hospital size={20} />
                            <span>Servicios</span>
                        </Link>
                    </li>
                    <li className="navbar-homepage__navbar-item">
                        <Link to="/sedes">
                            <MapPin size={20} />
                            <span>Sedes</span>
                        </Link>
                    </li>
                </ul>
                <div className="navbar-homepage__navbar-boton">
                    <Link to="/login">
                        <BotonIniciarSesion />
                    </Link>
                </div>
            </nav>

            <Outlet />
        </div>
    )
}

export default SubBarra;