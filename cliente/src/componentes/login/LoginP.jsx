import React from "react";
import { useForm } from "react-hook-form";
import { data, Link, useNavigate } from 'react-router-dom';
const LoginP = () => {
    const { register, handleSubmit,setError ,formState: { errors } } = useForm();
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
      if (result.tipo_usuario !== "paciente") {
        console.log("Usuario autenticado correctamente");
        if (result.tipo_usuario === "gerente") {
          // Aquí puedes redirigir al gerente a su dashboard
          navigate('/admin');
        }
        if (result.tipo_usuario === "gestor_th") {
          // Aquí puedes redirigir al gestor de TH a su dashboard
          navigate('/modulo_th');
        }
        // navigate('/dashboard');
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
    }
    return (
        <>
        <div className="form-contenedor1 registro-contenedor">
        <form className='fromulariol1' onSubmit={handleSubmit(onSubmit)}>
            <h1 className='titulologin1'>Eres parte del personal? Inicia sesión aquí.</h1>
          <div>
            {errors.nro_doc &&  <div className='cuadroerror'><span className='errorr'>{errors.nro_doc.message}</span></div>}
              <input
          type="text"
          placeholder="Número de identificación"
          className='textos errorr'
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
            <button className='btn'>Ingresar</button>
            <Link to="/solicitud_contrasena" className='link olvidopss'>¿Olvidaste tu contraseña?</Link>
            <Link to="/registro" className='link'>¿No tienes cuenta? Regístrate aquí</Link>
        </form>
        </div>
        </>
);
};

export default LoginP;
