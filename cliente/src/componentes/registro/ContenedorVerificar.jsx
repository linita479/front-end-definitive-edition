import React from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom"
import EtiquetaInput from "../objetos/EtiquetaInput";
import Botones from "../objetos/Botones";
import Logo from '../Homepage/componentes/Logo'
import './Verificar.css'
const ContenedorVerificar = () => {
    const { register, handleSubmit,setError, formState: { errors } } = useForm();
    const navigate = useNavigate();
    async function verificar(datos){
        const url = "http://127.0.0.1:8000/activar_usuario/"
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });
        const result = await response.json();
        if (response.ok) {
            console.log("Usuario verificado exitosamente:", result);
            navigate("/login");
            return;
        }
        setError("codigo_verificacion" , {
            type: "manual",
            message: result.error
            
        });
        console.log(result);
    }

    const onSubmit = (data) => {
        console.log(data)
        verificar(data);
    };

    return (
        <div className="contenedor-verificar">
            <Logo />
            <div className="verificar">
                {/* <h1>Verifica tu cuenta</h1>
                <p>Ingrese el codigo</p> */}
                <div className="verificar-inputs">
                    <form onSubmit={handleSubmit(onSubmit)} className="verificar-cuenta-contenedor">
                        <header className="header-verificar-cuenta">
                            <h1 className="header-verificar-cuenta-titulo">Verificar cuenta</h1>
                        </header>
                        <EtiquetaInput register={register("nro_doc")} label="Número de Documento" type="number" placeholder="Ingrese su número de documento" />
                        <EtiquetaInput register={register("codigo_verificacion", { required: "Este campo es obligatorio", pattern: { value: /^\d{6}$/, message: "El código debe contener exactamente 6 dígitos" } })} label="Código de Verificación" type="text" placeholder="Código de verificación" />
                        {errors.codigo_verificacion && <span className="error">{errors.codigo_verificacion.message}</span>}
                        <Botones name="Verificar" type="submit" />
                    </form>
                    
                </div>
            </div>
        </div>
    );
}

export default ContenedorVerificar;