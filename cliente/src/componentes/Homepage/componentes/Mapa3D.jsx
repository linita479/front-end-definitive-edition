import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Mapa3D = () => {
  const contenedorRef = useRef(null);

  useEffect(() => {
    const contenedor = contenedorRef.current;

    // Escena
    const escena = new THREE.Scene();

    // Cámara
    const camara = new THREE.PerspectiveCamera(
      45,
      contenedor.clientWidth / contenedor.clientHeight,
      0.1,
      1000
    );
    camara.position.set(0, 10, 10);
    camara.lookAt(0, 0, 0);

    // Renderizador
    const renderizador = new THREE.WebGLRenderer({ antialias: true });
    renderizador.setSize(contenedor.clientWidth, contenedor.clientHeight);
    contenedor.appendChild(renderizador.domElement);

    // Luz ambiental y direccional
    escena.add(new THREE.AmbientLight(0xffffff, 0.7));
    const luz = new THREE.DirectionalLight(0xffffff, 0.6);
    luz.position.set(0, 10, 5);
    escena.add(luz);

    // Plano base (el mapa)
    const planoGeo = new THREE.PlaneGeometry(10, 6);
    const planoMat = new THREE.MeshStandardMaterial({ color: 0xcde8f9 });
    const plano = new THREE.Mesh(planoGeo, planoMat);
    plano.rotation.x = -Math.PI / 2;
    escena.add(plano);

    // Marcadores rojos (sucursales)
    const marcadorGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const marcadorMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });

    // Coordenadas de ejemplo (x, z) sobre el plano
    const sedes = [
      { x: -3, z: 1 },
      { x: 2, z: -1 },
      { x: 0, z: 2 },
    ];

    sedes.forEach(({ x, z }) => {
      const marcador = new THREE.Mesh(marcadorGeo, marcadorMat);
      marcador.position.set(x, 0.1, z); // apenas sobre el plano
      escena.add(marcador);
    });

    // Animación
    const animar = () => {
      requestAnimationFrame(animar);
      renderizador.render(escena, camara);
    };
    animar();

    // Cleanup
    return () => {
      contenedor.removeChild(renderizador.domElement);
    };
  }, []);

  return (
    <div
      ref={contenedorRef}
      style={{
        width: "100%",
        height: "350px",
        backgroundColor: "#eef6ff",
        marginTop: "2rem",
        borderTop: "2px solid #ccc",
      }}
    ></div>
  );
};

export default Mapa3D;

