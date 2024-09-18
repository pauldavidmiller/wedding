import React from "react";
import { AttendingChoice } from "../types/attending-choice";

type AttendingChoiceSelectProps = {
  name: string;
  selectedOption: AttendingChoice | null;
  setSelectedOption: (attendingChoice: AttendingChoice) => void;
  disabled?: boolean;
};

const AttendingChoiceSelect = ({
  name,
  selectedOption,
  setSelectedOption,
  disabled,
}: AttendingChoiceSelectProps) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value as AttendingChoice);
  };

  return (
    <fieldset disabled={disabled} className="attending-choice">
      <legend>Attending:</legend>

      <div className="attending-choice-inputs">
        {Object.keys(AttendingChoice)
          .reverse()
          .map((choice, i) => {
            return (
              <label
                key={i}
                htmlFor={`${name}-attending-${choice.toLowerCase()}`}
                className="attending-choice-radio-option"
              >
                <input
                  type="radio"
                  id={`${name}-attending-${choice.toLowerCase()}`}
                  name={`${name}-attending`}
                  value={
                    AttendingChoice[choice as keyof typeof AttendingChoice]
                  }
                  checked={
                    selectedOption ===
                    AttendingChoice[choice as keyof typeof AttendingChoice]
                  }
                  onChange={handleOptionChange}
                  disabled={disabled}
                />
                <span className="radio-btn"></span> {choice}
              </label>
            );
          })
          .filter((t) => t != null)}
      </div>
    </fieldset>
  );
};

export default AttendingChoiceSelect;
