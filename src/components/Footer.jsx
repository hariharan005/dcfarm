import React from "react";
import Logo from "../assets/images/icons/Logo.png";
import "../css/Footer.css"; // Import styles

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Logo and Title */}
                <div className="footer-logo">
                    <img src={Logo} alt="HA Farm Logo" className="logo-img" />
                    <span className="logo-text">HA Farm</span>
                </div>

                {/* Contact */}
                <div className="footer-section">
                    <div className="footer-title">Contact</div>
                    <div className="footer-contact">
                        <span className="footer-icon">📍</span>
                        <span className="footer-text">
                            Kadambadi,<br />Mahabalipuram
                        </span>
                    </div>
                    <div className="footer-contact">
                        <span className="footer-icon">📞</span>
                        <span className="footer-text">+91 7603918492</span>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer-section">
                    <div className="footer-title">Quick Links</div>
                    <div className="footer-links">
                        <a href="/" className="footer-link">Home</a>
                        <a href="/about" className="footer-link">AboutUs</a>
                        <a href="/products" className="footer-link">Products</a>
                        <a href="https://wa.me/917603918492" className="footer-link">
                            Order on WhatsApp
                        </a>
                    </div>
                </div>

                {/* Social Media */}
                <div className="footer-section">
                    <div className="footer-title">Social Media</div>
                    <div className="footer-social">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <img
                                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg"
                                alt="Instagram"
                                className="social-icon"
                            />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                            <img
                                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg"
                                alt="YouTube"
                                className="social-icon"
                            />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <img
                                src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
                                alt="LinkedIn"
                                className="social-icon"
                            />
                        </a>
                    </div>
                </div>

                {/* Embedded Map */}
                <div className="footer-map">
                    <iframe
                        title="DC Farm Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2028.356028642633!2d80.15590225770217!3d12.594326791740398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a53ab003a19ea69%3A0x102c3522d5022fef!2sHA%20Organic%20Farm!5e1!3m2!1sen!2sin!4v1756034655264!5m2!1sen!2sin"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>

            <div className="footer-bottom">
                © 2025 DC Farm. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
