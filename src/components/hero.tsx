import React, { useEffect, useState } from "react";

type HeroSectionProps = {
  venueName: string;
  date: string;
};

const HeroSection = ({ venueName, date }: HeroSectionProps) => {
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
      <div className="hero-content">
        <h1 className="text-5xl font-bold pt-8 cursive-font">
          Welcome to the Wedding of
        </h1>
        <h2 className="text-4xl font-bold oswald-font">Margot and Paul</h2>
        <h3 className="text-2xl font-bold pt-2">{date}</h3>
        <p className="text-xl">
          We are so excited to celebrate with you at the {venueName}!
        </p>
      </div>
      <img
        src={images[currentIndex]}
        alt="Hero"
        className="w-full h-screen object-cover"
      />
    </section>
  );
};

export default HeroSection;
