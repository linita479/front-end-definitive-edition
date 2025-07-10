import React, { useState, useEffect } from "react";
import Logo from "../../Homepage/componentes/Logo";
import BusquedaDocumento from "../componentes/BusquedaDocumento";
import { useForm } from "react-hook-form";
import "./GestionPersonal.css";
import ModalDetallesPersonal from "./ModalDetallesPersonal";
import FormActualizar from "./FormActualizar";
import ModalActualizarPaciente from "../../gestor_citas/ModalActualizarPaciente";


const GestionarPersonal = () => {
    const [usuarios, setUsuarios] = useState([]);
    const { register , handleSubmit, watch, formState: { errors } } = useForm();
    const [busqueda, setBusqueda] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [modal, setModal] = useState({ visible: false, tipo: "", mensaje: "" });
    const [personalSeleccionado, setPersonalSeleccionado] = useState(null);

    const handleVerDetalles = (usuario) => {
        setPersonalSeleccionado(usuario);
        setModalVisible2(true);
    };

    async function fetchUsuarios() {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/gerente/usuarios/", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${sessionStorage.getItem("token")}`
                }
            });
            if (!response.ok) throw new Error('Error al obtener usuarios');
            const data = await response.json();
            setUsuarios(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchUsuarios();
    }, []);

    return (
        <div className="contenedor-personal">
            <div className="cont-logo-flex-start">
                <Logo/>
            </div>
            <BusquedaDocumento
                register={{
                    ...register("nro_doc"),
                    onChange: (e) => setBusqueda(e.target.value),
                }}
                onClick={() => setBusqueda(watch("nro_doc"))}
            />

            <div className='ver-usuarios'>
                <h2 className='ver-usuarios__titulo'>Personal Médico y Auxiliar</h2>
                <table className='ver-usuarios__tabla'>
                    <thead className="head-usuaros-tabla">
                        <tr className="tr-usuarios-tabla">
                            <th className="th-usuarios-tabla">Nombre</th>
                            <th className="th-usuarios-tabla">N° Documento</th>
                            <th className="th-usuarios-tabla">Tipo Usuario</th>
                            <th className="th-usuarios-tabla">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="body-tabla-usuarios">
                        {usuarios
                            .filter(user => ["medico", "auxiliar"].includes((user.tipo_uduario || "").toLowerCase()))
                            .filter(user => busqueda.trim() === "" || user.nro_doc.includes(busqueda.trim()))
                            .map((user, index) => (
                                <tr key={index} className="tr-body-usuarios-tabla">
                                    <td className="td-body-usuarios-tabla">{`${user.first_name || ""} ${user.last_name || ""}`.trim() || "Sin nombre"}</td>
                                    <td className="td-body-usuarios-tabla">{user.nro_doc}</td>
                                    <td className="td-body-usuarios-tabla">{user.tipo_uduario || "No definido"}</td>
                                    <td className="td-body-usuarios-tabla botones-acciones">
                                        <button className='boton-verde'>
                                            <b onClick={() => handleVerDetalles(user)}>Detalles</b>
                                        </button>
                                        <button className='boton-rosa' onClick={() => {
                                            setPersonalSeleccionado(user);
                                            setModalVisible(true);
                                        }}>
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            ))}

                        <ModalDetallesPersonal
                            visible={modalVisible2}
                            personal={personalSeleccionado}
                            onClose={() => setModalVisible2(false)}
                        />

                        <FormActualizar
                            visible={modalVisible}
                            onClose={() => setModalVisible(false)}
                            tipoUsuario={personalSeleccionado?.tipo_uduario || "medico"}
                            setModal={setModal}
                            setMostrarFormulario={setMostrarFormulario}
                        />
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GestionarPersonal;
