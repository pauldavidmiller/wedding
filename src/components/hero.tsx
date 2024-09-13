import React, { useEffect, useState } from "react";

const HeroSection = () => {
  const images = [
    "/images/bma1.jpg",
    "/images/bma2.jpg",
    "/images/bma3.avif",
    // Add more images as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex: number) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000); // Change the image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="hero" className="hero">
      <img
        src={images[currentIndex]}
        alt="Hero"
        className="w-full h-full object-cover rounded-2xl z-50"
      />
    </section>
  );
};

export default HeroSection;
