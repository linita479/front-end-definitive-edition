import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RegimenYEpsFrecuentes = ({ regimen, eps }) => {
  const colores = ["#2563eb", "#059669", "#f59e0b", "#ef4444", "#6b21a8", "#0d9488", "#f43f5e", "#7c3aed"];

  const datosRegimen = {
    labels: Object.keys(regimen),
    datasets: [
      {
        label: "Regímenes",
        data: Object.values(regimen),
        backgroundColor: colores.slice(0, Object.keys(regimen).length)
      }
    ]
  };

  const datosEPS = {
    labels: Object.keys(eps),
    datasets: [
      {
        label: "EPS",
        data: Object.values(eps),
        backgroundColor: colores.slice(0, Object.keys(eps).length)
      }
    ]
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "40px", margin: "40px 0" }}>
      <div style={{ width: "400px" }}>
        <h3>📊 Frecuencia por Régimen</h3>
        <Bar data={datosRegimen} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>
      <div style={{ width: "400px" }}>
        <h3>🏥 Frecuencia por EPS</h3>
        <Bar data={datosEPS} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </div>
    </div>
  );
};

export default RegimenYEpsFrecuentes;
