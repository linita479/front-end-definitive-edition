import React from "react";
import 'leaflet/dist/leaflet.css';
import './Mapa.css'; // Importamos estilos

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapaLibre = () => {
    return (
        <div style={{ width: '100%', height: '400px' }}>
        <MapContainer center={[4.65, -74.1]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[4.65, -74.1]}>
            <Popup>
                Aquí estamos 📍 <br /> ¡Bienvenido!
            </Popup>
            </Marker>
        </MapContainer>
        </div>
    );
};

export default MapaLibre;




