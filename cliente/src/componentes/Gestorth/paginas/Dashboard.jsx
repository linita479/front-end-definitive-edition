import { useEffect , useState } from "react";
import KPICard from "../../gestor_citas/dasboardscomponentes/KPICard";
import NivelEducativoChart from "../../gestor_citas/dasboardscomponentes/NivelEducativo";
import UsuariosPorRol from "../../gerente/componetesDashboard/UsuariosPorRol";
const DashboardGestor = () => {
  const [datos, setDatos] = useState({});

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/gestor_th/dashboard_gestor_th/?nro_doc=${sessionStorage.getItem("nro_doc")}`)
      .then((res) => res.json())
      .then(setDatos);
   const cargarDashboard = async () => {
      try {
        const resp = await fetch("http://127.0.0.1:8000/api/gerente/dashboard-admin/", {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("token")}`
          }
        });
        const data = await resp.json();
        console.log(data);
        setDashboardData(data);
      } catch (error) {
        console.error("❌ Error cargando dashboard:", error);
      }
    };

    cargarDashboard();   
  }, []);

  return (
    <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
       <UsuariosPorRol datos={dashboardData.usuarios_por_rol}/>
      <KPICard label="Hojas de Vida" value={datos.total_hojas_de_vida} icon={"📄"} />
      {/* <MunicipiosTable data={datos.municipios_stats || {}} /> */}
      <NivelEducativoChart data={datos.nivel_educativo_stats || {}} />
    </div>
  );
};
export default DashboardGestor