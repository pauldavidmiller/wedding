import React from "react";
import hotelsData from "../data/hotels.json";
import { Section } from "../types/section";
import PageSection, { SectionVariant } from "./page-section";

const HotelsSection = () => {
  return (
    <PageSection
      id={Section.Hotel}
      title="Wedding Hotel"
      variant={SectionVariant.pink}
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

            <p className="text-lg">
              We have reserved a room block for our guests at {hotel.shortName}.
              To ensure the wedding rate, please book with the following button
              by <label className="font-bold">{hotel.bookByDate}</label>.
            </p>

            <p className="text-base">
              When booking, please select Monday September 1st for checkout. For
              any desired accommodations that are not shown, please call the
              Study and ask for Daniel Thron and he will be able to assist you
              with your needs. Contact Daniel directly at
              <a
                href={`mailto:${hotel.email}?subject=The%Margot%Bailowitz%and%Paul%Miller%Wedding%Booking`}
              >
                {hotel.email}
              </a>
              .
            </p>

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
