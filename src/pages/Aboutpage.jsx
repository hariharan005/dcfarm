// File: src/pages/AboutPage.jsx
import React, { useEffect, useState } from "react";
import "../css/Aboutpage.css";
import Hero from "../assets/images/grapes.jpg"

// NOTE: replace placeholder image URLs with your own images (in /public or imported assets).
const HERO_IMAGE = Hero; // e.g. public/images/farm-hero.jpg
const TEAM_PLACEHOLDER = Hero;

const coreValues = [
    {
        title: "Sustainability",
        description:
            "We prioritize regenerative farming practices — building soil health, reducing chemical inputs, and conserving water.",
        icon: "🌱",
    },
    {
        title: "Quality & Transparency",
        description:
            "Full traceability from seed to shelf; we believe customers should know where their food comes from.",
        icon: "✅",
    },
    {
        title: "Community",
        description: "Supporting local farmers, hiring locally, and running workshops for the community.",
        icon: "🤝",
    },
    {
        title: "Innovation",
        description: "Using tech and education to improve yields responsibly and make farming accessible.",
        icon: "💡",
    },
];

const teamMembers = [
    {
        name: "Hariharan Chellamuthu",
        role: "Founder & Head Farmer",
        bio: "Started the farm with a small plot and a big dream — expert in organic techniques and community outreach.",
        img: TEAM_PLACEHOLDER,
    },
    {
        name: "Archana Hariharan",
        role: "Operations & Markets",
        bio: "Manages market relationships, packaging and customer education programs.",
        img: TEAM_PLACEHOLDER,
    },
    {
        name: "Shamnath",
        role: "Soil & Agronomy Specialist",
        bio: "Focuses on soil biology, compost program and crop planning.",
        img: TEAM_PLACEHOLDER,
    },
];

const timeline = [
    { year: "2018", event: "Started as a 1-acre experimental organic plot." },
    { year: "2019", event: "First local farmers' market stall and community workshops." },
    { year: "2021", event: "Expanded to supply 5 local grocers." },
    { year: "2024", event: "Implemented drip-irrigation and composting program." },
];

