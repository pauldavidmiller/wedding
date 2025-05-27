import React from "react";
import { AttendingChoice } from "../types/attending-choice";

type AttendingChoiceSelectProps = {
  title: string;
  name: string;
  keyType: string;
  selectedOption: AttendingChoice | null;
  setSelectedOption: (attendingChoice: AttendingChoice) => void;
  disabled?: boolean;
};

const AttendingChoiceSelect = ({
  title,
  name,
  keyType,
  selectedOption,
  setSelectedOption,
  disabled,
}: AttendingChoiceSelectProps) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value as AttendingChoice);
  };

  return (
    <fieldset
      disabled={disabled}
      className="attending-choice"
      title={
        disabled ? "Please enter previous required field first!" : undefined
      }
    >
      <legend>{title}:</legend>

      <div className="attending-choice-inputs">
        {Object.keys(AttendingChoice)
          .reverse()
          .map((choice, i) => {
            return (
              <label
                key={i}
                htmlFor={`${name}-${keyType}-${choice.toLowerCase()}`}
                className="attending-choice-radio-option"
              >
                <input
                  type="radio"
                  id={`${name}-${keyType}-${choice.toLowerCase()}`}
                  name={`${name}-${keyType}`}
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
