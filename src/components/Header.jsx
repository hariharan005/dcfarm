import React from "react";
import Logo from '../assets/images/icons/Logo.png';


const navItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Products", href: "#" },
    { name: "Contact", href: "#" },
];

export default function Header() {
    return (
        <header
            style={{
                background: "linear-gradient(90deg, rgba(8,45,15,0.7) 0%, rgba(217,186,11,0.3) 100%)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderBottom: "1px solid rgba(255,255,255,0.15)",
                padding: "0.5rem 2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                boxSizing: "border-box",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1000,
            }}
        >
            {/* Left: Logo and Brand */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {/* Logo */}
                <div
                    style={{
                        width: 48,
                        height: 48,
                        background: "rgba(8,45,15,0.5)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid #d9ba0b",
                        boxShadow: "0 2px 8px rgba(8,45,15,0.15)",
                        overflow: "hidden",
                    }}
                >
                    {/* Replace SVG with your image */}
                    <img
                        src= {Logo}
                        alt="Logo"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </div>
                    
                {/* Brand Name */}
                <span
                    style={{
                        fontSize: "1.7rem",
                        fontWeight: 700,
                        color: "#ffffff",
                        letterSpacing: "2px",
                        textShadow: "0 1px 8px #082d0f",
                    }}
                >
                    DC Farm
                </span>
            </div>
            {/* Right: Nav Buttons */}
            <nav style={{ display: "flex", gap: "1rem" }}>
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        style={{
                            padding: "0.5rem 1.2rem",
                            borderRadius: "999px",
                            background: "rgba(217,186,11,0.15)",
                            color: "#ffffff",
                            fontWeight: 500,
                            textDecoration: "none",
                            transition: "all 0.2s",
                            border: "1px solid transparent",
                            boxShadow: "0 1px 4px rgba(8,45,15,0.10)",
                        }}
                        onMouseEnter={e => {
                            e.target.style.background = "#d9ba0b";
                            e.target.style.color = "#082d0f";
                            e.target.style.border = "1px solid #082d0f";
                        }}
                        onMouseLeave={e => {
                            e.target.style.background = "rgba(217,186,11,0.15)";
                            e.target.style.color = "#ffffff";
                            e.target.style.border = "1px solid transparent";
                        }}
                    >
                        {item.name}
                    </a>
                ))}
            </nav>
        </header>
    );
}