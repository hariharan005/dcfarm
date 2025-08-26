import React from "react";
import "../css/Hero.css"; // styles moved here
import grapesImage from "../assets/images/grapes.jpg";

const Hero = () => {
    return (
        <section
            className="hero-section"
            style={{ backgroundImage: `url(${grapesImage})` }}
        >
            <div className="hero-overlay">
                <h1 className="brand-name">HA Farm</h1>
                <p className="tagline">Fresh from our farm to your table</p>
            </div>
        </section>
    );
};

export default Hero;
