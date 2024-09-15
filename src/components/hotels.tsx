import React from "react";
import hotelsData from "../data/hotels.json";
import { Section } from "../types/section";

const HotelsSection = () => {
  return (
    <section id={Section.Hotels} className="hotels-section">
      <h2 className="hotels-title">Nearby Hotels</h2>
      <div className="hotels-list">
        {hotelsData.map((hotel, index) => (
          <div className="hotel-item" key={index}>
            <h3 className="hotel-name">{hotel.name}</h3>
            <p className="hotel-address">{hotel.address}</p>
            <p className="hotel-phone">
              <a href="tel:+2014463301">{hotel.phone}</a>
            </p>
            <a
              className="hotel-link"
              href={hotel.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Website Link
            </a>
            <img alt="Hotel Directions" src={hotel.image} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HotelsSection;
