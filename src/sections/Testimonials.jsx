import React from "react";
import "../css/Testimonial.css";
import ProfilePic1 from "../assets/images/profile1.jpg"; // Replace with actual image path
import ProfilePic2 from "../assets/images/profile2.jpg";
import ProfilePic3 from "../assets/images/profile3.jpg";
import ProfilePic4 from "../assets/images/profile4.jpg";
import ProfilePic5 from "../assets/images/profile5.jpg";

const testimonials = [
    {
        text: "HA Farm made my farming journey so much easier. Highly recommended!",
        rating: 5,
    },
    {
        text: "Excellent customer support and reliable products. Will buy again.",
        rating: 5,
    },
    {
        text: "The platform is user-friendly and the results exceeded my expectations.",
        rating: 5,
    },
    {
        text: "Fast delivery and great quality. My crops are thriving!",
        rating: 5,
    },
    {
        text: "I appreciate the transparency and professionalism. Five stars!",
        rating: 5,
    },
];

function StarRow({ count }) {
    return (
        <div style={{ color: "#FFD700", fontSize: "1.5rem", marginBottom: "0.5rem" }}>
            {Array.from({ length: count }).map((_, i) => (
                <span key={i}>★</span>
            ))}
        </div>
    );
}

function TestimonialCard({ text, rating, image }) {
    return (
        <div className="testimonial-card">
            <div className="testimonial-notch">
                <img
                    src={image}
                    alt="User"
                    className="testimonial-user-img"
                    style={{ borderRadius: "50%", width: 40, height: 40 }}
                />
            </div>
            <StarRow count={rating} />
            <div className="testimonial-text">{text}</div>
        </div>
    );
}

export default function Testimonials() {
    const profileImages = [ProfilePic1, ProfilePic2, ProfilePic3, ProfilePic4, ProfilePic5];
    return (
        <section className="testimonials-section">
            <h2 className="testimonials-title">Testimonials</h2>
            <div className="testimonials-list">
                {testimonials.map((t, i) => (
                    <TestimonialCard
                        key={i}
                        text={t.text}
                        rating={t.rating}
                        image={profileImages[i % profileImages.length]}
                    />
                ))}
            </div>
        </section>
    );
}
