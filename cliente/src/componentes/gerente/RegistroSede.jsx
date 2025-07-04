import React from 'react';
import { useForm } from 'react-hook-form';
import EtiquetaInput from '../objetos/EtiquetaInput';
import Botones from '../objetos/Botones';
const RegistroSede = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
    const url = "http://127.0.0.1:8000/api/gerente/centro_medico/"
    const verificar = async (datos) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Token ${sessionStorage.getItem("token")}`
                },
                body: JSON.stringify(datos)
            });
            if (!response.ok) {
                throw new Error('Error en la petición');
            }
            const data = await response.json();
            console.log('Respuesta de la API:', data);
        } catch (error) {
            console.error('Error al verificar:', error);
        }
    }
  const onSubmit = (data) => {
    console.log('Datos registrados:', data);
    verificar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
            <EtiquetaInput 
        label="NIT" 
        type="text" 
        placeholder="NIT de la sede"
        register={register('nit', { required: "Este campo es obligatorio" })}
      />
      <EtiquetaInput 
        label="Nombre" 
        type="text" 
        placeholder="Nombre de la sede"
        register={register('nombre', { required: "Este campo es obligatorio" })}
      />
      {errors.nombre && <span>{errors.nombre.message}</span>}
      <EtiquetaInput 
        label="Dirección" 
        type="text" 
        placeholder="Dirección de la sede"
        register={register('direccion', { required: "Este campo es obligatorio" })}
      />
      {errors.direccion && <span>{errors.direccion.message}</span>}     
      <EtiquetaInput 
        label="Teléfono" 
        type="tel" 
        placeholder="Número de contacto"
        register={register('telefono', { required: "Este campo es obligatorio" })}
      />
      {errors.telefono && <span>{errors.telefono.message}</span>}
      <EtiquetaInput 
        label="Email" 
        type="email" 
        placeholder="Correo electrónico"
        register={register('email', { required: "Este campo es obligatorio" })}
      />
      {errors.email && <span>{errors.email.message}</span>}
      <Botones name="Registrar Sede" />
    </form>
  );
};

export default RegistroSede;