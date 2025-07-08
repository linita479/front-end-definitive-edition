import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CardPersonal   from "../componentes/CardPersonal";
import Logo           from "../../Homepage/componentes/Logo";
import "./ListarPersonal.css";          // ⬅️  estilos propios

const ListarPersonal = () => {
    /* ───────────── hooks ───────────── */
    const { register } = useForm();       //  (lo mantengo por si luego añades filtros extra)
    const [personal,       setPersonal]       = useState([]);
    const [busqueda,       setBusqueda]       = useState("");
    const [detalleActivo,  setDetalleActivo]  = useState(null);

    const token = "aed59313f50d73fd6942f0d22aee7b3ba24eca4b";

    /* ───────────── api ───────────── */
    const cargarPersonal = async (filtro = "") => {
        const url = `http://127.0.0.1:8000/medicos/?filtro=${filtro}`;
        const resp = await fetch(url, {
        headers: { Authorization: `Token ${token}` },
        });
        const data = await resp.json();
        setPersonal(data.personal || []);
    };

    /* primera carga + debounce de búsqueda */
    useEffect(() => { cargarPersonal(); }, []);
    useEffect(() => {
        const id = setTimeout(() => cargarPersonal(busqueda), 400);
        return () => clearTimeout(id);
    }, [busqueda]);

    /* ───────────── ui ───────────── */
    return (
        <div className="josessasa px-6 py-6">
            <div className="cont-logo-principal">
                <Logo />
            </div>
        {/* 🔍 barra búsqueda */}
        <div className="search-bar-wrapper">
            <div className="search-bar">
            {/* icono lupa */}
            <div className="search-bar__icon">
                <svg
                className="icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                >
                <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                />
                </svg>
            </div>

            {/* input */}
            <input
                type="text"
                className="search-bar__input"
                placeholder="Buscar por nombre o documento…"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            {/* botón */}
            <button
                className="search-bar__button"
                onClick={() => cargarPersonal(busqueda)}
            >
                Buscar
            </button>
            </div>
        </div>

        {/* 📋 tabla */}
        <div className="overflow-x-auto">
                    <h2 className="text-2xl font-bold text-gray-700 mb-8">
            Listado del personal médico
        </h2>
            <table className="tabla-personal">
            <thead>
                <tr>
                <th>Número de Documento</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Rol</th>
                <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {personal.map((p, i) => (
                <tr key={i}>
                    <td>{p.usuario_objeto?.nro_doc   || "N/D"}</td>
                    <td>{p.usuario_objeto?.first_name|| "N/D"}</td>
                    <td>{p.usuario_objeto?.last_name || "N/D"}</td>
                    <td>{p.rol}</td>
                    <td>
                    <button
                        className="btn-detalles"
                        onClick={() => setDetalleActivo(p)}
                    >
                        Ver detalles
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>

        {/* 🗂 card lateral */}
        {detalleActivo && (
            <CardPersonal datos={detalleActivo} onClose={() => setDetalleActivo(null)} />
        )}
        </div>
    );
};

export default ListarPersonal;
