import React, { useState, useEffect } from "react";
import Logo from "../../Homepage/componentes/Logo";
import BusquedaDocumento from "../componentes/BusquedaDocumento";
import { useForm } from "react-hook-form";
import "./GestionPersonal.css"
import ModalDetallesPersonal from "./ModalDetallesPersonal";
import FormActualizar from "./FormActualizar";

const GestionarPersonal = () => {
    const [usuarios, setUsuarios] = useState([]);
    const { register , handleSubmit, watch, formState: { errors } } = useForm();
    const [busqueda, setBusqueda] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [modal, setModal] = useState({
    visible: false,
    tipo: "",
    mensaje: "",
    });
    const handleVerDetalles = (usuario) => {
  setPersonalSeleccionado(usuario);
  setModalVisible(true);
};

const [personalSeleccionado, setPersonalSeleccionado] = useState(null);
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
        console.log(data)
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
    <thead>
      <tr>
        <th>Nombre</th>
        <th>N° Documento</th>
        <th>Tipo Usuario</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
        {console.log(usuarios
        .filter(user =>
          ["medico", "auxiliar"].includes(
            (user.tipo_uduario || "").toLowerCase()
          )
        ))}
      {usuarios
  .filter(user =>
    ["medico", "auxiliar"].includes((user.tipo_uduario || "").toLowerCase())
  )
  .filter(user =>
    busqueda.trim() === "" || user.nro_doc.includes(busqueda.trim())
  )
  .map((user, index) => (
    <tr key={index}>
      <td>{`${user.first_name || ""} ${user.last_name || ""}`.trim() || "Sin nombre"}</td>
      <td>{user.nro_doc}</td>
      <td>{user.tipo_uduario || "No definido"}</td>
      <td>
        <button className='ver-usuarios__btn' onClick={() => handleVerDetalles(user)}>
          Detalles
        </button>
        <button className='ver-usuarios__btn editar' onClick={() => {
        setPersonalSeleccionado(user);
        setModalVisible(true);
        }}>
          Editar
        </button>
      </td>
    </tr>
))}
{/* {usuariosFiltrados.length === 0 && (
  <tr><td colSpan="4">No se encontraron resultados para esa búsqueda</td></tr>
)} */}
    <ModalDetallesPersonal
    visible={modalVisible}
    personal={personalSeleccionado}
    onClose={() => setModalVisible(false)}
    />

<FormActualizar
  visible={modalVisible}
  onClose={() => setModalVisible(false)}
  tipoUsuario={personalSeleccionado?.tipo_uduario || "medico"} // ¡ojo con ese typo si aún sigue!
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
