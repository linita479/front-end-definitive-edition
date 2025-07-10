import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Filler);

const CitasPorMes = ({ citasMes }) => {
  const labels = Object.keys(citasMes);
  const data = Object.values(citasMes);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Citas por Mes",
        data,
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderColor: "#3b82f6",
        tension: 0.3,
        pointBackgroundColor: "#1e40af"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20
        }
      }
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto" }}>
      <h3>📅 Tendencia de Citas por Mes</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default CitasPorMes;
