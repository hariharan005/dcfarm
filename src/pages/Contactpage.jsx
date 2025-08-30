import React, { useState } from "react";
import "../css/Contactpage.css";
import Footer from "../components/Footer";

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

    const handleSubmit = (e) => {
        e.preventDefault();

        // For now just show success message
        setStatus("Message sent successfully! ✅");
        setFormData({ name: "", email: "", message: "" });
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
                        <p><strong>Address:</strong> 123 Green Farm Road, Organic Valley, India</p>
                        <p><strong>Phone:</strong> +91 98765 43210</p>
                        <p><strong>Email:</strong> hello@greenfarm.com</p>

                        <div className="map-container">
                            <iframe
                                title="Farm Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3915.8079!2d77.123!3d11.013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3!2sFarm%20Location!5e0!3m2!1sen!2sin!4v0000"
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
