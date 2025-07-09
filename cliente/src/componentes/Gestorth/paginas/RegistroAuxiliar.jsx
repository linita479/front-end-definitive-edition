// RegistroAuxiliar.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import EtiquetaInput from "../componentes/EtiquetaInput";
import ComboBox from "../componentes/ComboBox";
import Botones from "../componentes/Botones";
import Logo from "../../Homepage/componentes/Logo";
import BusquedaDocumento from "../componentes/BusquedaDocumento";

import "./Registroauxiliar.css";
import "./RegistroMedicoModal.css"; // estilos del modal/spinner

const RegistroAuxiliar = () => {
    /* ───────────── estados ───────────── */
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [errorBusqueda, setErrorBusqueda] = useState("");

    /* spinner de carga */
    const [cargando, setCargando] = useState(false);

    /* modal éxito / error */
    const [modal, setModal] = useState({
        visible: false,
        tipo: "success", // "success" | "error"
        mensaje: "",
    });
    const cerrarModal = () => setModal({ ...modal, visible: false });

    /* react-hook-form */
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    /* ───────────── buscar usuario ───────────── */
    const buscarUsuario = async (nrodoc) => {
        if (!nrodoc) return;
        setCargando(true);
        try {
        const response = await fetch(
            `http://127.0.0.1:8000/buscar_usuario/?nro_doc=${nrodoc}`,
            {
            method: "GET",
            headers: {
                Authorization: `Token ${sessionStorage.getItem("token")}`,
            },
            }
        );

        if (response.ok) {
            const data = await response.json();
            setMostrarFormulario(true);
            setErrorBusqueda("");
            console.log("Usuario encontrado:", data.usuario);
        } else {
            setMostrarFormulario(false);
            setErrorBusqueda("Usuario no encontrado.");
        }
        } catch (error) {
        console.error("Error:", error);
        setErrorBusqueda("Error de red.");
        } finally {
        setTimeout(() => setCargando(false), 800);
        }
    };

    /* ───────────── submit ───────────── */
    const onSubmit = async (data) => {
        console.log("Datos del formulario:", data);
        data.tipo_usuario = "auxiliar";
        console.log("Datos a enviar:", data);

        setCargando(true);
        try {
        const response = await fetch("http://127.0.0.1:8000/actualizar_datos/", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${sessionStorage.getItem("token")}`,
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            console.log("✅ Registro exitoso:", result);

            setModal({
            visible: true,
            tipo: "success",
            mensaje: "¡Registro realizado con éxito!",
            });
            setMostrarFormulario(false);
        } else {
            const err = await response.json();
            throw new Error(err?.detail || "Error al registrar.");
        }
        } catch (error) {
        console.error("Error al registrar el auxiliar:", error);
        setModal({
            visible: true,
            tipo: "error",
            mensaje: error.message || "Hubo un problema. Intenta nuevamente.",
        });
        } finally {
        setTimeout(() => setCargando(false), 800);
        }
    };

    return (
        <div className="josessasa">
        <div className="cont-logo-flex-start">
            <Logo />
        </div>

        <div className="super-contenedor">
            <BusquedaDocumento
            register={register("nro_doc")}
            onClick={() => buscarUsuario(watch("nro_doc"))}
            />
            <div className="aviso-registro-usuario">
                <p>
                    ⚠️ Este formulario permite registrar a un usuario ya existente como auxiliar médico. Asegúrate de haberlo buscado correctamente antes de continuar.
                </p>
            </div>

            {errorBusqueda && <p className="mensaje-error">{errorBusqueda}</p>}

            {mostrarFormulario && (
            <form onSubmit={handleSubmit(onSubmit)} className="formulario-registro">
                    <header className="header-form-personal-medico">
                        <h1 className="header-reGistro-medico-titulo">Registrar auxiliar medico</h1>
                    </header>
                    <div className="contenedor-etiqueta-form-medico">
                        <EtiquetaInput
                        label="Nombre"
                        type="text"
                        placeholder="Nombres completos"
                        register={register("datos_actualizar.first_name", {
                        required: "campo obligatorio",
                        })}
                    />
                    <EtiquetaInput
                        label="Apellidos"
                        type="text"
                        placeholder="Apellidos completos"
                        register={register("datos_actualizar.last_name", {
                        required: "campo obligatorio",
                        })}
                    />
                    </div>
                    <div className="contenedor-etiqueta-form-medico">
                        <EtiquetaInput
                        label="Fecha de expedición"
                        type="date"
                        register={register("datos_actualizar.fecha_exp_doc", {
                        required: "campo obligatorio",
                        })}
                    />
                    <EtiquetaInput
                        label="Lugar de expedición"
                        type="text"
                        placeholder="Lugar de expedición"
                        register={register("datos_actualizar.lugar_exp_doc", {
                        required: "campo obligatorio",
                        })}
                    />
                    </div>
                    <div className="contenedor-etiqueta-form-medico">
                        <EtiquetaInput
                        label="Fecha de nacimiento"
                        type="date"
                        register={register("datos_actualizar.fecha_nacimiento", {
                        required: "campo obligatorio",
                        })}
                    />
                    <EtiquetaInput
                        label="Teléfono"
                        type="text"
                        placeholder="Teléfono"
                        register={register("datos_actualizar.telefono", {
                        required: "campo obligatorio",
                        })}
                    />
                    </div>
                    <div className="contenedor-etiqueta-form-medico">
                        <EtiquetaInput
                        label="Nacionalidad"
                        type="text"
                        placeholder="Nacionalidad"
                        register={register("datos_actualizar.nacionalidad", {
                        required: "campo obligatorio",
                        })}
                    />
                    <EtiquetaInput
                        label="Municipio"
                        type="text"
                        placeholder="Municipio"
                        register={register("datos_actualizar.municipio", {
                        required: "campo obligatorio",
                        })}
                    />
                    </div>
                    <div className="contenedor-etiqueta-form-medico">
                        <ComboBox
                        label="Sexo"
                        register={register("datos_actualizar.sexo")}
                        options={[
                        { value: "", label: "Selecciona una opción" },
                        { value: "M", label: "Masculino" },
                        { value: "F", label: "Femenino" },
                        ]}
                    />

                    <ComboBox
                        label="Estado civil"
                        register={register("datos_actualizar.estado_civil", {
                        required: "campo obligatorio",
                        })}
                        options={[
                        { value: "", label: "Selecciona una opción" },
                        { value: "Soltero", label: "Soltero" },
                        { value: "Casado", label: "Casado" },
                        { value: "Divorciado", label: "Divorciado" },
                        { value: "Viudo", label: "Viudo" },
                        { value: "Union libre", label: "Unión libre" },
                        { value: "Separado", label: "Separado" },
                        ]}
                />
                    </div>
                <div className="contenedor-etiqueta-form-medico-solito">
                    <ComboBox
                        label="Tipo de contrato"
                        register={register("datos_rol.tipo_contrato", {
                        required: "campo obligatorio",
                        })}
                        options={[
                        { value: "", label: "Selecciona una opción" },
                        { value: "1", label: "A término indefinido" },
                        { value: "2", label: "A término fijo" },
                        { value: "3", label: "Por obra o labor" },
                        { value: "4", label: "Ocasional" },
                        { value: "5", label: "Contrato de aprendizaje" },
                        { value: "6", label: "Contrato de prestación de servicios" },
                        { value: "7", label: "Contrato sindical" },
                        ]}
                    />
                </div>

                <div className="botones-centro-registro-auxiliar">
                <Botones name="Registrar" tipo="submit" />
                </div>
            </form>
            )}
        </div>

        {/* spinner de carga */}
        {cargando && (
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
        )}

        {/* modal éxito / error */}
        {modal.visible && (
            <div className="modal-overlay" onClick={cerrarModal}>
            <div className={`modal-card ${modal.tipo}`} onClick={(e) => e.stopPropagation()}>
                {modal.tipo === "success" ? (
                <svg className="modal-icon" viewBox="0 0 24 24" width="48" height="48">
                    <path
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4"
                    />
                    <circle cx="12" cy="12" r="10" fill="none" stroke="#fff" strokeWidth="2" />
                </svg>
                ) : (
                <svg className="modal-icon" viewBox="0 0 24 24" width="48" height="48">
                    <line x1="18" y1="6" x2="6" y2="18" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                    <line x1="6" y1="6" x2="18" y2="18" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="10" fill="none" stroke="#fff" strokeWidth="2" />
                </svg>
                )}

                <h2 className="modal-message">{modal.mensaje}</h2>
                <button className="modal-btn" onClick={cerrarModal}>
                Aceptar
                </button>
            </div>
            </div>
        )}
        </div>
    );
};

export default RegistroAuxiliar;







// import React from "react";
// import { useState } from "react";
// import EtiquetaInput from "../componentes/EtiquetaInput";
// import ComboBox from "../componentes/ComboBox";
// import Botones from "../componentes/Botones";
// import { useForm } from "react-hook-form";
// import './Registroauxiliar.css'
// import Logo from "../../Homepage/componentes/Logo";
// import BusquedaDocumento from "../componentes/BusquedaDocumento";
// const RegistroAuxiliar = () =>{
//     const [mostrarFormulario, setMostrarFormulario] = useState(false);
//     const [errorBusqueda, setErrorBusqueda] = useState("");
//     const { register , handleSubmit, watch, formState: { errors } } = useForm();
//     const buscarUsuario = async (nrodoc)=>{
//         try{
//             const response = await fetch(`http://127.0.0.1:8000/buscar_usuario/?nro_doc=${nrodoc}`,{
//                 method: "GET",
//                 headers:{
//                     "Authorization": `Token ${sessionStorage.getItem("token")}`,
//                 },
//             });
//             if (response.ok){
//                 const data = await response.json();
//                 setMostrarFormulario(true); 
//                 setErrorBusqueda("");
//                 console.log("Usuario encontrado:", data.usuario);
//             }else{
//                 setMostrarFormulario(false);
//                 setErrorBusqueda("Usuario no encontrado.");
//             }

//         }catch (error) {
//             console.error("Error:", error);
//             setErrorBusqueda("Error de red.");
//         }
//     }
//     const onSubmit = async(data) => {
//         console.log("Datos del formulario:", data);
//         data.tipo_usuario = "auxiliar";
//         console.log("Datos a enviar:", data);
//         try {
//             const response = await fetch("http://127.0.0.1:8000/actualizar_datos/", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Token ${sessionStorage.getItem("token")}`,
//                 },
//                 body: JSON.stringify(data),
//             });
//             const result = await response.json();
//             console.log("✅ Registro exitoso:", result);
//         } catch (error) {
//             console.error("Error al registrar el auxiliar:", error);
//         }
//     };

//     return(
//         <>
//         <div className="josessasa">
//             <div className="cont-logo-flex-start">
//                 <Logo/>
//             </div>
//             <div className="super-contenedor">
//         <BusquedaDocumento
//         register={register("nro_doc")}
//         onClick={() => buscarUsuario(watch("nro_doc"))}
//         />

//             {mostrarFormulario && 
//                 <form onSubmit={handleSubmit(onSubmit)} className="formulario-registro">
//                 <div className="grid-formulario">
//                     <EtiquetaInput label="Nombre" type="text" placeholder="Nombres completos" register={register("datos_actualizar.first_name", { required: "campo obligatorio" })} />
//                     <EtiquetaInput label="Apellidos" type="text" placeholder="Apellidos completos" register={register("datos_actualizar.last_name", { required: "campo obligatorio" })} />
                    
//                     <EtiquetaInput label="Fecha de expedición" type="date" placeholder="Fecha de expedición" register={register("datos_actualizar.fecha_exp_doc", { required: "campo obligatorio" })} />
//                     <EtiquetaInput label="Lugar de expedición" type="text" placeholder="Lugar de expedición" register={register("datos_actualizar.lugar_exp_doc", { required: "campo obligatorio" })} />

//                     <EtiquetaInput label="Fecha de nacimiento" type="date" placeholder="Fecha de nacimiento" register={register("datos_actualizar.fecha_nacimiento", { required: "campo obligatorio" })} />
//                     <EtiquetaInput label="Teléfono" type="text" placeholder="Teléfono" register={register("datos_actualizar.telefono", { required: "campo obligatorio" })} />

//                     <EtiquetaInput label="Nacionalidad" type="text" placeholder="Nacionalidad" register={register("datos_actualizar.nacionalidad", { required: "campo obligatorio" })} />
//                     <EtiquetaInput label="Municipio" type="text" placeholder="Municipio" register={register("datos_actualizar.municipio", { required: "campo obligatorio" })} />

//                     <ComboBox label="Sexo" register={register("datos_actualizar.sexo")} options={[
//                     { value: '', label: 'Selecciona una opción' },
//                     { value: 'M', label: 'Masculino' },
//                     { value: 'F', label: 'Femenino' }
//                     ]} />

//                             <ComboBox label="Estado civil" register={register("datos_actualizar.estado_civil", { required: "campo obligatorio" })} options={[
//                             { value: '', label: 'Selecciona una opción' },
//                             { value: 'Soltero', label: 'Soltero' },
//                             { value: 'Casado', label: 'Casado' },
//                             { value: 'Divorciado', label: 'Divorciado' },
//                             { value: 'Viudo', label: 'Viudo' },
//                             { value: 'Union libre', label: 'Unión libre' },
//                             { value: 'Separado', label: 'Separado' }
//                             ]} />
//                         </div>
//                         <div className="contenedor-etiqueta-form-medico-solito">
//                             <ComboBox label="Tipo de contrato" register={register("datos_rol.tipo_contrato", { required: "campo obligatorio" })} options={[
//                             { value: '', label: 'Selecciona una opción' },
//                             { value: '1', label: 'A término indefinido' },
//                             { value: '2', label: 'A término fijo' },
//                             { value: '3', label: 'Por obra o labor' },
//                             { value: '4', label: 'Ocasional' },
//                             { value: '5', label: 'Contrato de aprendizaje' },
//                             { value: '6', label: 'Contrato de prestación de servicios' },
//                             { value: '7', label: 'Contrato sindical' }
//                             ]} />
//                         </div>
//                     <div className="botones-centro-registro-auxiliar">
//                         <Botones name="Registrar" tipo="submit" />
//                     </div>
//                 </form>
//                 }
//             </div>
//         </div>
//         </>
//     );

// }

// export default RegistroAuxiliar;