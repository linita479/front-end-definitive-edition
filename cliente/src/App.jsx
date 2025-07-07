import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'

import Login from './componentes/login/LogIn.jsx'
import Overly from './componentes/login/Overly.jsx'
import LoginP from './componentes/login/LoginP.jsx'
import FormularioPaciente from './componentes/registro/FormularioPaciente.jsx'
import FormularioRoles from './componentes/registro/FormularioRoles.jsx'
import ModuloRegistros from './componentes/registro/ModuloRegistros.jsx'
import ContenedorVerificar from './componentes/registro/ContenedorVerificar.jsx'
import ModuloGerente from './componentes/gerente/ModuloGerente.jsx'
import NavBar from './componentes/objetos/NavBar.jsx'
import RegistroSede from './componentes/gerente/RegistroSede.jsx'
import VerCentrosMedicos from './componentes/gerente/VerSede.jsx'
import VerServicios from './componentes/gerente/VerServicios.jsx'
import RegistroTh from './componentes/gerente/RegistrarTh.jsx'
import ContenedorVerifPass from './componentes/registro/ContenedorVerifPass.jsx'

// Importando los componentes del módulo TH
import ModuloCitas from './componentes/gestor_citas/ModuloAux.jsx'
import CalendarioCitas from './componentes/gestor_citas/CalendarioCitas.jsx'
import HomePage from './componentes/Homepage/componentes/Homepage.jsx'

// Importando los componentes del módulo TH
import ModuloTh from './componentes/Gestorth/paginas/ModuloTh.jsx'
import RegistrarMedico from './componentes/Gestorth/paginas/RegistroMedico.jsx'
import RegistroAuxiliar from './componentes/Gestorth/paginas/RegistroAuxiliar.jsx'
import Academico from './componentes/Gestorth/paginas/Academico.jsx'
import ExperienciaLaboral from './componentes/Gestorth/paginas/ExperienciaLaboral.jsx'
import ListarPersonal from './componentes/Gestorth/paginas/ListarPersonal.jsx'
import SolicitudesActualizacion from './componentes/Gestorth/paginas/SolicitudActualizacion.jsx'
import SolicitudContraseña from './componentes/login/SolicitudContraseña.jsx'
import { div } from 'three/tsl'
import Logo from './componentes/Homepage/componentes/Logo.jsx'
import ModuloUsuarioSinRol from './componentes/usuarioSinRol/ModuloUsuarioSinRol.jsx'
import ModuloPaciente from './componentes/pacientes/ModuloPaciente.jsx'
import VerUsuarios from './componentes/gerente/VerUsuarios.jsx'
import CrearAgenda from './componentes/Gestorth/paginas/CrearAgenda.jsx'

function App() {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="/login" element={
          <div className='jesus'>
            <Logo></Logo>
            <div className={`container ${isActive ? 'right-panel-active' : ''}`} id='container'>
              <LoginP />
              <Login />
              <Overly onRegisterClick={() => setIsActive(true)} onLoginClick={() => setIsActive(false)}  />
            </div>
          </div>
              
          } />
        <Route path="/registro" element={
          <div className=''>
            <ModuloRegistros formularioPaciente={false} formularioRol={true} />
          </div>
        } />
        <Route path="/registro/paciente" element={
          <div className=''>
            <ModuloRegistros formularioPaciente={true} formularioRol={false} />
          </div>
        } />
        <Route path="/verificacion" element={
          <div className=''>
            <ContenedorVerificar />
          </div>
        } />
        <Route path='/solicitud_contrasena' element={
          <div className=''>
            <SolicitudContraseña />
          </div>
        } />
        <Route path='/verificar_restaurar' element={
          <div className=''>
            <ContenedorVerifPass />
          </div>
        } />
        <Route path='/usuario_no_rol' element={
          <div className=''>
            <ModuloUsuarioSinRol/>
          </div>
        } />
        
        <Route path='/admin' element={
          <div className=''>
          <ModuloGerente />
          </div>
        }>
          <Route path='registro-th' element={<RegistroTh />} />
          <Route path='centro/medico' element={<RegistroSede />} />
          <Route path='ver-centros-medicos' element={<VerCentrosMedicos />} />
          <Route path='ver-servicios' element={<VerServicios />} />
          <Route path='ver-usuarios' element={<VerUsuarios/>} />
        </Route>

        <Route path='/pacientes' element={
          <div className=''>
            <ModuloPaciente/>
          </div>
        } ></Route>
        <Route path='/auxpage' element={
          <div className=''>
            <ModuloCitas />
          </div>
        } >
          <Route path='ver-calendario' element={<CalendarioCitas/>} />
        </Route>
        <Route path='/modulo_th' element={ <ModuloTh /> }>
          <Route path='registromedico' element={<RegistrarMedico />} />
          <Route path='registroauxiliar' element={<RegistroAuxiliar />} />
          <Route path='academico' element={<Academico />} />
          <Route path='experiencia' element={<ExperienciaLaboral />} />
          <Route path='consultar' element={<ListarPersonal />} />
          <Route path='solicitudes' element={<SolicitudesActualizacion />} />
          <Route path='crear-agenda' element={<CrearAgenda/>} />
        </Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
