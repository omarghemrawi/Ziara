// src/components/Carousel.jsx
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";   // ✅ الترجمة
import "./Carousel.css";

export default function Carousel() {
  const { t } = useTranslation();  // ✅ hook الترجمة

  // ✅ slides من i18n
  const slides = [
    {
      title: t("carousel.slide1.title"),
      description: t("carousel.slide1.desc"),
      image: "/image/intro.png",
      bgColor: "#faf0e6",
      fontFamily: "'Rampart One', cursive",
    },
    {
      title: t("carousel.slide2.title"),
      description: t("carousel.slide2.desc"),
      image: "/image/map.png",
      bgColor: "#ffe2b6ff",
    },
    {
      title: t("carousel.slide3.title"),
      description: t("carousel.slide3.desc"),
      image: "/image/window.png",
      bgColor: "#fff5e6",
    },
    {
      title: t("carousel.slide4.title"),
      description: t("carousel.slide4.desc"),
      image: "/image/Car.png",
      bgColor: "#ffe2b6ff",
    },
    {
      title: t("carousel.slide5.title"),
      description: t("carousel.slide5.desc"),
      image: "/image/Hummus.png",
      bgColor: "#fff5e6",
    },
    {
      title: t("carousel.slide6.title"),
      description: t("carousel.slide6.desc"),
      image: "/image/tarbushPackage.png",
      bgColor: "#ffe2b6ff",
    },
  ];

  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  // Autoplay
  const AUTO_DELAY = 2000;
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
    return stopAuto;
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
    if (!touchStart || touchEnd == null) {
      startAuto();
      return;
    }
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
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={(e) => {
          stopAuto();
          setTouchStart(e.clientX);
        }}
        onMouseUp={(e) => {
          setTouchEnd(e.clientX);
          onTouchEnd();
        }}
        onMouseEnter={stopAuto}
        onMouseLeave={startAuto}
      >
        <img src={image} alt={title} />
        <div className="slide-content">
          <h2>{title}</h2>
          {description && <p>{description}</p>}
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
