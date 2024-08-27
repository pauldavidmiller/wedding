import React, { useState } from "react";
import Checkbox from "./checkbox";
import plusOneAllowList from "../data/plusOneAllowList.json";
import axios from "axios";
import jaroWinkler from "../data/jarowinkler";
import levenshtein from "../data/levenshtein";

function RSVPSection() {
  const [fullName, setFullName] = useState("");
  const [plusOne, setPlusOne] = useState(false);
  const [plusOneFullName, setPlusOneFullName] = useState("");
  const [response, setResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const canHavePlusOne =
    plusOneAllowList.find((po) => {
      var allowListFullName = (po.firstName + " " + po.lastName).toLowerCase();
      var enteredFullNameArr = fullName.split(" ");
      var enteredFullName = [
        enteredFullNameArr[0],
        enteredFullNameArr[enteredFullNameArr.length - 1],
      ]
        .join(" ")
        .toLowerCase();
      return (
        jaroWinkler(allowListFullName, enteredFullName, 0) >= 0.9 ||
        levenshtein(allowListFullName, enteredFullName) <= 5
      );
    }) != null;

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Check if plus one name is required
    if (plusOne && !plusOneFullName) {
      setErrorMessage("Please provide your plus one's name.");
      return;
    }

    try {
      const res = await axios.post("/api/notify", {
        fullName,
        plusOneFullName,
      });
      setResponse(res.data);
      setErrorMessage(""); // Clear any previous error messages
      alert("RSVP sent successfully!");
    } catch (error) {
      console.error("Error sending notification:", error);
      setResponse({ success: false, error });
      setErrorMessage(
        `Failed to send RSVP. Please try again later. ${response.error}`
      );
      alert(errorMessage);
    }
  };

  return (
    <section id="rsvp" className="rsvp">
      <h2 className="text-4xl font-bold">RSVP</h2>
      <form className="rsvp-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First and Last Name"
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        {canHavePlusOne && (
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
        )}
        <button type="submit" className="bg-red-500">
          Send RSVP
        </button>
      </form>
    </section>
  );
}

export default RSVPSection;
