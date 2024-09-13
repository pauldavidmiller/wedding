import React, { useState } from "react";
import Checkbox from "./checkbox";
import plusOneAllowList from "../data/plusOneAllowList.json";
import axios from "axios";
import jaroWinkler from "../data/jarowinkler";
import levenshtein from "../data/levenshtein";
import DinnerChoice, { DinnerChoiceType } from "./dinner-choice";

function RSVPSection() {
  const [fullName, setFullName] = useState("");
  const [isBringingPlusOne, setIsBringingPlusOne] = useState(false);
  const [plusOneFullName, setPlusOneFullName] = useState("");
  const [dinnerChoice, setDinnerChoice] = useState<DinnerChoiceType>(null);
  const [plusOneDinnerChoice, setPlusOneDinnerChoice] =
    useState<DinnerChoiceType>(null);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string>("");

  const allowedPlusOne =
    plusOneAllowList.find((po) => {
      var allowListFullName = (po.firstName + " " + po.lastName).toLowerCase();
      var enteredFullNameArr = fullName.trim().split(" ");
      if (enteredFullNameArr.length <= 1) {
        return false;
      }
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

    // Check if name and dinner choice is entered
    if (!fullName.trim() || !dinnerChoice) {
      alert("Please enter your name and dinner choice!");
      return;
    }

    // Check if plus one name is required
    if (
      isBringingPlusOne &&
      (!plusOneFullName.trim() || !plusOneDinnerChoice)
    ) {
      alert("Please provide your plus one's name and dinner choice!");
      return;
    }

    try {
      const res = await axios.post("/api/notify", {
        fullName,
        dinnerChoice,
        plusOneFullName,
        plusOneDinnerChoice,
        dietaryRestrictions,
      });
      if (res?.data?.success) {
        alert("RSVP sent successfully!");
      } else {
        alert("RSVP failed to send!");
      }
    } catch (error: any) {
      console.error("Error sending notification:", error);
      alert("RSVP failed to send!");
    }
  };

  return (
    <section id="rsvp" className="rsvp">
      <h2>RSVP</h2>
      <form className="rsvp-form" autoComplete="off" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First and Last Name"
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <DinnerChoice
          name="primary"
          selectedOption={dinnerChoice}
          setSelectedOption={setDinnerChoice}
          title="Dinner choice"
        />
        {allowedPlusOne && (
          <div className="guest-info">
            <div className="flex flex-col">
              <Checkbox
                isChecked={isBringingPlusOne}
                setIsChecked={setIsBringingPlusOne}
                label="Plus One"
              />
              {isBringingPlusOne && (
                <>
                  <input
                    id="guest-name"
                    className="guest-name"
                    value={plusOneFullName}
                    onChange={(e) => setPlusOneFullName(e.target.value)}
                    placeholder="Guest's Name"
                    required
                  />
                  <DinnerChoice
                    name="plusOne"
                    selectedOption={plusOneDinnerChoice}
                    setSelectedOption={setPlusOneDinnerChoice}
                    title="Plus One's dinner choice"
                  />
                </>
              )}
            </div>
          </div>
        )}
        <fieldset className="dietary-restrictions">
          <legend>Dietary Restrictions:</legend>
          <textarea
            placeholder="Enter any dietary restrictions for all attendees here..."
            onChange={(e) => setDietaryRestrictions(e.target.value)}
          />
        </fieldset>
        <button type="submit" className="bg-red-500">
          Send RSVP
        </button>
      </form>
    </section>
  );
}

export default RSVPSection;
