import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EtiquetaInput from "../objetos/EtiquetaInput";
import ComboBox from "../objetos/ComboBox";
import Botones from "../objetos/Botones";
import BusquedaDocumento from "../Gestorth/componentes/BusquedaDocumento";
import "./modal_registrar_cita.css";

const ModalRegistrarCita = ({ isOpen, isClose, dia, hora, medicoSeleccionado }) => {
  const { register, handleSubmit, watch, setValue } = useForm();

  const [listaMedicos, setListaMedicos] = useState([]);
  const [centros, setCentros] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [listaPacientes, setListaPacientes] = useState([]);
  const [busquedaPaciente, setBusquedaPaciente] = useState("");
  const [pacientesFiltrados, setPacientesFiltrados] = useState([]);

  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [errorBusqueda, setErrorBusqueda] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [resMedicos, resCentros, resServicios] = await Promise.all([
          fetch("http://127.0.0.1:8000/lista/medicos/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${sessionStorage.getItem("token")}`
            }
          }),
          fetch("http://127.0.0.1:8000/api/gerente/centro_medico/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${sessionStorage.getItem("token")}`,
            }
          }),
          fetch("http://127.0.0.1:8000/api/gerente/servicio/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${sessionStorage.getItem("token")}`,
            }
          }),
        ]);

        const resPacientes = await fetch("http://127.0.0.1:8000/lista/pacientes/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${sessionStorage.getItem("token")}`
          }
        });

        setListaPacientes(await resPacientes.json());
        setListaMedicos(await resMedicos.json());
        setCentros(await resCentros.json());
        setServicios(await resServicios.json());
      } catch (error) {
        console.error("❌ Error cargando datos:", error);
      }
    };

    cargarDatos();
  }, []);

  const convertirHora = (horaTexto) => {
    const [hora, minutos] = horaTexto.match(/\d+/g);
    const esPM = horaTexto.toLowerCase().includes("p. m.");
    let horas24 = parseInt(hora);
    if (esPM && horas24 !== 12) horas24 += 12;
    else if (!esPM && horas24 === 12) horas24 = 0;
    return { horas: horas24, minutos: parseInt(minutos) };
  };

  const formatearFechaYHora = (dia, horaTexto) => {
    const { horas, minutos } = convertirHora(horaTexto);
    const fecha = new Date(dia);
    fecha.setHours(horas, minutos, 0, 0);
    return fecha.toISOString();
  };

  const onSubmit = async (data) => {
    const fechaAsignacion = formatearFechaYHora(dia, hora);
    const fechaSolicitud = new Date().toISOString();
    const medicoId = medicoSeleccionado ? medicoSeleccionado.id : parseInt(data.medico);

    const payload = {
      nro_doc: data.nro_doc,
      medico_id: medicoId,
      servicio_id: data.servicios,
      centro_medico_id: data.centro_medico,
      fecha_asignacion: fechaAsignacion,
      fecha_solicitud: fechaSolicitud,
      estado: "pendiente",
      especialidad: data.especialidad,
      tipo_atencion: data.tipo_atencion?.toLowerCase()
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/gestor-cita/cita/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${sessionStorage.getItem("token")}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setRegistroExitoso(true);
        isClose();
      } else {
        setErrorBusqueda("No se pudo registrar la cita, por favor intenta de nuevo.");
      }
    } catch (error) {
      console.error("❌ Error al registrar cita:", error);
      setErrorBusqueda("Error en el servidor, por favor intenta más tarde.");
    }
  };

  if (!isOpen || !dia || !hora) return null;

  return (
    <div className="modal-fondo">
      <div className="modal-cita">
        <button className="cerrar-modal" onClick={isClose}>✖</button>
        <h2 className="titulo-modal-cita">
          <i className="fas fa-calendar-plus icono-cita"></i> Registrar Cita Médica
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="form-crear-cita-medica">
          <div className="busqueda-medico">
            <div className="busqueda-wrapper">
              <div className="icono-busqueda">
                <svg className="svg-busqueda" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>

              <input
                type="text"
                className="input-busqueda"
                placeholder="Buscar paciente por nombre..."
                value={busquedaPaciente}
                onChange={(e) => {
                  const valor = e.target.value;
                  setBusquedaPaciente(valor);
                  const filtro = listaPacientes.filter(p =>
                    `${p.usuario.first_name} ${p.usuario.last_name}`.toLowerCase().includes(valor.toLowerCase())
                  );
                  setPacientesFiltrados(filtro);
                }}
                onBlur={() => setTimeout(() => setBusquedaPaciente(""), 200)}
              />

              <button className="btn-buscar">Buscar</button>
            </div>

            {busquedaPaciente.trim() && pacientesFiltrados.length > 0 && (
              <ul className="busqueda-medico__lista">
                {pacientesFiltrados.map((paciente) => (
                  <li
                    key={paciente.id}
                    onClick={() => {
                      setBusquedaPaciente("");
                      setValue("nro_doc", paciente.usuario.nro_doc);
                    }}
                  >
                    {paciente.usuario.first_name} {paciente.usuario.last_name}
                  </li>
                ))}
              </ul>
            )}
            {watch("nro_doc") && (
              <div className="paciente-seleccionado-banner">
                <span>
                  👤 <strong>{pacientesFiltrados.find(p => p.usuario.nro_doc === watch("nro_doc"))?.usuario.first_name} {pacientesFiltrados.find(p => p.usuario.nro_doc === watch("nro_doc"))?.usuario.last_name}</strong> –
                  <em> Documento: {watch("nro_doc")} </em>
                </span>
                <button className="btn-limpiar-medico" onClick={() => setValue("nro_doc", "")}>Quitar paciente</button>
              </div>
            )}
          </div>

          <EtiquetaInput label="Especialidad" type="text" register={register("especialidad")} />
          <ComboBox label="Tipo de Atención" register={register("tipo_atencion")} options={[{ value: "Presencial", label: "Presencial" }, { value: "Virtual", label: "Virtual" }]} />

          {!medicoSeleccionado && (
            <ComboBox
              label="Médico"
              register={register("medico")}
              options={listaMedicos.map((medico) => ({
                value: medico.id,
                label: `${medico.usuario.first_name} ${medico.usuario.last_name}`
              }))}
            />
          )}

          <ComboBox
            label="Centro médico"
            register={register("centro_medico")}
            options={centros.map((centro) => ({
              value: centro.nit,
              label: centro.nombre
            }))}
          />

          <ComboBox
            label="Servicios"
            register={register("servicios")}
            options={servicios.map((servicio) => ({
              value: servicio.capitulo,
              label: servicio.nombre
            }))}
          />

          <button className="btn-guardar-cita-medica">Guardar</button>
        </form>

        {registroExitoso && (
          <div className="modal-registro-exitoso">
            <div className="header-modal-registro-exitoso">
              <div className="image image-exito">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="icono-exito">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="content-exito-hv">
                <span className="title-exito-texto">Registro exitoso</span>
                <p className="message-info-registro-exito">La cita médica ha sido registrada correctamente. Puedes continuar con otros registros si lo deseas.</p>
              </div>
              <div className="barra-progreso"></div>
              <div className="actions">
                <button className="desactivate-exito" type="button" onClick={() => setRegistroExitoso(false)}>Cerrar</button>
              </div>
            </div>
          </div>
        )}

        {errorBusqueda && (
          <div className="card modal-usuario-no-encontrado">
            <div className="header-modal-usuario-no-encontrado">
              <div className="image">
                <svg aria-hidden="true" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" fill="none">
                  <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" strokeLinejoin="round" strokeLinecap="round"></path>
                </svg>
              </div>
              <div className="content-usuario-no-encontrado-hv">
                <span className="title-usuario-noencontrado-texto">{errorBusqueda}</span>
                <p className="message-info-usuario-no-encontrado">Lo sentimos, ocurrió un problema al registrar la cita. Intenta nuevamente.</p>
              </div>
              <div className="actions">
                <button className="desactivate" type="button" onClick={() => setErrorBusqueda("")}>Cerrar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalRegistrarCita;






// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import EtiquetaInput from "../objetos/EtiquetaInput";
// import ComboBox from "../objetos/ComboBox";
// import Botones from "../objetos/Botones";
// import BusquedaDocumento from "../Gestorth/componentes/BusquedaDocumento";
// import "./modal_registrar_cita.css";

// const ModalRegistrarCita = ({ isOpen, isClose, dia, hora, medicoSeleccionado }) => {
//   const { register, handleSubmit, watch, setValue } = useForm();

//   const [listaMedicos, setListaMedicos] = useState([]);
//   const [centros, setCentros] = useState([]);
//   const [servicios, setServicios] = useState([]);
//   const [listaPacientes, setListaPacientes] = useState([]);
// const [busquedaPaciente, setBusquedaPaciente] = useState("");
// const [pacientesFiltrados, setPacientesFiltrados] = useState([]);


//   useEffect(() => {
//     const cargarDatos = async () => {
//       try {
//         const [resMedicos, resCentros, resServicios] = await Promise.all([
//           fetch("http://127.0.0.1:8000/lista/medicos/", {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Token ${sessionStorage.getItem("token")}`
//             }
//           }),
//           fetch("http://127.0.0.1:8000/api/gerente/centro_medico/", {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Token ${sessionStorage.getItem("token")}`,
//             }
//           }),
//           fetch("http://127.0.0.1:8000/api/gerente/servicio/", {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Token ${sessionStorage.getItem("token")}`,
//             }
//           }),
//         ]);
//         const resPacientes = await fetch("http://127.0.0.1:8000/lista/pacientes/", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${sessionStorage.getItem("token")}`
//         }
//       });

//       setListaPacientes(await resPacientes.json());
//         setListaMedicos(await resMedicos.json());
//         setCentros(await resCentros.json());
//         setServicios(await resServicios.json());
        
//       } catch (error) {
//         console.error("❌ Error cargando datos:", error);
//       }
//     };

//     cargarDatos();
//   }, []);

//   const convertirHora = (horaTexto) => {
//     const [hora, minutos] = horaTexto.match(/\d+/g);
//     const esPM = horaTexto.toLowerCase().includes("p. m.");
//     let horas24 = parseInt(hora);
//     if (esPM && horas24 !== 12) horas24 += 12;
//     else if (!esPM && horas24 === 12) horas24 = 0;
//     return { horas: horas24, minutos: parseInt(minutos) };
//   };

//   const formatearFechaYHora = (dia, horaTexto) => {
//     const { horas, minutos } = convertirHora(horaTexto);
//     const fecha = new Date(dia);
//     fecha.setHours(horas, minutos, 0, 0);
//     return fecha.toISOString();
//   };

//   const buscarUsuario = async (doc) => {
//     console.log("📎 Buscando usuario con documento:", doc);
//   };

//   const onSubmit = async (data) => {
//     const fechaAsignacion = formatearFechaYHora(dia, hora);
//     const fechaSolicitud = new Date().toISOString();
//     const medicoId = medicoSeleccionado ? medicoSeleccionado.id : parseInt(data.medico);

//     const payload = {
//       nro_doc: data.nro_doc,
//       medico_id: medicoId,
//       servicio_id: data.servicios,
//       centro_medico_id: data.centro_medico,
//       fecha_asignacion: fechaAsignacion,
//       fecha_solicitud: fechaSolicitud,
//       estado: "pendiente",
//       especialidad: data.especialidad,
//       tipo_atencion: data.tipo_atencion?.toLowerCase()
//     };

//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/gestor-cita/cita/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${sessionStorage.getItem("token")}`
//         },
//         body: JSON.stringify(payload)
//       });

//       const result = await response.json();
//       console.log("✅ Cita creada:", result);
//       isClose();
//     } catch (error) {
//       console.error("❌ Error al registrar cita:", error);
//     }
//   };

//   if (!isOpen || !dia || !hora) return null;

//   return (
//     <div className="modal-fondo">
//       <div className="modal-cita">
//         <button className="cerrar-modal" onClick={isClose}>✖</button>
//         <h2 className="titulo-modal-cita">
//           <i className="fas fa-calendar-plus icono-cita"></i> Registrar Cita Médica
//         </h2>

//         <form onSubmit={handleSubmit(onSubmit)} className="form-crear-cita-medica">
// <div className="busqueda-medico">
//   <div className="busqueda-wrapper">
//     <div className="icono-busqueda">
//       <svg
//         className="svg-busqueda"
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 20 20"
//         fill="currentColor"
//       >
//         <path
//           fillRule="evenodd"
//           d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 
//             4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//           clipRule="evenodd"
//         />
//       </svg>
//     </div>

//     <input
//       type="text"
//       className="input-busqueda"
//       placeholder="Buscar paciente por nombre..."
//       value={busquedaPaciente}
//       onChange={(e) => {
//         const valor = e.target.value;
//         setBusquedaPaciente(valor);
//         const filtro = listaPacientes.filter(p =>
//           `${p.usuario.first_name} ${p.usuario.last_name}`
//             .toLowerCase()
//             .includes(valor.toLowerCase())
//         );
//         setPacientesFiltrados(filtro);
//       }}
//       onBlur={() => setTimeout(() => setBusquedaPaciente(""), 200)}
//     />

//     <button className="btn-buscar">Buscar</button>
//   </div>

//   {busquedaPaciente.trim() && pacientesFiltrados.length > 0 && (
//     <ul className="busqueda-medico__lista">
//       {pacientesFiltrados.map((paciente) => (
//         <li
//           key={paciente.id}
//           onClick={() => {
//             setBusquedaPaciente("");
//             setValue("nro_doc", paciente.usuario.nro_doc);
//           }}
//         >
//           {paciente.usuario.first_name} {paciente.usuario.last_name}
//         </li>
//       ))}
//     </ul>
//         )}
//         {watch("nro_doc") && (
//           <div className="paciente-seleccionado-banner">
//             <span>
//               👤 <strong>{pacientesFiltrados.find(p => p.usuario.nro_doc === watch("nro_doc"))?.usuario.first_name} {pacientesFiltrados.find(p => p.usuario.nro_doc === watch("nro_doc"))?.usuario.last_name}</strong> – 
//               <em> Documento: {watch("nro_doc")} </em>
//             </span>
//             <button className="btn-limpiar-medico" onClick={() => setValue("nro_doc", "")}>
//               Quitar paciente
//             </button>
//           </div>
//         )}

//       </div>

//           <EtiquetaInput label="Especialidad" type="text" register={register("especialidad")} /> 
//           <ComboBox label="Tipo de Atención" register={register("tipo_atencion")} options={[ { value: "Presencial", label: "Presencial" }, { value: "Virtual", label: "Virtual" } ]} />

//           {!medicoSeleccionado && (
//             <ComboBox
//               label="Médico"
//               register={register("medico")}
//               options={listaMedicos.map((medico) => ({
//                 value: medico.id,
//                 label: `${medico.usuario.first_name} ${medico.usuario.last_name}`
//               }))}
//             />
//           )}

//           <ComboBox
//             label="Centro médico"
//             register={register("centro_medico")}
//             options={centros.map((centro) => ({
//               value: centro.nit,
//               label: centro.nombre
//             }))}
//           />

//           <ComboBox
//             label="Servicios"
//             register={register("servicios")}
//             options={servicios.map((servicio) => ({
//               value: servicio.capitulo,
//               label: servicio.nombre
//             }))}
//           />

//           <button className="btn-guardar-cita-medica">Guardar</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ModalRegistrarCita;
