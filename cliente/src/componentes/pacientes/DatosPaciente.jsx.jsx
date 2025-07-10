import React, { useEffect, useState } from "react";
import "./datosPaciente.css";

const DatosPaciente = () => {
  const [usuario, setUsuario] = useState(null);
  const [paciente, setPaciente] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resp = await fetch("http://127.0.0.1:8000/datos/paciente/", {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("token")}`
          }
        });

        const data = await resp.json();
        setPaciente(data);
        setUsuario(data.usuario); // asumiendo que el serializer anida "usuario"
      } catch (error) {
        console.error("❌ Error cargando datos:", error);
      }
    };

    cargarDatos();
  }, []);

  if (!usuario || !paciente) return <p>🔄 Cargando información del paciente...</p>;

  return (
    <div className="datos-paciente">
      <h2>👤 Perfil del paciente</h2>

      <div className="columna-formulario">
        <h4>👤 Datos personales</h4>
        <p><strong>Nombre:</strong> {usuario.first_name} {usuario.last_name}</p>
        <p><strong>Tipo documento:</strong> {usuario.tipo_doc}</p>
        <p><strong>N° Documento:</strong> {usuario.nro_doc}</p>
        <p><strong>Fecha nacimiento:</strong> {usuario.fecha_nacimiento}</p>
        <p><strong>Teléfono:</strong> {usuario.telefono}</p>
        <p><strong>Estado civil:</strong> {usuario.estado_civil}</p>
        <p><strong>Sexo:</strong> {usuario.sexo}</p>
        <p><strong>Nacionalidad:</strong> {usuario.nacionalidad}</p>
        <p><strong>Municipio:</strong> {usuario.municipio}</p>
        <p><strong>Lugar expedición:</strong> {usuario.lugar_exp_doc}</p>
        <p><strong>Fecha expedición:</strong> {usuario.fecha_exp_doc}</p>
      </div>

      <div className="columna-formulario">
        <h4>🏥 Información clínica</h4>
        <p><strong>Ocupación:</strong> {paciente.ocupacion || "—"}</p>
        <p><strong>Régimen:</strong> {paciente.regimen || "—"}</p>
        <p><strong>EPS:</strong> {paciente.eps || "—"}</p>
        <p><strong>Estrato:</strong> {paciente.estrato || "—"}</p>
        <p><strong>Grupo atención especial:</strong> {paciente.grupo_atencion_especial || "—"}</p>
        <p><strong>Grupo sanguíneo:</strong> {paciente.grupo_sanguineo || "—"}</p>
      </div>
    </div>
  );
};

export default DatosPaciente;
