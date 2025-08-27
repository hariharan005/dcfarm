import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/NotFound.css";

export default function NotFound() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [sand, setSand] = useState([]);

  const handleMouseMove = (e) => {
    const newX = e.clientX;
    const newY = e.clientY;
    setPos({ x: newX, y: newY });

    // create sand particle behind tractor
    const newParticle = {
      id: Date.now(),
      x: newX - 30, // a little behind the tractor
      y: newY + 10,
    };
    setSand((prev) => [...prev.slice(-10), newParticle]); // keep only last 10
  };

  // remove old sand after animation
  useEffect(() => {
    const interval = setInterval(() => {
      setSand((prev) => prev.slice(1));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="notfound-container" onMouseMove={handleMouseMove}>
      <h1 className="notfound-title">404</h1>
      <p className="notfound-text">
        Oops! Looks like this page has wandered off to the farm.
      </p>

      {/* Tractor */}
      <span
        className="tractor-follow"
        style={{ left: pos.x, top: pos.y }}
      >
        🚜
      </span>

      {/* Sand Particles */}
      {sand.map((particle) => (
        <span
          key={particle.id}
          className="sand"
          style={{ left: particle.x, top: particle.y }}
        >
          •
        </span>
      ))}

      <div className="buttons">
        <Link to="/" className="btn">Go Back Home</Link>
        <Link to="/products" className="btn">View Our Products</Link>
      </div>
    </div>
  );
}
