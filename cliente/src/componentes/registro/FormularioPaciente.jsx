import { useForm } from "react-hook-form";
import Mensaje from "./Mensaje";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EtiquetaInput from "../objetos/EtiquetaInput";
import Botones from "../objetos/Botones";
import ComboBox from "../objetos/ComboBox";
import emailjs from '@emailjs/browser';
import Logo from "../Homepage/componentes/Logo";
import './FormularioRoles.css';
import './ErrorContrasena.css'
import { Tooltip } from 'react-tooltip';

const FormularioPacienteExtendido = () => {
    const { register, handleSubmit, setError, watch, formState: { errors } } = useForm();
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const password = watch("password", "");

    const requisitosCumplidos = (pass) => {
        return (
            /[A-Z]/.test(pass) &&
            /[0-9]/.test(pass) &&
            /[^A-Za-z0-9]/.test(pass) &&
            pass.length >= 8 &&
            pass.length <= 16
        );
    };

    const onSubmit = (data) => {
        console.log(data);
        data["tipo_usuario"] = "paciente";
        data["is_active"] = false;
        data["username"] = data.nro_doc;

        const paciente = {
            usuario: data,
            tipo_usuario: "paciente"
        };

        console.log(paciente);

        setCargando(true);

        fetch("http://127.0.0.1:8000/registrar/paciente/", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(paciente),
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            if (result.nro_doc) {
                setError("nro_doc", { type: "server", message: result.nro_doc });
            } else if (result.email) {
                setError("email", { type: "server", message: result.email });
            } else {
                emailjs.send('service_9oooaqk', 'template_7u6ca2t', {
                    passcode: result.codigo_verificacion,
                    email: data.email,
                }, 'kz1_aRd59lxAOFlmI')
                .then(() => {
                    console.log('OTP enviado');
                })
                .catch((err) => {
                    console.error('Error al enviar el correo:', err);
                });

                setCargando(false);
                setMostrarMensaje(true);
            }
        });
    };

    return (
        <>
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

            <Mensaje visible={mostrarMensaje} onClose={() => { setMostrarMensaje(false); navigate('/login'); }}>
                ¡Gracias por registrarte! Hemos enviado un enlace de activación a tu correo electrónico. 
                Por favor, revisa tu bandeja de entrada y sigue las instrucciones para completar el proceso.
            </Mensaje>

            <div className="form-contenedor__registro">
                <div className='cont-logo-form-paciente'>
                    <Logo />
                </div>
                <div className="cont-form-error-contrasena">
                  <form className="fromulariol" onSubmit={handleSubmit(onSubmit)}>
                    <header className="header-form-registro-pacientel">
                        <h1 className="tlt-header-formulario-rol">Registro del paciente</h1>
                    </header>

                    <div className="contenedor-inputs-doble">
                        <EtiquetaInput
                            label="Número de identificación"
                            type="text"
                            placeholder="Número de identificación"
                            register={register('nro_doc', {
                                required: 'Este campo es obligatorio',
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'El número de identificación debe contener solo números'
                                }
                            })}
                        />
                        <ComboBox
                            label="Tipo de documento"
                            register={register("tipo_doc", { required: 'Este campo es obligatorio' })}
                            options={[
                                { value: "", label: "Tipo de documento" },
                                { value: "CC", label: "Cédula de Ciudadanía" },
                                { value: "TI", label: "Tarjeta de Identidad" },
                                { value: "CE", label: "Cédula de Extranjería" },
                                { value: "PA", label: "Pasaporte" }
                            ]}
                        />
                    </div>

                    <div className="contenedor-inputs-doble">
                        <EtiquetaInput
                            label="Lugar de expedición"
                            type="text"
                            placeholder="Lugar de expedición del documento"
                            register={register("lugar_exp_doc", { required: 'Este campo es obligatorio' })}
                        />
                        <EtiquetaInput
                            label="Fecha de expedición"
                            type="date"
                            register={register("fecha_exp_doc", { required: 'Este campo es obligatorio' })}
                        />
                    </div>

                    <div className="contenedor-inputs-doble">
                        <ComboBox
                            label="Sexo"
                            register={register("sexo", { required: 'Este campo es obligatorio' })}
                            options={[
                                { value: "", label: "Sexo" },
                                { value: "M", label: "Masculino" },
                                { value: "F", label: "Femenino" },
                                { value: "I", label: "Indeterminado" }
                            ]}
                        />
                        <EtiquetaInput
                            label="Fecha de nacimiento"
                            type="date"
                            register={register("fecha_nacimiento", { required: 'Este campo es obligatorio' })}
                        />
                    </div>

                    <div className="contenedor-inputs-doble">
                        <ComboBox
                            label="Estado civil"
                            register={register("estado_civil", { required: 'Este campo es obligatorio' })}
                            options={[
                                { value: "", label: "Estado civil" },
                                { value: "Soltero", label: "Soltero" },
                                { value: "Casado", label: "Casado" },
                                { value: "Divorciado", label: "Divorciado" },
                                { value: "Viudo", label: "Viudo" }
                            ]}
                        />
                        <EtiquetaInput
                            label="Teléfono"
                            type="text"
                            placeholder="Teléfono"
                            register={register("telefono", { required: 'Este campo es obligatorio' })}
                        />
                    </div>

                    <div className="contenedor-inputs-doble">
                        <EtiquetaInput
                            label="Nacionalidad"
                            type="text"
                            placeholder="Nacionalidad"
                            register={register("nacionalidad", { required: 'Este campo es obligatorio' })}
                        />
                        <EtiquetaInput
                            label="Municipio"
                            type="text"
                            placeholder="Municipio"
                            register={register("municipio", { required: 'Este campo es obligatorio' })}
                        />
                    </div>

                    <div className="contenedor-inputs-doble">
                        <EtiquetaInput
                            label="Nombres"
                            type="text"
                            placeholder="Nombres"
                            register={register("first_name", { required: 'Este campo es obligatorio' })}
                        />
                        <EtiquetaInput
                            label="Apellidos"
                            type="text"
                            placeholder="Apellidos"
                            register={register("last_name", { required: 'Este campo es obligatorio' })}
                        />
                    </div>

                    <div className="contenedor-inputs-doble">
                        <EtiquetaInput
                            label="Correo electrónico"
                            type="email"
                            placeholder="Correo electrónico"
                            register={register("email", { required: 'Este campo es obligatorio' })}
                        />
                        <a data-tooltip-id="my-tooltip" data-tooltip-content="⚠️ La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula, un número y un carácter especial.">
                            <EtiquetaInput
                            label="Contraseña"
                            type="password"
                            placeholder="Contraseña"
                            register={register("password", { required: 'Este campo es obligatorio' })}
                        />
                            </a>
                            <Tooltip id="my-tooltip" />
                        
                    </div>
                    <div className="cont-bototn-form-paciente">
                        <Botones name="Registrar" tipo="submit" />
                    </div>
                </form>
                    {/* ✅ Mensaje debajo del campo de contraseña */}
                    {/* {password && !requisitosCumplidos(password) && (
                        <div className="advertencia-contrasena">
                          <p>⚠️ La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula, un número y un carácter especial.</p>
                        </div>
                    )} */}
                </div>
            </div>
        </>
    );
};

export default FormularioPacienteExtendido;
