import React from 'react';
import QR_IMAGE from '../assets/images/qr.png'; // Update with your QR image path
import '../css/WhatsApp.css'; // Import the CSS file

const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/EIRbyW0Fk9EIzQIdgZueLd?mode=ems_share_t';

export default function WhatsApp() {
    return (
        <section className="whatsapp-section">
            <h2 className="whatsapp-heading">
                Order Fresh Organic Veggies on WhatsApp! 🌿
            </h2>
            <p className="whatsapp-subheading">
                Scan the QR code below to join our group and place your order instantly.
            </p>
            <img
                src={QR_IMAGE}
                alt="WhatsApp Group QR Code"
                className="whatsapp-qr"
            />
            <br />
            <a href={WHATSAPP_GROUP_LINK} target="_blank" rel="noopener noreferrer">
                <button className="whatsapp-button">
                    Join WhatsApp Group
                </button>
            </a>
        </section>
    );
}
