import React from "react";
import hotelsData from "../data/hotels.json";
import { Section } from "../types/section";
import PageSection, { SectionVariant } from "./page-section";

const HotelsSection = () => {
  return (
    <PageSection
      id={Section.Hotels}
      title="Nearby Hotels"
      variant={SectionVariant.dark}
    >
      <div className="hotels-list">
        {hotelsData.map((hotel, index) => (
          <div className="hotel-item" key={index}>
            <div className="flex flex-col">
              <h3 className="hotel-name">{hotel.name}</h3>
              <p className="hotel-address">{hotel.address}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <p className="hotel-phone">
                  <a href={`tel:+${hotel.phoneNumber}`}>
                    {hotel.phoneNumberString}
                  </a>
                </p>
                <a
                  className="hotel-link"
                  href={hotel.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website Link
                </a>
              </div>
            </div>
            <button
              type="button"
              className="hotel-block-button"
              onClick={() => window.open(hotel.reservationLink, "_blank")}
            >
              Reserve With Our Wedding Block
            </button>
            <img alt="Hotel Directions" src={hotel.image} />
          </div>
        ))}
      </div>
    </PageSection>
  );
};

export default HotelsSection;
