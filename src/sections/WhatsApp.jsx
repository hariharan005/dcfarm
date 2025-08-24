import React from 'react';
import QR_IMAGE from '../assets/images/qr.png'; // Update with your QR image path


const WHATSAPP_GROUP_LINK = 'https://chat.whatsapp.com/EIRbyW0Fk9EIzQIdgZueLd?mode=ems_share_t'; // Update with your WhatsApp group link

const styles = {
    section: {
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(8, 45, 15, 0.08)',
        padding: '2rem',
        maxWidth: '400px',
        margin: '2rem auto',
        textAlign: 'center',
    },
    heading: {
        color: '#082d0f',
        fontSize: '1.5rem',
        fontWeight: '700',
        marginBottom: '0.5rem',
    },
    subheading: {
        color: '#082d0f',
        fontSize: '1rem',
        marginBottom: '1.5rem',
    },
    qr: {
        width: '180px',
        height: '180px',
        marginBottom: '1.5rem',
        borderRadius: '12px',
        border: '2px solid #d9ba0b',
        background: '#fff',
        objectFit: 'cover',
    },
    button: {
        background: '#d9ba0b',
        color: '#082d0f',
        fontWeight: '600',
        fontSize: '1rem',
        padding: '0.75rem 2rem',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(8, 45, 15, 0.08)',
        transition: 'background 0.2s',
    },
};

export default function WhatsApp() {
    return (
        <section style={styles.section}>
            <h2 style={styles.heading}>
                Order Fresh Organic Veggies on WhatsApp! 🌿
            </h2>
            <p style={styles.subheading}>
                Scan the QR code below to join our group and place your order instantly.
            </p>
            <img
                src={QR_IMAGE}
                alt="WhatsApp Group QR Code"
                style={styles.qr}
            />
            <br />
            <a href={WHATSAPP_GROUP_LINK} target="_blank" rel="noopener noreferrer">
                <button style={styles.button}>
                    Join WhatsApp Group
                </button>
            </a>
        </section>
    );
}