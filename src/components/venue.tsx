type VenueSectionProps = {
  venueName: string;
};

const VenueSection = ({ venueName }: VenueSectionProps) => {
  return (
    <section id="venue" className="venue-section">
      <h2 className="venue-title">Venue</h2>
      <div className="venue-details">
        <p className="venue-name">{venueName}</p>
        <p className="venue-address">1 E Chase St, Baltimore, MD 21202, USA</p>
        <p className="venue-description">
          Join us at the beautiful Belvedere for an unforgettable celebration of
          love. The venue features elegant decor that will make our special day
          even more magical.
        </p>
      </div>
      <div className="venue-map">
        <iframe
          title="Venue Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3090.479191368325!2d-76.61620168481587!3d39.30002417951414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c803f3b0ae25cf%3A0x5c3e4f2a4f82ed12!2sThe%20Belvedere!5e0!3m2!1sen!2sus!4v1614842527872!5m2!1sen!2sus"
          width="600"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default VenueSection;
