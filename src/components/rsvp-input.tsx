import React from "react";
import DinnerChoiceSelect from "./dinner-choice-select";
import { DinnerChoice } from "../types/dinner-choice";
import { AttendingChoice } from "../types/attending-choice";
import AttendingChoiceSelect from "./attending-choice-select";

type RsvpInputProps = {
  name: string;
  setName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rsvpKey: string;
  attendingChoice: AttendingChoice | null;
  setAttendingChoice: (attendingChoice: AttendingChoice) => void;
  dinnerChoice: DinnerChoice;
  setDinnerChoice: (dinnerChoice: DinnerChoice) => void;
  hasDinnerChoiceNone?: boolean;
  dietaryRestrictions: string;
  setDietaryRestrictions: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
};

const RsvpInput = ({
  name,
  setName,
  rsvpKey,
  attendingChoice,
  setAttendingChoice,
  dinnerChoice,
  setDinnerChoice,
  hasDinnerChoiceNone,
  dietaryRestrictions,
  setDietaryRestrictions,
  disabled,
  className,
}: RsvpInputProps) => {
  return (
    <fieldset disabled={disabled} className={`rsvp-input ${className}`}>
      <div className="rsvp-input-section">
        <legend>Full Name:</legend>
        <input
          type="text"
          placeholder="First and Last Name"
          value={name}
          onChange={setName}
          disabled={disabled}
          required
        />
      </div>
      <div className="rsvp-input-section">
        <AttendingChoiceSelect
          name={rsvpKey}
          selectedOption={attendingChoice}
          setSelectedOption={setAttendingChoice}
          disabled={disabled}
        />
      </div>
      {attendingChoice === AttendingChoice.Yes && (
        <>
          <div className="rsvp-input-section">
            <legend>Dinner Choice:</legend>
            <DinnerChoiceSelect
              name={rsvpKey}
              selectedOption={dinnerChoice}
              setSelectedOption={setDinnerChoice}
              disabled={disabled}
              hasNone={hasDinnerChoiceNone}
            />
          </div>
          <div className="rsvp-input-section">
            <legend>Dietary Restrictions:</legend>
            <input
              type="text"
              value={dietaryRestrictions}
              placeholder="Shellfish"
              onChange={setDietaryRestrictions}
              disabled={disabled}
            />
          </div>
        </>
      )}
    </fieldset>
  );
};

export default RsvpInput;
