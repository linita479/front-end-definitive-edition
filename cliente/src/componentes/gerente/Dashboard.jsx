import React, { useEffect, useState } from "react";
import UsuariosPorRol from "./componetesDashboard/UsuariosPorRol";
import ServiciosActivosInactivos from "./componetesDashboard/ServiciosActivosInactivos";
import TopMedicos from "./componetesDashboard/TopMedicos";
import CitasPorMes from "./componetesDashboard/CitasPorMes";
import RegimenYEpsFrecuentes from "./componetesDashboard/RegimenYEpsFrecuentes";
import EstadoCitas from "./componetesDashboard/EstadoCitas";


const Dashboard = () =>{
    const [dashboardData,setDashboardData] = useState(null)
    useEffect(() => {
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
if(dashboardData === null){
    return (
        <>
                <div className="modal-overlay">
                    <div className="wrapper">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bouncer">
                                <div className="circle"></div>
                                <div className="shadow"></div>
                            </div>
                        ))}
                    </div>
                </div>
        </>
    )
}


    return(
        <>
        <UsuariosPorRol datos={dashboardData.usuarios_por_rol}/>
        

        <ServiciosActivosInactivos
        activos={dashboardData.servicios_activos}
        inactivos={dashboardData.servicios_inactivos}
        />
        <TopMedicos medicos={dashboardData.top_medicos} />
        

<CitasPorMes citasMes={dashboardData.citas_por_mes} />
        <RegimenYEpsFrecuentes
  regimen={dashboardData.regimen_frecuente}
  eps={dashboardData.eps_frecuentes}
/>


<EstadoCitas estados={dashboardData.estado_citas} />

        </>
    )

}

export default Dashboard