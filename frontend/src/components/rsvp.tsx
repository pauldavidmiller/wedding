import { useState } from "react";
import Checkbox from "./checkbox";
import axios from "axios";

function RSVPSection() {
  const [fullName, setFullName] = useState("");
  const [plusOne, setPlusOne] = useState(false);
  const [plusOneFullName, setPlusOneFullName] = useState("");
  const [response, setResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Check if plus one name is required
    if (plusOne && !plusOneFullName) {
      setErrorMessage("Please provide your plus one's name.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/notify", {
        fullName,
        plusOneFullName,
      });
      setResponse(res.data);
      setErrorMessage(""); // Clear any previous error messages
      alert("RSVP sent successfully!");
    } catch (error) {
      console.error("Error sending notification:", error);
      setResponse({ success: false, error });
      setErrorMessage("Failed to send RSVP. Please try again later.");
      alert(errorMessage);
    }
  };

  return (
    <section id="rsvp" className="rsvp">
      <h2 className="text-4xl font-bold">RSVP</h2>
      <form className="rsvp-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <div className="guest-info">
          <div className="flex flex-col">
            <Checkbox
              isChecked={plusOne}
              setIsChecked={setPlusOne}
              label="Plus One"
            />
            {plusOne && (
              <input
                id="guest-name"
                className="guest-name"
                value={plusOneFullName}
                onChange={(e) => setPlusOneFullName(e.target.value)}
                placeholder="Guest's Name"
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