export default function AboutPage() {
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        // Intersection Observer to animate sections on scroll
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add("is-visible");
                });
            },
            { threshold: 0.12 }
        );

        document.querySelectorAll(".a-animate").forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="about-page">
            <header className="about-hero" role="banner" style={{
                backgroundImage: `linear-gradient(rgba(6,10,13,0.45), rgba(6,10,13,0.25)), url(${HERO_IMAGE})`,
            }}>
                <div className="container">
                    <nav className="breadcrumb" aria-label="Breadcrumb">
                        <a href="/">Home</a>
                        <span aria-hidden="true">/</span>
                        <span>About</span>
                    </nav>

                    <div className="hero-content a-animate">
                        <h1>About Our Farm</h1>
                        <p className="lead">
                            Dedicated to sustainable farming practices — delivering fresh produce while caring for the
                            environment and community.
                        </p>
                        <div className="hero-cta">
                            <a className="btn btn-primary" href="#contact">Visit / Contact Us</a>
                            <a className="btn btn-ghost" href="#values">Our Values</a>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container main-grid">
                {/* Overview + Vision/Mission */}
                <section id="overview" className="card overview a-animate" aria-labelledby="overview-title">
                    <h2 id="overview-title">Company Overview</h2>
                    <div className="overview-grid">
                        <article>
                            <h3>Who we are</h3>
                            <p>
                                We are a family-driven organic farm focused on producing seasonal vegetables, herbs, and
                                sustainably-made value-added products. Founded from curiosity and community need, our
                                methods are rooted in soil health and local partnerships.
                            </p>

                            <h3>What we grow</h3>
                            <p>
                                Seasonal vegetables, culinary herbs, millets & pulses, and handcrafted preserves. We
                                prioritize crop diversity to support resilient ecosystems.
                            </p>

                            <h3>Why we started</h3>
                            <p>
                                To restore small-scale farming as a viable, rewarding livelihood while giving consumers
                                direct access to transparent, high-quality produce.
                            </p>
                        </article>

                        <aside className="mission">
                            <h3>Vision</h3>
                            <p>
                                To lead the way in sustainable farming — inspiring communities to embrace eco-friendly
                                agriculture and healthy living for generations to come.
                            </p>

                            <h3>Mission</h3>
                            <p>
                                Empower farmers and consumers through innovative solutions, education, and responsible
                                practices that promote growth, sustainability, and well-being.
                            </p>

                            <button
                                className="btn btn-outline"
                                aria-expanded={expanded}
                                onClick={() => setExpanded((s) => !s)}
                            >
                                {expanded ? "Hide our approach" : "Read our approach in detail"}
                            </button>

                            {expanded && (
                                <div className="approach">
                                    <h4>Our Practical Approach</h4>
                                    <ul>
                                        <li>Soil-first cropping: compost, cover-crops, crop rotation.</li>
                                        <li>Water efficiency: drip lines, mulch and rain-catchment systems.</li>
                                        <li>Integrative pest management (IPM): biological controls & habitat planning.</li>
                                        <li>Local economic integration: training, co-ops and shared processing space.</li>
                                    </ul>
                                </div>
                            )}
                        </aside>
                    </div>
                </section>

                {/* Core Values */}
                <section id="values" className="card values a-animate" aria-labelledby="values-title">
                    <h2 id="values-title">Core Values</h2>
                    <div className="values-grid">
                        {coreValues.map((v) => (
                            <article key={v.title} className="value-card">
                                <div className="value-icon" aria-hidden>
                                    <span>{v.icon}</span>
                                </div>
                                <div className="value-body">
                                    <h4>{v.title}</h4>
                                    <p>{v.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* Team */}
                <section id="team" className="card team a-animate" aria-labelledby="team-title">
                    <h2 id="team-title">Meet the Team</h2>
                    <p className="muted">Small, skilled, and deeply invested — here are the people behind the produce.</p>

                    <div className="team-grid">
                        {teamMembers.map((t) => (
                            <figure className="team-card" key={t.name}>
                                <img src={t.img} alt={`${t.name} — ${t.role}`} loading="lazy" />
                                <figcaption>
                                    <h4>{t.name}</h4>
                                    <small className="role">{t.role}</small>
                                    <p>{t.bio}</p>
                                </figcaption>
                            </figure>
                        ))}
                    </div>
                </section>

                {/* Timeline */}
                <section id="journey" className="card timeline a-animate" aria-labelledby="journey-title">
                    <h2 id="journey-title">Our Journey</h2>
                    <div className="timeline-wrap">
                        <div className="timeline-line" aria-hidden />
                        {timeline.map((t, i) => (
                            <div key={t.year} className={`timeline-item ${i % 2 === 0 ? "left" : "right"}`}>
                                <div className="timeline-dot" />
                                <div className="timeline-content">
                                    <time>{t.year}</time>
                                    <p>{t.event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Sustainability + Community */}
                <section id="sustainability" className="card sustainability a-animate" aria-labelledby="sustainability-title">
                    <h2 id="sustainability-title">Sustainability Practices</h2>
                    <div className="sustainability-grid">
                        <article>
                            <h3>Soil & Compost</h3>
                            <p>
                                We run an on-site composting program, use green manures and rotate crops to rebuild
                                organic matter.
                            </p>
                        </article>

                        <article>
                            <h3>Water Management</h3>
                            <p>
                                Rainwater harvesting, drip irrigation and mulching help us reduce water usage while
                                maintaining yields.
                            </p>
                        </article>

                        <article>
                            <h3>Biodiversity</h3>
                            <p>
                                Native hedges, pollinator strips and mixed cropping increase resilience and pest control.
                            </p>
                        </article>

                        <article>
                            <h3>Low-Carbon Practices</h3>
                            <p>
                                Responsible fuel use, efficient transport planning and exploring solar for processing
                                units.
                            </p>
                        </article>
                    </div>
                </section>

                {/* Community engagement */}
                <section id="community" className="card community a-animate" aria-labelledby="community-title">
                    <h2 id="community-title">Community Engagement</h2>
                    <ul>
                        <li>Weekly farm tours and seasonal workshops for students and local cooks.</li>
                        <li>Buy-back & training program for smallholder farmers to scale responsibly.</li>
                        <li>Volunteer days for composting and native tree planting.</li>
                    </ul>
                </section>

                {/* CTA + Contact */}
                <section id="contact" className="card contact a-animate" aria-labelledby="contact-title">
                    <h2 id="contact-title">Visit or Get in Touch</h2>
                    <p>
                        We welcome visitors by appointment. If you'd like a farm tour, wholesale inquiry, or to
                        collaborate, please reach out.
                    </p>
                    <div className="contact-grid">
                        <address>
                            <strong>Harvest & Hearth Farm</strong>
                            <div>Village Road, Near Greenfield, Tamil Nadu</div>
                            <div>Phone: +91 98X XX0 XXXX</div>
                            <div>
                                Email: <a href="mailto:hello@harvestfarm.example">hello@harvestfarm.example</a>
                            </div>
                        </address>

                        <div className="contact-actions">
                            <a className="btn btn-primary" href="/book-visit">Book a visit</a>
                            <a className="btn btn-ghost" href="/shop">Shop our produce</a>
                        </div>
                    </div>
                </section>

                {/* Footer small credit */}
                <footer className="card muted small a-animate">
                    <p>
                        Founded with a desire to grow responsibly. Want this page converted into smaller components
                        (Team, Timeline, Values) for reuse? I can split them into separate files.
                    </p>
                </footer>
            </main>
        </div>
    );
}

