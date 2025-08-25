import React, { useState, useEffect, useRef } from "react";
import Logo from "../assets/images/icons/Logo.png";
import "../css/Header.css";

const navItems = [
  { name: "Home", href: "#" },
  { name: "About", href: "#" },
  { name: "Products", href: "#" },
  { name: "Contact", href: "#" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);

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
        <a className="logo-container" href="/" aria-label="HA Farm home">
          <img src={Logo} alt="HA Farm logo" className="logo" />
        </a>
        <span className="header-brand-name">HA Farm</span>
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
          <a
            key={item.name}
            href={item.href}
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            {item.name}
          </a>
        ))}
      </nav>
    </header>
  );
}
