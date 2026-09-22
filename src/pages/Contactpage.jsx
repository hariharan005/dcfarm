import React, { useState } from "react";
import "../css/Contactpage.css";
import Footer from "../components/Footer";
import api from "../api";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Sending...");

        try {
            await api.post("/contact", formData);
            setStatus("Message sent successfully! ✅");
            setFormData({ name: "", email: "", message: "" });
        } catch (error) {
            console.error("Contact form submission failed:", error);
            setStatus("Unable to send your message. Please try again.");
        }
    };

    return (
        <>
            <div className="contact-container">
                <h1>Contact Us</h1>
                <p className="contact-intro">
                    Have questions about our farm, products, or services? Get in touch with us!
                </p>

                <div className="contact-grid">
                    {/* Left Side - Contact Form */}
                    <div className="contact-form">
                        <h2>Send us a Message</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="email">Your Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />

                            <button type="submit">Send Message</button>
                            {status && <p className="form-status">{status}</p>}
                        </form>
                    </div>

                    {/* Right Side - Contact Info */}
                    <div className="contact-info">
                        <h2>Our Contact Information</h2>
                        <p><strong>Address:</strong>DC Farm, Kadambadi, Mahabalipuram</p>
                        <p><strong>Phone:</strong> +91 9790755231</p>
                        <p><strong>Email:</strong> hello@dcfarm.com</p>

                        <div className="map-container">
                            <iframe
                                title="Farm Location"
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3391.8714833043873!2d80.1551049!3d12.594927!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a53ab003a19ea69%3A0x102c3522d5022fef!2sHA%20Organic%20Farm!5e1!3m2!1sen!2sin!4v1790050048767!5m2!1sen!2sin"
                                width="100%"
                                height="250"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;
