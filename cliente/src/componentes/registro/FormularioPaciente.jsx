import { useForm } from "react-hook-form";
import Mensaje from "./Mensaje";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EtiquetaInput from "../objetos/EtiquetaInput";
import Botones from "../objetos/Botones";
import ComboBox from "../objetos/ComboBox";
import emailjs from '@emailjs/browser';

const FormularioPacienteExtendido = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const navigate = useNavigate();
    const onSubmit = (data) => {
        console.log(data);
        data["tipo_usuario"] = "paciente";
        data["is_active"] = false;
        data["username"] = data.nro_doc;

        const paciente = {
            usuario : data,
            tipo_usuario: "paciente"
        }

        console.log(paciente);

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
                email: data.email, // esto va en {{email}} si lo usas
                }, 'kz1_aRd59lxAOFlmI')
                .then(() => {
                console.log('OTP enviado');
                })
                .catch((err) => {
                console.error('Error al enviar el correo:', err);
                });
                setMostrarMensaje(true);
            }
        });
    };

    return (
        <>
            <Mensaje visible={mostrarMensaje} onClose={() => {setMostrarMensaje(false);navigate('/login');}}>
                ¡Gracias por registrarte! Hemos enviado un enlace de activación a tu correo electrónico. 
                Por favor, revisa tu bandeja de entrada y sigue las instrucciones para completar el proceso.
            </Mensaje>

            <div className="form-contenedor__registro">
              <div className="cont-tlt-form-paciente">
                <h1 className="tlt-from-paciente">Formulario de Registro</h1>
              </div>
  <form className="fromulariol" onSubmit={handleSubmit(onSubmit)}>

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
      <EtiquetaInput
        label="Contraseña"
        type="password"
        placeholder="Contraseña"
        register={register("password", { required: 'Este campo es obligatorio' })}
      />
    </div>
    <Botones name="Registrar" tipo="submit" />
  </form>
</div>

        </>
    );
};

export default FormularioPacienteExtendido;
