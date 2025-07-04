import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import EtiquetaInput from "../objetos/EtiquetaInput";
import Botones from "../objetos/Botones";
import ContenedorChPass from "./ContenedorChPass";
const ContenedorVerifPass = () => {
    const { register, handleSubmit, setError,formState: { errors } } = useForm();
    const [token, setToken] = useState("");
    function verificarCodigo(codigo) {
        const url = 'http://127.0.0.1:8000/restaurar_contrasena/';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ codigo_verificacion: codigo.codigo_verificacion })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la verificación');
            }
            return response.json();
        })
        .then(data => {
            console.log('Éxito:', data.token);
            setToken(data.token);
        })
        .catch(error => {
            console.error('Error:', error);
            setError("codigo_verificacion", { type: "server", message: "Código de verificación inválido o expirado" });
        });
    }

    const onSubmit = (data) => {
        console.log("Datos enviados:", data);
        verificarCodigo(data);
    };
    return (
        <div className="solicitud-contrasena">
            <h1>Solicitud de Contraseña</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <EtiquetaInput
                    label="Codigo de Verificación"
                    type="text"
                    placeholder="Ingrese su código de verificación"
                    register={register("codigo_verificacion", { required: "Este campo es obligatorio" })}
                />
                {errors.codigo_verificacion && <span className="error">{errors.codigo_verificacion.message}</span>}
                <Botones texto="Enviar" tipo="submit" />
            </form>
            {token && <ContenedorChPass token={token} />}
        </div>
    );
}
export default ContenedorVerifPass;