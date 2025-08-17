import React, { useState, useEffect, useRef } from "react";
import "./Carousel.css";

const slides = [
  { title: "Ziara", description: "Discover Lebanon in a whole new way.", image: "/image/intro.png", bgColor: "#faf0e6", fontFamily: "'Rampart One', cursive" },
  { title: "Discover Lebanon Like Never Before", description: "Explore hidden gems, cultural wonders, and local experiences—all in one app.", image: "/image/map.png", bgColor: "#ffe2b6ff" },
  { title: "From Ancient Ruins to Sacred Spaces", description: "Visit Lebanon’s rich history and diverse spiritual landmarks.", image: "/image/window.png", bgColor: "#fff5e6" },
  { title: "Ask the Locals, Get Insider Tips", description: "Chat, ask questions, or discover new places—all through AI chat.", image: "/image/Car.png", bgColor: "#ffe2b6ff" },
  { title: "Dine Like a Local", description: "Discover traditional Lebanese restaurants and street-food favorites.", image: "/image/Hummus.png", bgColor: "#fff5e6" },
  { title: "Support Local & Take Home a Memory", description: "Browse souvenirs and handcrafted treasures from small Lebanese businesses.", image: "/image/tarbushPackage.png", bgColor: "#ffe2b6ff" },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  // === Autoplay (every 3s) ===
  const AUTO_DELAY = 2000; // 2seconds
  const autoRef = useRef(null);
  const startAuto = () => {
    if (autoRef.current || slides.length <= 1) return;
    autoRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_DELAY);
  };
  const stopAuto = () => {
    if (autoRef.current) {
      clearInterval(autoRef.current);
      autoRef.current = null;
    }
  };
  useEffect(() => {
    startAuto();
    return stopAuto; // cleanup
  }, []);

  const safeMod = (i) => ((i % slides.length) + slides.length) % slides.length;
  const currentIndex = safeMod(index);
  const { title, description, image, bgColor, fontFamily } = slides[currentIndex];

  const prevSlide = () => {
    stopAuto();
    setIndex((i) => safeMod(i - 1));
    startAuto();
  };
  const nextSlide = () => {
    stopAuto();
    setIndex((i) => safeMod(i + 1));
    startAuto();
  };

  const onTouchStart = (e) => {
    stopAuto();
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || touchEnd == null) { startAuto(); return; }
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) nextSlide();
    if (distance < -minSwipeDistance) prevSlide();
    startAuto();
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
          gap: "8px",
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={(e) => { stopAuto(); setTouchStart(e.clientX); }}
        onMouseUp={(e) => { setTouchEnd(e.clientX); onTouchEnd(); }}
        onMouseEnter={stopAuto}
        onMouseLeave={startAuto}
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
            padding: "0 5px",
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
            onClick={() => {
              stopAuto();
              setIndex(idx);
              startAuto();
            }}
          />
        ))}
      </div>
    </div>
  );
}
