import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const UsuariosPorRol = ({ datos }) => {
  const colores = ["#2563eb", "#059669", "#f59e0b", "#ef4444", "#6b21a8"];

  const data = {
    labels: Object.keys(datos),
    datasets: [
      {
        label: "Usuarios por Rol",
        data: Object.values(datos),
        backgroundColor: colores,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h3>👥 Distribución de usuarios por rol</h3>
      <Doughnut data={data} />
    </div>
  );
};

export default UsuariosPorRol;
