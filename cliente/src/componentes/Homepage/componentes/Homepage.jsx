import React from "react";
import Header from "./Header";
import Beneficios from "./Beneficios";
import SobreNosotros from "./Sobrenosotros";
import Footer from "./Footer";
import Btnform from "./Btnform";
import Mapa3D from "./Mapa3D";
import MapaGoogle from "./Mapa";
import MapaLibre from "./Mapa";

const HomePage = () =>{

    return(
        <>
        <div className="homepage">
            <Header />
            <Beneficios />
            <SobreNosotros />
            <MapaLibre />
            <Footer />
        </div>
        </>
    );
}

export default HomePage;