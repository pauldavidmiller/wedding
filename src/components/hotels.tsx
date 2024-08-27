import React from "react";
import hotelsData from "../data/hotels.json";

const HotelsSection = () => {
  return (
    <section id="hotels" className="hotels-section">
      <h2 className="hotels-title">Nearby Hotels</h2>
      <div className="hotels-list">
        {hotelsData.map((hotel, index) => (
          <div className="hotel-item" key={index}>
            <h3 className="hotel-name">{hotel.name}</h3>
            <p className="hotel-address">{hotel.address}</p>
            <p className="hotel-phone">{hotel.phone}</p>
            <a
              className="hotel-link"
              href={hotel.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              More Info
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HotelsSection;
