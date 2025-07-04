import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import EtiquetaInput from "../objetos/EtiquetaInput";
import Botones from "../objetos/Botones";

const ContenedorChPass = ({token}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    console.log("Token recibido:", token);
    const cambiarContraseña = async (datos) => {
        datos.restaurar = false; // Asegúrate de que el backend espera este campo
        console.log("Datos a enviar:", datos);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/usuario/cambiar_contrasena/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify(datos)
            });
            if (!response.ok) {
                throw new Error('Error al cambiar la contraseña');
            }
            const data = await response.json();
            console.log('Éxito:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onSubmit = (data) => {
        console.log("Datos enviados:", data);
        cambiarContraseña(data);
    };
    return (
        <div className="contenedor-chpass">
            <h1>Cambiar Contraseña</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <EtiquetaInput
                    label="Nueva Contraseña"
                    type="password"
                    placeholder="Ingrese su nueva contraseña"
                    register={register("nueva_contrasena", { required: "Este campo es obligatorio" })}
                />
                {errors["nueva_contrasena"] && <span className="error">{errors["nueva_contrasena"].message}</span>}
                <EtiquetaInput
                    label="Confirmar Nueva Contraseña"
                    type="password"
                    placeholder="Confirme su nueva contraseña"
                    register={register("confirmar_nueva_contrasena", { required: "Este campo es obligatorio" })}
                />
                {errors["confirmar_nueva_contrasena"] && <span className="error">{errors["confirmar_nueva_contrasena"].message}</span>}
                <Botones texto="Cambiar Contraseña" tipo="submit" />
            </form>
        </div>
    );
}
export default ContenedorChPass;