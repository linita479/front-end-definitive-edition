import React from 'react';
import { useForm } from 'react-hook-form';
import EtiquetaInput from '../objetos/EtiquetaInput';
import Botones from '../objetos/Botones';

const EditarCentroModal = ({ centro, onClose}) => {
  const { register, handleSubmit ,formState: { errors } } = useForm({
  defaultValues: {
    nit: centro.nit,
    nombre: centro.nombre,
    direccion: centro.direccion,
    telefono: centro.telefono,
    email: centro.email
  }
});

  async function editarCentro(datos) {
    const url = `http://127.0.0.1:8000/api/gerente/centro_medico/${centro.nit}/`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem("token")}`
      },
      body: JSON.stringify(datos)
    })
      .then((response) => {
        if (response.ok) {
          console.log('Centro médico editado exitosamente');
        } else {
          console.error('Error al editar centro médico');
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  const onSubmit = (data) => {
    console.log('Datos editados:', data);
    editarCentro(data);
    onClose(); // Cierra el modal después de editar
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2>Editar Centro Médico</h2>
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
          <Botones name="Guardar Cambios" />
        </form>
        <button onClick={onClose} style={{ marginTop: '10px' }}>Cancelar</button>
      </div>
    </div>
  );
};const styles = {
  modalOverlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 999
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '400px'
  }
};

export default EditarCentroModal;