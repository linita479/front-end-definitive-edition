import React from "react";
import EtiquetaInput from "../objetos/EtiquetaInput";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Botones from "../objetos/Botones";
import './solicitudcontrasena.css'

const SolicitudContraseña = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        console.log("Datos enviados:", data);
        try {
            const response = await fetch("http://127.0.0.1:8000/solicitar_contraseña/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const result = await response.json();
                console.error("Error en la respuesta del servidor:", result);
                setError("nro_doc", { type: "server", message: "Error al enviar la solicitud" });
                return;
            }

            console.log("Éxito:", await response.json());
            navigate("/login");
        } catch (error) {
            console.error("Error:", error);
            setError("nro_doc", { type: "server", message: "Error de conexión con el servidor" });
        }
    };

    return (
        <div className="solicitud-contrasena">
            <form onSubmit={handleSubmit(onSubmit)} className="form-olvido-contrasena">
                <header className="form-olvido-contrasena-header">
                    <h1 className="header-form-olvido-contrasena-titulo">Solicitud contraseña</h1>
                </header>
                <EtiquetaInput
                    label="Número de Documento"
                    type="number"
                    placeholder="Ingrese su número de documento"
                    register={register("nro_doc", { required: "Este campo es obligatorio" })}
                />
                {errors.nro_doc && <span className="error">{errors.nro_doc.message}</span>}
                <Botones type="submit" name="Enviar" />
            </form>
        </div>
    );
}



export default SolicitudContraseña;