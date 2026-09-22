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
                <h1 className="brand-name">DC FARM</h1>
                <p className="tagline"><strong>FRESH FROM OUR FARM TO YOUR TABLE</strong></p>
            </div>
        </section>
    );
};

export default Hero;
