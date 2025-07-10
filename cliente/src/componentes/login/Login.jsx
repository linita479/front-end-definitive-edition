import React, { useState } from 'react';
import { data, Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useForm } from 'react-hook-form';


const Login = () => {
    const {register , handleSubmit, setError, formState: { errors }} = useForm();
    const navigate = useNavigate();
    const logear = async (data) => {
    const url = "http://127.0.0.1:8000/login/";
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Error en la respuesta del servidor:", result);
        // Aquí puedes adaptar según el formato de error que te devuelva DRF
        if (result.error === "Usuario no encontrado") {
          setError("nro_doc", { type: "server", message: "Usuario no encontrado" });
        } 
        
        if (result.error === "Contraseña incorrecta") {
          setError("password", { type: "server", message: "Contraseña incorrecta" });
        }
        return;
      }

      console.log("Éxito:", result);
      sessionStorage.setItem("token", result.token);
      sessionStorage.setItem("tipo_usuario", result.tipo_usuario);  
      sessionStorage.setItem("nro_doc" , result.user.usuario.nro_doc)
      if (result.tipo_usuario === "paciente") {
        console.log("Usuario autenticado correctamente");
        navigate("/pacientes")
        
      } else {
        setError("server", { type: "server", message: "Tipo de usuario no permitido" });
      }
    } catch (error) {
      console.error("Error:", error);
      setError("nro_doc", { type: "server", message: "Error de conexión con el servidor" });
    }
  };

    function onSubmit(data) {
        console.log(data);
        logear(data);
        // Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo a una API
        // Por ejemplo, podrías hacer una solicitud POST a tu backend para autenticar al usuario
    }
  return (
    <div className="form-contenedor1 login-contenedor">
      <form className='fromulariol1' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='titulologin1'>¿Eres paciente? Inicia sesión aquí.</h1>
        {/* <select 
        className='textos'
        >
          <option value="" disabled={true}>Selecciona un tipo de usuario</option>
          <option value="gestor_th">Gestor de talento Humano</option>
          <option value="gerente">Gerente</option>
        </select> */}
        <div>
          {errors.nro_doc && <div className='cuadroerror'><span className='errorr'>{errors.nro_doc.message}</span></div>}
          <input
          type="text"
          placeholder="Número de identificación"
          className='textos'
            {...register('nro_doc', { 
              required: 'Este campo es obligatorio',
              pattern: {
                value: /^[0-9]+$/,
                message: 'El número de identificación debe contener solo números'
              } 
            })}
        />
        </div>
        <div>
        {errors.password && <div className='cuadroerror'><span className='errorr'>{errors.password.message}</span></div>}
        {errors.server && <div className='cuadroerror'><span className='errorr'>{errors.server.message}</span></div>}
          <input
          type="password"
          placeholder="Contraseña"
          className='textos'
            {...register('password', { required: 'Este campo es obligatorio' })}
        />
        </div>
        <button type="submit" className='btn'>Entrar</button>
        <Link to="/solicitud_contrasena" className='link olvidopss'>¿Olvidaste tu contraseña?</Link>
        <Link to="/registro/paciente" className='link'>¿No tienes cuenta? <span className='span-registrate-aqui'>Regístrate aquí</span></Link>
      </form>
    </div>
  );
};

export default Login;