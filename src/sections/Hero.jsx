import React from "react";

import grapesImage from "../assets/images/grapes.jpg";
const backgroundImageUrl = grapesImage;

const Hero = () => {
    return (
        <section
            style={{
                width: "100vw",
                height: "100vh",
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    background: "rgba(255, 255, 255, 0.15)",
                    borderRadius: "48px",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 4px 32px rgba(0,0,0,0.15)",
                    padding: "48px 96px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <h1
                    style={{
                        fontFamily: "'Georgia Pro', Georgia, serif",
                        fontSize: "144px",
                        color: "#fff",
                        margin: 0,
                        letterSpacing: "2px",
                        textAlign: "center",
                        fontWeight: "bold",
                        textShadow: "0 2px 16px rgba(0,0,0,0.3)",
                    }}
                >
                    HA Farm
                </h1>
            </div>
        </section>
    );
};

export default Hero;