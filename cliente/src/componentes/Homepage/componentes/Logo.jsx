import React from "react";
import './Logo.css';
import { HeartHandshake } from "lucide-react";  // ya está bien importado

const Logo = () => {
    return (
        <div className="cube-container">
        <div className="cube-container__cube-loader">
            <div className="cube-container__cube-top"></div>
            <div className="cube-container__cube-wrapper">
            {[0, 1, 2, 3].map((i) => (
                <span key={i} className="cube-container__cube-span" style={{ "--i": i }}>
                <div className="icon-container">
                    <HeartHandshake className="icon-container__cube-icon" />
                </div>
                </span>
            ))}
            </div>
        </div>
        <div className="cube-container__healthsoft-text"><p><span className="kenay-tlt-logo">Kenay</span>Healtsoft</p></div>
        </div>
    );
    };

export default Logo;
