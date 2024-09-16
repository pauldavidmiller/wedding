import React from "react";
import DinnerChoice, { DinnerChoiceType } from "./dinner-choice";

type RsvpInputProps = {
  name: string;
  setName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dinnerChoiceName: string;
  dinnerChoice: DinnerChoiceType;
  setDinnerChoice: (dinnerChoice: DinnerChoiceType) => void;
  dietaryRestrictions: string;
  setDietaryRestrictions: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
};

const RsvpInput = ({
  name,
  setName,
  dinnerChoiceName,
  dinnerChoice,
  setDinnerChoice,
  dietaryRestrictions,
  setDietaryRestrictions,
  disabled,
  className,
}: RsvpInputProps) => {
  return (
    <fieldset disabled={disabled} className={`rsvp-input ${className}`}>
      <div className="rsvp-input-row">
        <legend>Full Name:</legend>
        <input
          type="text"
          placeholder="First and Last Name"
          value={name}
          onChange={setName}
          required
        />
      </div>
      <div className="rsvp-input-row">
        <legend>Dinner Choice:</legend>
        <DinnerChoice
          name={dinnerChoiceName}
          selectedOption={dinnerChoice}
          setSelectedOption={setDinnerChoice}
          disabled={disabled}
        />
      </div>
      <div className="rsvp-input-row">
        <legend>Dietary Restrictions:</legend>
        <input
          type="text"
          value={dietaryRestrictions}
          placeholder="Shellfish"
          onChange={setDietaryRestrictions}
        />
      </div>
    </fieldset>
  );
};

export default RsvpInput;
