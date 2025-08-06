import React, { useState } from "react";
import "./Carousel.css";

const slides = [
  {
    title: "Ziara",
    description: "Discover Lebanon in a whole new way.",
    image: "/image/intro.png",
    bgColor: "#faf0e6",
    fontFamily: "'Rampart One', cursive",
  },
  {
    title: "Discover Lebanon Like Never Before",
    description:
      "Explore hidden gems, cultural wonders, and local experiences—all in one app.",
    image: "/image/map.png",
    bgColor: "#FAC75C",
  },
  {
    title: "From Ancient Ruins to Sacred Spaces",
    description: "Visit Lebanon’s rich history and diverse spiritual landmarks.",
    image: "/image/window.png",
    bgColor: "#fff5e6",
  },
  {
    title: "Ask the Locals, Get Insider Tips",
    description: "Chat, ask questions, or discover new places—all through AI chat.",
    image: "/image/Car.png",
    bgColor: "#FAC75C",
  },
  {
    title: "Dine Like a Local",
    description: "Discover traditional Lebanese restaurants and street-food favorites.",
    image: "/image/Hummus.png",
    bgColor: "#fff5e6",
  },
  {
    title: "Support Local & Take Home a Memory",
    description:
      "Browse souvenirs and handcrafted treasures from small Lebanese businesses.",
    image: "/image/tarbushPackage.png",
    bgColor: "#FAC75C",
  },
];

export default function Carousel() {


  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const currentIndex = ((index % slides.length) + slides.length) % slides.length;
  const { title, description, image, bgColor, fontFamily } = slides[currentIndex];

  const prevSlide = () => setIndex(i => (i - 1 + slides.length) % slides.length);
  const nextSlide = () => setIndex(i => (i + 1) % slides.length);

  const onTouchStart = e => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = e => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) nextSlide();
    if (distance < -minSwipeDistance) prevSlide();
  };
  if (!slides || slides.length === 0) return null;
  return (
    <div className="carousel">
      <div
        className="slide"
        style={{
          backgroundColor: bgColor,
          fontFamily,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "500px",
          gap: "8px",          // reduced gap between image and text
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={e => setTouchStart(e.clientX)}
        onMouseUp={e => {
          setTouchEnd(e.clientX);
          onTouchEnd();
        }}
      >
        <img
          src={image}
          alt={title}
          style={{ flex: "0 0 50%", maxHeight: "80%", width: "auto" }}
        />

        <div
          className="slide-content"
          style={{
            flex: "0 0 50%",
            textAlign: "left",
            padding: "0 5px",    // tighter padding
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2 style={{ fontSize: "2.5rem" }}>{title}</h2>
          {description && <p style={{ fontSize: "1.2rem" }}>{description}</p>}
        </div>
      </div>

      <div className="dots">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`dot${idx === currentIndex ? " active" : ""}`}
            onClick={() => setIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}
