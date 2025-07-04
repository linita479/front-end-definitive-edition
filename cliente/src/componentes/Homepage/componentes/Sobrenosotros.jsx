import React from "react";
import CuadroInformativo from "./CuadroInformativo";
import { FaUsers, FaBullseye, FaStethoscope, FaHeartbeat, FaHandsHelping } from "react-icons/fa";

const SobreNosotros = () => {
  return (
    <div className="sobre-nosotros-container">
      <CuadroInformativo
        titulo="Nosotros"
        parrf="Somos una clínica moderna y comprometida con la salud y el bienestar de nuestros pacientes. Contamos con un equipo médico altamente calificado y tecnología de última generación."
        icono={<FaUsers size={48} color="white" />}
        color="var(--card-azul-claro)"
      />
      <CuadroInformativo
        titulo="Misión"
        parrf="Brindar servicios de salud humanizados, seguros y de alta calidad, centrados en el paciente, con énfasis en la prevención y el tratamiento eficaz."
        icono={<FaBullseye size={48} color="white" />}
        color="var(--card-azul-medio)"
      />
      <CuadroInformativo
        titulo="Visión"
        parrf="Ser reconocidos como una clínica líder en innovación médica y excelencia en el cuidado del paciente."
        icono={<FaStethoscope size={48} color="white" />}
        color="var(--card-aguamarina)"
      />
      <CuadroInformativo
        titulo="Valores"
        parrf="Ética, compromiso, empatía y respeto guían cada una de nuestras acciones y decisiones médicas."
        icono={<FaHandsHelping size={48} color="white" />}
        color="var(--card-azul-vivo)"
      />
      <CuadroInformativo
        titulo="Compromiso"
        parrf="Trabajamos con dedicación para ofrecer atención oportuna y procesos seguros centrados en cada paciente."
        icono={<FaHeartbeat size={48} color="white" />}
        color="var(--card-celeste)"
      />
    </div>
  );
};

export default SobreNosotros;

