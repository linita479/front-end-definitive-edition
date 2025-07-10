import React, { useEffect, useState } from "react";
import "./tabla_citas.css";

const HistorialCitas = () => {
  const [citas, setCitas] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  const [busquedaMedico, setBusquedaMedico] = useState("");
  const [busquedaPaciente, setBusquedaPaciente] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resCitas, resMedicos, resPacientes] = await Promise.all([
          fetch("http://127.0.0.1:8000/api/gestor-cita/cita", {
            headers: { Authorization: `Token ${sessionStorage.getItem("token")}` }
          }),
          fetch("http://127.0.0.1:8000/lista/medicos/", {
            headers: { Authorization: `Token ${sessionStorage.getItem("token")}` }
          }),
          fetch("http://127.0.0.1:8000/lista/pacientes/", {
            headers: { Authorization: `Token ${sessionStorage.getItem("token")}` }
          })
        ]);

        const [dataCitas, dataMedicos, dataPacientes] = await Promise.all([
          resCitas.json(),
          resMedicos.json(),
          resPacientes.json()
        ]);
        console.log(dataMedicos)
        setCitas(dataCitas);
        setMedicos(dataMedicos);
        setPacientes(dataPacientes);
      } catch (error) {
        console.error("❌ Error cargando datos:", error);
      }
    };

    cargarDatos();
  }, []);

  const citasFiltradas = citas.filter(cita => {
  const medico = medicos.find(m => m.id === cita.medico);
  const paciente = pacientes.find(p => p.id === cita.paciente);

  const nombreMedico = medico ? `${medico.usuario.first_name} ${medico.usuario.last_name}`.toLowerCase() : "";
  const nombrePaciente = paciente ? `${paciente.usuario.first_name} ${paciente.usuario.last_name}`.toLowerCase() : "";

  return (
    nombreMedico.includes(busquedaMedico.toLowerCase()) &&
    nombrePaciente.includes(busquedaPaciente.toLowerCase())
  );
});
  return (
    <div className="tabla-citas">
      <h2 className="titulo-ver-citas-medicas">
        <i className="fas fa-notes-medical" style={{ marginRight: "0.5rem", color: "#7b52b9" }}></i>
        Citas Médicas
      </h2>

      <div className="filtros-citas">
        <input
          type="text"
          placeholder="Buscar por paciente..."
          value={busquedaPaciente}
          onChange={(e) => setBusquedaPaciente(e.target.value)}
          className="input-buscar-paciente"
        />
        <input
          type="text"
          placeholder="Buscar por médico..."
          value={busquedaMedico}
          onChange={(e) => setBusquedaMedico(e.target.value)}
          className="input-buscar-medico"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Médico</th>
            <th>Especialidad</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {citasFiltradas.map((cita, idx) => {
            console.log(cita)
            const paciente = pacientes.find(p => p.id === cita.paciente);
            const medico = medicos.find(m => m.id === cita.medico);
            const fechaObj = new Date(cita.fecha_asignacion);

            return (
              <tr key={idx}>
                <td>{paciente ? `${paciente.usuario.first_name} ${paciente.usuario.last_name}` : "—"}</td>
                <td>{medico ? `${medico.usuario.first_name} ${medico.usuario.last_name}` : "—"}</td>
                <td>{cita.especialidad || "—"}</td>
                <td>{fechaObj.toLocaleDateString("es-CO")}</td>
                <td>{fechaObj.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}</td>
                <td>
                    <span className={`estado ${cita.estado}`}>
                        {cita.estado}
                    </span>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialCitas;
