import React from "react";
import "../css/About.css"; // Create this CSS file for styles
import aboutCompanyImg from "../assets/images/6.jpg";
import visionImg from "../assets/images/1.jpg";
import missionImg from "../assets/images/4.jpg";

const About = () => {
    return (
        <section className="about-section">
            <h2 className="about-heading">About Us</h2>
            <div className="about-row">
                <div className="about-col about-text">
                    <h3>About Company</h3>
                    <p>
                        We are dedicated to sustainable farming practices, delivering fresh produce while caring for the environment and our community. Our commitment is to quality, transparency, and innovation in agriculture.
                    </p>
                </div>
                <div className="about-col about-img">
                    <img src={aboutCompanyImg} alt="About Company" />
                </div>
            </div>
            <div className="about-row reverse">
                <div className="about-col about-img">
                    <img src={visionImg} alt="Vision" />
                </div>
                <div className="about-col about-text">
                    <h3>Our Vision</h3>
                    <p>
                        To lead the way in sustainable farming, inspiring communities to embrace eco-friendly agriculture and healthy living for generations to come.
                    </p>
                </div>
            </div>
            <div className="about-row">
                <div className="about-col about-text">
                    <h3>Our Mission</h3>
                    <p>
                        Empower farmers and consumers through innovative solutions, education, and responsible practices that promote growth, sustainability, and well-being.
                    </p>
                </div>
                <div className="about-col about-img">
                    <img src={missionImg} alt="Mission" />
                </div>
            </div>
        </section>
    );
};

export default About;