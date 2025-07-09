import React, { useState ,useEffect } from "react";
import { useForm } from "react-hook-form";
import BusquedaDocumento from "../Gestorth/componentes/BusquedaDocumento";
import ModalActualizarPaciente from "./ModalActualizarPaciente";
import ModalVerPaciente from "./ModalVerPaciente";
// import "./gestor_paciente.css";

const GestorPaciente = () => {
  const { register, watch, setValue } = useForm();
  const [paciente, setPaciente] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [listaPacientes,setListaPacientes] = useState([])
  const [mostrarModalActualizar, setMostrarModalActualizar] = useState(false);
  const [mostrarModalVer, setMostrarModalVer] = useState(false);

  useEffect(() => {
    const cargarPacientes = async () => {
        try {
        const resp = await fetch("http://127.0.0.1:8000/lista/pacientes/", {
            headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${sessionStorage.getItem("token")}`
            }
        });
        const data = await resp.json();
        setListaPacientes(data);
        } catch (error) {
        console.error("❌ Error cargando lista de pacientes:", error);
        }
    };

    cargarPacientes();
    }, []);

    const buscarUsuario = (doc) => {
  const encontrado = listaPacientes.find(p => p.usuario.nro_doc === doc);
  if (encontrado) {
    setPaciente(encontrado);
    setMostrarFormulario(true);
  } else {
    setPaciente(null);
    setMostrarFormulario(false);
    console.warn("⚠️ No se encontró ese paciente.");
  }
};

  return (
    <div className="contenedor-gestor-paciente">
      <h2>👤 Gestor de Pacientes</h2>

      <BusquedaDocumento
        register={register("nro_doc")}
        onClick={() => buscarUsuario(watch("nro_doc"))}
      />

      {mostrarFormulario && paciente && (
        <>
          <div className="info-usuario-agenda">
            <h3 className="titulo-info">🧾 Información del paciente</h3>
            <p><strong>Nombre:</strong> {paciente.usuario.first_name} {paciente.usuario.last_name}</p>
            <p><strong>Tipo de documento:</strong> {paciente.usuario.tipo_doc}</p>
            <p><strong>N° Documento:</strong> {paciente.usuario.nro_doc}</p>
            <p><strong>Email:</strong> {paciente.usuario.email || "No disponible"}</p>
            <p><strong>Ocupación:</strong> {paciente.ocupacion || "—"}</p>
            <p><strong>Régimen:</strong> {paciente.regimen}</p>
            <p><strong>EPS:</strong> {paciente.eps}</p>
            <p><strong>Estrato:</strong> {paciente.estrato}</p>
          </div>

          <div className="botones-paciente">
            <button className="btn-actualizar" onClick={() => setMostrarModalActualizar(true)}>
            🔄 Actualizar Datos
            </button>

            <button className="btn-ver-detalle" onClick={() => setMostrarModalVer(true)}>
              👁️ Ver Detalles
            </button>
          </div>
          {mostrarModalActualizar && (
            <ModalActualizarPaciente
                isOpen={mostrarModalActualizar}
                onClose={() => setMostrarModalActualizar(false)}
                paciente={paciente}
            />
            )}
            {mostrarModalVer && (
            <ModalVerPaciente
                isOpen={mostrarModalVer}
                onClose={() => setMostrarModalVer(false)}
                paciente={paciente}
            />
            )}

        </>
      )}
    </div>
  );
};

export default GestorPaciente;
