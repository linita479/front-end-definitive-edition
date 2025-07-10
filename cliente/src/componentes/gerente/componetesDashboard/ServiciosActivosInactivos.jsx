import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ServiciosActivosInactivos = ({ activos, inactivos }) => {
  const data = {
    labels: ["Activos", "Inactivos"],
    datasets: [
      {
        label: "Servicios",
        data: [activos, inactivos],
        backgroundColor: ["#16a34a", "#dc2626"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", marginTop: "30px" }}>
      <h3>🩺 Estado de Servicios</h3>
      <Pie data={data} />
    </div>
  );
};

export default ServiciosActivosInactivos;
