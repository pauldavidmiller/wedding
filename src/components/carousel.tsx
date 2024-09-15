import React, { useState, useEffect } from "react";

type CarouselProps = {
  images: string[];
  interval?: number;
  arrowsEnabled?: boolean;
};

const Carousel = ({
  images,
  interval = 7500,
  arrowsEnabled = false,
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel">
      <button
        hidden={!arrowsEnabled}
        className="carousel-button prev"
        onClick={handlePrev}
      >
        <span className="arrow-left" />
      </button>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="carousel-image"
      />
      <button
        hidden={!arrowsEnabled}
        className="carousel-button next"
        onClick={handleNext}
      >
        <span className="arrow-right" />
      </button>
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`carousel-indicator ${
              currentIndex === index ? "active" : ""
            }`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
