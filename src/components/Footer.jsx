import React from "react";
import Logo from "../assets/images/icons/Logo.png";
const Footer = () => {
    return (
        <footer style={{
            background: "#093015",
            color: "#fff",
            padding: "32px 0 8px 0",
            fontFamily: "Montserrat, Arial, sans-serif"
        }}>
            <div style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                maxWidth: 1000,
                margin: "0 auto",
                padding: "0 24px"
            }}>
                {/* Logo and Title */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    flex: 1,
                    minWidth: 220,
                    marginRight: 24
                }}>
                    <img
                        src={Logo}
                        alt="HA Farm Logo"
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: "50%",
                            marginRight: 16,
                            background: "#fff",
                            objectFit: "cover",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.10)"
                        }}
                    />
                    <span style={{
                        fontSize: 24,
                        fontWeight: 700,
                        fontFamily: "Montserrat, Arial, sans-serif",
                        letterSpacing: 1
                    }}>
                        HA Farm
                    </span>
                </div>
                <div style={{ flex: 1, textAlign: "left" }}>
                    <div style={{ fontWeight: 700, marginBottom: 8, textAlign: "left" }}>Contact</div>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: 4, textAlign: "left" }}>
                        <span style={{
                            fontSize: 18,
                            marginRight: 8,
                            lineHeight: 1.2,
                            textAlign: "left",
                        }}>📍</span>
                        <span style={{
                            fontSize: 16,
                            marginRight: 8,
                            lineHeight: 1.2,
                            textAlign: "left"
                        }}>Kadambadi,<br />Mahabalipuram</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", textAlign: "left" }}>
                        <span style={{
                            fontSize: 18,
                            marginRight: 8
                        }}>📞</span>
                        <span style={{
                            fontSize: 16,
                            marginRight: 8
                        }}>+91 7603918492</span>
                    </div>
                </div>
                <div style={{ flex: 1, textAlign: "left", marginLeft: 34 }}>
                    <div style={{ fontWeight: 700, marginBottom: 8, textAlign: "left" }}>Quick Links</div>
                    <div style={{ textAlign: "left", display: "flex", flexDirection: "column", paddingLeft: 8 }}>
                        <a href="/" style={linkStyle}>Home</a><br />
                        <a href="/about" style={linkStyle}>AboutUs</a><br />
                        <a href="/products" style={linkStyle}>Products</a><br />
                        <a href="https://wa.me/917603918492" style={linkStyle}>Order on WhatsApp</a>
                    </div>
                </div>
                {/* Social Media */}
                <div style={{ flex: 1, textAlign: "left" }}>
                    <div style={{ fontWeight: 700, marginBottom: 8, textAlign: "left" }}>Social Media</div>
                    <div style={{ display: "flex", gap: 12, textAlign: "left" }}>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg"
                                alt="Instagram" style={iconStyle} />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg"
                                alt="YouTube" style={iconStyle} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg"
                                alt="LinkedIn" style={iconStyle} />
                        </a>
                    </div>
                </div>
                {/* Embedded Map for Farm Location */}
                <div style={{
                    width: 160,
                    height: 160,
                    borderRadius: 32,
                    marginLeft: 24,
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
                }}>
                    <iframe
                        title="DC Farm Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2028.356028642633!2d80.15590225770217!3d12.594326791740398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a53ab003a19ea69%3A0x102c3522d5022fef!2sHA%20Organic%20Farm!5e1!3m2!1sen!2sin!4v1756034655264!5m2!1sen!2sin"
                        width="160"
                        height="160"
                        style={{ border: 0, borderRadius: 32, width: "100%", height: "100%" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
            <div style={{
                textAlign: "center",
                marginTop: 16,
                fontSize: 18,
                color: "#fff",
                fontFamily: "Montserrat, Arial, sans-serif"
            }}>
                © 2025 DC Farm. All Rights Reserved.
            </div>
        </footer>
    );
};

const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontSize: 15,
    marginBottom: 4,
    fontFamily: "Montserrat, Arial, sans-serif"
};

const iconStyle = {
    width: 32,
    height: 32,
    background: "#d9ba0b",
    borderRadius: 8,
    padding: 4,
};

export default Footer;