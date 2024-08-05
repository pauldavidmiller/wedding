import { useState } from "react";

function RSVPSection() {
  const [numberOfGuests, setNumberOfGuests] = useState(0);
  const [guestName, setGuestName] = useState("");

  const handleGuestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberOfGuests(Number(event.target.value));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuestName(event.target.value);
  };

  return (
    <section id="rsvp" className="rsvp">
      <h2 className="text-4xl font-bold">RSVP</h2>
      <form className="rsvp-form">
        <input type="text" placeholder="Name" required />
        <input type="email" placeholder="Email" required />
        <div className="guest-info">
          <label htmlFor="guests">Number of Additional Guests (+1):</label>
          <div className="flex flex-row gap-8">
            <input
              id="guests"
              type="number"
              min="0"
              value={numberOfGuests}
              onChange={handleGuestChange}
              placeholder="0"
            />
            {numberOfGuests > 0 && (
              <input
                id="guest-name"
                className="guest-name"
                value={guestName}
                onChange={handleNameChange}
                placeholder="Your Name"
                required
              />
            )}
          </div>
        </div>
        <button type="submit" className="bg-red-500">
          Send RSVP
        </button>
      </form>
    </section>
  );
}

export default RSVPSection;
