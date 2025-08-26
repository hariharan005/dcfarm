import React from "react";
import { motion } from "framer-motion";
import "../css/Journey.css";

// Sample video data (replace with your own YouTube videos)
const videos = [
  {
    id: 1,
    title: "Morning Farm Work 🌱",
    date: "2025-08-01",
    url: "https://www.youtube.com/embed/tgbNymZ7vqY",
    description: "Starting the day with watering and soil care.",
  },
  {
    id: 2,
    title: "Community Donation ❤️",
    date: "2025-08-05",
    url: "https://www.youtube.com/embed/tgbNymZ7vqY",
    description: "Donated fresh veggies to the local community.",
  },
  {
    id: 3,
    title: "Harvesting Time 🚜",
    date: "2025-08-10",
    url: "https://www.youtube.com/embed/tgbNymZ7vqY",
    description: "Celebrating our first organic harvest!",
  },
];

export default function JourneyPage() {
  return (
    <div className="journey-container">
      {/* Hero Section */}
      <div
        className="journey-hero"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3')",
        }}
      >
        <div className="journey-hero-overlay">
          <h1>My Organic Farming Journey</h1>
          <p>“Every seed has a story. This is mine.”</p>
          <iframe
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
            title="Intro Video"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="journey-timeline">
        <h2>Journey Timeline</h2>

        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            className={`timeline-item ${
              index % 2 === 0 ? "timeline-item-left" : "timeline-item-right"
            }`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="timeline-dot"></div>
            <h3>{video.title}</h3>
            <p className="date">{video.date}</p>
            <p>{video.description}</p>
            <iframe src={video.url} title={video.title} allowFullScreen></iframe>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="journey-cta">
        <h2>Follow My Journey</h2>
        <p>
          Subscribe to my YouTube channel and join me in growing a sustainable
          future.
        </p>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          🌿 Subscribe on YouTube
        </a>
      </div>
    </div>
  );
}
