import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom"; // ⬅️ Import Link + useLocation
import Logo from "../assets/images/icons/Logo.png";
import "../css/Header.css";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Products", path: "/products" },
  { name: "Contact", path: "/contact" },
  { name: "Journey", path: "/journey" }, // ⬅️ Route for journey
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const location = useLocation(); // ⬅️ Get current path

  // Close when clicking outside
  useEffect(() => {
    function onClick(e) {
      if (menuOpen && headerRef.current && !headerRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [menuOpen]);

  // Close on ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="header" ref={headerRef}>
      {/* Left: Logo + Brand */}
      <div className="header-left">
        <Link className="logo-container" to="/" aria-label="HA Farm home">
          <img src={Logo} alt="HA Farm logo" className="logo" />
        </Link>
        <span className="header-brand-name">HA Farm</span>
      </div>


      {/* Festival Notification */}
      <div className="festival-banner">
        <p>🙏🐘🌸✨ Happy Vinayagar Chathurthi! Wishing you peace, prosperity, and happiness ✨🌸🐘🙏</p>
      </div>

      {/* Hamburger toggle (mobile) */}
      <button
        className={`menu-toggle ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        aria-controls="site-nav"
        type="button"
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>

      {/* Nav */}
      <nav id="site-nav" className={`nav ${menuOpen ? "active" : ""}`}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`nav-link ${location.pathname === item.path ? "active" : ""}`} // highlight active
            onClick={() => setMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
