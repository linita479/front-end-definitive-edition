import { Form } from "react-router-dom";
import { useForm } from "react-hook-form";
import Mensaje from "./Mensaje";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Formulario.css"
import './FormularioRoles.css'
import Botones from "../objetos/Botones";
import Logo from "../Homepage/componentes/Logo";
import emailjs from '@emailjs/browser';

const FormularioRoles = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const navigate = useNavigate();
    const onSubmit = (data) => {
        console.log(data);
        data["is_active"] = false; // Agregar el campo is_active
        data["username"] = data.nro_doc; // Asignar nro_doc a username
        // Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo a una API
        const url = "http://127.0.0.1:8000/registrar/roles";
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            if (result.nro_doc == 'user with this nro doc already exists.') {
                console.error("Error en la respuesta del servidor:", result);
                    setError("nro_doc", { type: "server", message: "El número de identificación ya está registrado" });
                
            } 
            if (result.email == 'Enter a valid email address.') {
                console.error("Error en la respuesta del servidor:", result);
                setError("email", { type: "server", message: "El correo electrónico invalido" });
            }
            else {
                emailjs.send('service_9oooaqk', 'template_7u6ca2t', {
                passcode: result.codigo_verificacion,
                email: data.email, // esto va en {{email}} si lo usas
                }, 'kz1_aRd59lxAOFlmI')
                .then(() => {
                console.log('OTP enviado');
                })
                .catch((err) => {
                console.error('Error al enviar el correo:', err);
                });
                setMostrarMensaje(true);
                console.log("Registro exitoso:", result);
                // Aquí puedes redirigir al usuario a otra página o mostrar un mensaje de éxito
            }
        })
    };

    return (
        <>
        <Mensaje  visible={mostrarMensaje} onClose={() => {setMostrarMensaje(false);navigate('/login');}}>
            ¡Gracias por registrarte! Hemos enviado un enlace de activación a tu correo electrónico. 
            Por favor, revisa tu bandeja de entrada y sigue las instrucciones para completar el proceso.
        </Mensaje>
        <div className="form-contenedor__registro_rol">
            <Logo />
            {/* <div className="cont-tlt-form-rol">
                <h1 className='tlt-from-paciente'>Formulario de Registro</h1>
            </div> */}
            <form className='fromulario__registro__rol' onSubmit={handleSubmit(onSubmit)}>
                <header className="header-form-registro-rol">
                    <h1 className="tlt-header-formulario-rol">Registro usuario</h1>
                </header>
                <div className="contenedor-inputs-doble-rol">
                    <div className="contenedor-etiqueta-for-rol">
                        <label htmlFor="" className="input-wrapper-etiqueta__input-label">Numero de identificación</label>
                        <input
                            type="text"
                            placeholder="Numero de identificación"
                            className='input-wrapper-etiqueta__input-field'
                            {...register('nro_doc', { 
                                required: 'Este campo es obligatorio',
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'El número de identificación debe contener solo números'
                                } 
                            })}
                        />
                        {errors.nro_doc && <span className='error'>{errors.nro_doc.message}</span>}
                    </div>
                    <div className="contenedor-etiqueta-for-rol">
                        <label htmlFor="" className="input-wrapper-etiqueta__input-label">Tipo de documento</label>
                        <select
                            className="input-wrapper__input-field"
                            {...register('tipo_doc', { required: 'Este campo es obligatorio' })}
                        >
                            <option value="" >Selecciona un tipo de documento</option>
                            <option value="CC">Cédula de Ciudadanía</option>
                            <option value="TI">Tarjeta de Identidad</option>
                            <option value="CE">Cédula de Extranjería</option>
                            <option value="PA">Pasaporte</option>
                            <option value="RC">Registro Civil</option>
                            <option value="NIT">NIT</option>
                            <option value="Otro">Otro</option>
                        </select>
                        {errors.tipo_doc && <span className='error'>{errors.tipo_doc.message}</span>}
                    </div>
                </div>
                <div className="contenedor-inputs-doble-rol">
                    <div className="contenedor-etiqueta-for-rol">
                        <label htmlFor="" className="input-wrapper-etiqueta__input-label">Email</label>
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            className='input-wrapper-etiqueta__input-field'
                            {...register('email', { required: 'Este campo es obligatorio' })}
                        />
                        {errors.email && <span className='error'>{errors.email.message}</span>}
                    </div>
                    <div className="contenedor-etiqueta-for-rol">
                        <label htmlFor="" className="input-wrapper-etiqueta__input-label">Contraseña</label>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className='input-wrapper-etiqueta__input-field'
                                {...register('password', { required: 'Este campo es obligatorio' })}
                            />
                        {errors.password && <span className='error'>{errors.password.message}</span>}
                    </div>
                </div>
                <Botones name="Registrar" tipo="submit" />
            </form>
        </div>
        </>
    );
}

export default FormularioRoles;