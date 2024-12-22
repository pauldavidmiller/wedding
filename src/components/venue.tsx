import React from "react";
import Carousel from "./carousel";
import { Section } from "../types/section";
import { useAppContext } from "../contexts/app-context";

const VenueSection = () => {
  const { venueName, venuAddress } = useAppContext();

  return (
    <section id={Section.Venue} className="venue-section">
      <h2 className="venue-title">Venue</h2>
      <div className="venue-details">
        <p className="venue-name">{venueName}</p>
        <p className="venue-address">{venuAddress}</p>
        <p className="venue-description">
          Join us at the beautiful {venueName} for an unforgettable celebration
          of love. The venue features historic art and painting alongside
          elegant decor that will make our special day even more magical.
        </p>
      </div>
      <div className="venue-displays">
        <div className="venue-map">
          <iframe
            title="Venue Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.217907275369!2d-76.61962052440967!3d39.32647634203747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c805f09b021b35%3A0xfb35840c1a0132fc!2sBaltimore%20Museum%20of%20Art!5e0!3m2!1sen!2sus!4v1693085966781!5m2!1sen!2sus"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <Carousel className="sm:w-full md:w-full lg:w-1/2 xl:w-1/2 2xl:w-1/2" />
      </div>
    </section>
  );
};

export default VenueSection;
