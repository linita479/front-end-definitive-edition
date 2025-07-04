import React, { useEffect, useState } from "react";
import EtiquetaInput from "../componentes/EtiquetaInput";
import { useForm } from "react-hook-form";
import CardPersonal from "../componentes/CardPersonal";


const ListarPersonal = () =>{
    const { register , handleSubmit, watch, formState: { errors } } = useForm();
    const [personal, setPersonal] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [detalleActivo, setDetalleActivo] = useState(null);

    const token = 'aed59313f50d73fd6942f0d22aee7b3ba24eca4b';

    const cargarPersonal = async (filtro="")=>{
        let url = `http://127.0.0.1:8000/medicos/?filtro=${filtro}`;
        // if (filtro){
        //     url += `?nro_doc=${filtro}&first_name=${filtro}`;
        // }
        const response = await fetch(url,{
            method: "GET",
            headers: {
                "Authorization": `Token ${token}`,
            },
        })
        const data = await response.json();
        setPersonal(data.personal || []);
    };
    useEffect(()=>{
        cargarPersonal();
    },[])

    useEffect(()=>{
        const delay = setTimeout(()=>cargarPersonal(busqueda),400);
        return () => clearTimeout(delay);
    },[busqueda]);

    return(
        <>
        <div>
            <h2>Listado del personal medico</h2>
            <input
                type="text"
                placeholder="Buscar por nombre o documento"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />
            <table>
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
                {personal.map((p, index) => (
                    <tr key={index}>
                    <td>{p.usuario_objeto?.nro_doc || "N/D"}</td>
                    <td>{p.usuario_objeto?.first_name || "N/D"}</td>
                    <td>{p.usuario_objeto?.last_name || "N/D"}</td>
                    <td>{p.rol}</td>
                    <td><button onClick={() => setDetalleActivo(p)}>Ver detalles</button></td>

                    </tr>
                ))}
                </tbody>

            </table>
            {detalleActivo && (
            <CardPersonal
                datos={detalleActivo}
                onClose={() => setDetalleActivo(null)}
            />
            )}
        </div>
        </>
    );
}

export default ListarPersonal;