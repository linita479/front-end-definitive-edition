import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const EstadoCitas = ({ estados }) => {
  const colores = ["#16a34a", "#facc15", "#dc2626"];
  const labels = Object.keys(estados);
  const data = Object.values(estados);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Estado de Citas",
        data,
        backgroundColor: colores.slice(0, labels.length),
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h3>📅 Estado de las Citas</h3>
      <Doughnut data={chartData} />
    </div>
  );
};

export default EstadoCitas;
