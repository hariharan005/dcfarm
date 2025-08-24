import React, { useState } from "react";
import img1 from "../assets/images/1.jpg";
import img2 from "../assets/images/2.jpg";
import img3 from "../assets/images/3.jpg";
import img4 from "../assets/images/4.jpg";
import img5 from "../assets/images/5.jpg";
import img6 from "../assets/images/6.jpg";
import img7 from "../assets/images/7.jpg";
import img8 from "../assets/images/8.jpg";
import img9 from "../assets/images/9.jpg";
import img10 from "../assets/images/10.jpg";
import img11 from "../assets/images/11.jpg";
import img12 from "../assets/images/12.jpg";
import "../css/Carousel.css";
//import "./Carousel.css"; // Create this CSS file for styling

const images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
];

const Carousel = () => {
    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        setCurrent(current === 0 ? images.length - 1 : current - 1);
    };

    const nextSlide = () => {
        setCurrent(current === images.length - 1 ? 0 : current + 1);
    };

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setCurrent(current === images.length - 1 ? 0 : current + 1);
        }, 3000);
        return () => clearTimeout(timer);
    }, [current]);

    return (
        <section className="carousel-section">
            <div className="carousel-container">
                <div className="carousel-image-wrapper">
                    <img src={images[current]} alt={`Slide ${current + 1}`} className="carousel-image" />
                </div>
            </div>
            <div className="carousel-indicators">
                {images.map((_, idx) => (
                    <span
                        key={idx}
                        className={`indicator ${idx === current ? "active" : ""}`}
                        onClick={() => setCurrent(idx)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Carousel;