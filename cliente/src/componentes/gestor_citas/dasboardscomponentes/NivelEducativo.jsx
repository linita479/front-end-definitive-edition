import { Pie } from "react-chartjs-2";

const NivelEducativoChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: [
          "#4F46E5",
          "#22C55E",
          "#FACC15",
          "#EF4444",
          "#06B6D4"
        ]
      }
    ]
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-gray-700 font-semibold mb-2">Nivel Educativo</h3>
      <Pie data={chartData} />
    </div>
  );
};

export default NivelEducativoChart