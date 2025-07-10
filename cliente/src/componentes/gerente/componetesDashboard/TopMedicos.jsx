import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TopMedicos = ({ medicos }) => {
  const labels = medicos.map(item => item.medico);
  const data = medicos.map(item => item.citas);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Citas atendidas",
        data,
        backgroundColor: "#3b82f6"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      }
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h3>👨‍⚕️ Top 5 Médicos por Citas</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TopMedicos;
