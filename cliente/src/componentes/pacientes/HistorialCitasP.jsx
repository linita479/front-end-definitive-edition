import { useEffect, useState } from "react";
// import "./tabla_citas.css";

const HistorialCitasP = ({ medicoSeleccionado }) => {
  const [citas, setCitas] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [busquedaMedico, setBusquedaMedico] = useState("");

  const nro_doc = sessionStorage.getItem("nro_doc");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const query = new URLSearchParams();
        query.append("nro_doc", nro_doc); // ✅ solo citas del paciente
        const respCitas = await fetch(`http://127.0.0.1:8000/api/gestor-cita/cita/?${query}`, {
          headers: { Authorization: `Token ${sessionStorage.getItem("token")}` }
        });

        const respMedicos = await fetch("http://127.0.0.1:8000/lista/medicos/", {
          headers: { Authorization: `Token ${sessionStorage.getItem("token")}` }
        });

        const [dataCitas, dataMedicos] = await Promise.all([
          respCitas.json(),
          respMedicos.json()
        ]);

        setCitas(dataCitas);
        setMedicos(dataMedicos);
      } catch (err) {
        console.error("❌ Error cargando historial:", err);
      }
    };

    cargarDatos();
  }, []);

  const citasFiltradas = citas.filter((cita) => {
    const medico = medicos.find((m) => m.id === cita.medico);
    const nombreMedico = medico
      ? `${medico.usuario.first_name} ${medico.usuario.last_name}`.toLowerCase()
      : "";
    return nombreMedico.includes(busquedaMedico.toLowerCase());
  });

  return (
    <div className="tabla-citas">
      <h2>📋 Historial de Citas</h2>

      <div className="filtros-citas">
        <input
          type="text"
          placeholder="🔍 Buscar por médico..."
          value={busquedaMedico}
          onChange={(e) => setBusquedaMedico(e.target.value)}
        />
      </div>

      {citasFiltradas.length === 0 ? (
        <p className="historial-citas__mensaje">🗓️ No se encontraron citas.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Médico</th>
              <th>Especialidad</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {citasFiltradas.map((cita, idx) => {
              const medico = medicos.find((m) => m.id === cita.medico);
              const fechaObj = new Date(cita.fecha_asignacion);

              return (
                <tr key={idx}>
                  <td>
                    {medico
                      ? `${medico.usuario.first_name} ${medico.usuario.last_name}`
                      : "—"}
                  </td>
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
      )}
    </div>
  );
};

export default HistorialCitasP;
