import React, { useState } from "react";

const images = [
  "/images/us10.jpg",
  "/images/us20.jpg",
  "/images/us30.jpg",
  "/images/us40.jpg",
  "/images/us50.HEIC",
  "/images/us60.HEIC",
  "/images/us70.HEIC",
  "/images/us80.jpg",
  "/images/us90.jpg",
  "/images/us100.jpg",
  "/images/us110.jpg",
];

const GallerySection = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="gallery">
      <h2>Gallery</h2>
      <div className="gallery-container">
        <button className="nav-button prev" onClick={handlePrev}>
          &lt;
        </button>

        <div className="gallery-wrapper">
          {images.map((image, index) => {
            let position = "hidden"; // Default hidden position

            // Calculate image positions based on current index
            if (index === currentIndex) {
              position = "center";
            } else if (index === (currentIndex + 1) % images.length) {
              position = "right";
            } else if (
              index ===
              (currentIndex - 1 + images.length) % images.length
            ) {
              position = "left";
            }

            return (
              <div
                key={index}
                className={`image-container ${position}`}
                style={{ backgroundImage: `url(${image})` }}
                onClick={() => {
                  if (position === "left") {
                    handlePrev();
                  } else if (position === "right") {
                    handleNext();
                  }
                }}
              />
            );
          })}
        </div>

        <button className="nav-button next" onClick={handleNext}>
          &gt;
        </button>
      </div>
    </section>
  );
};

export default GallerySection;
