import React from "react";
import { DinnerChoice } from "../types/dinner-choice";

type DinnerChoiceSelectProps = {
  name: string;
  title?: string;
  selectedOption: DinnerChoice;
  setSelectedOption: (dinnerChoice: DinnerChoice) => void;
  disabled?: boolean;
  hasNone?: boolean;
};

const DinnerChoiceSelect = ({
  name,
  title,
  selectedOption,
  setSelectedOption,
  disabled,
  hasNone,
}: DinnerChoiceSelectProps) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value as DinnerChoice);
  };

  return (
    <fieldset disabled={disabled} className="dinner-choice">
      {title && <legend>{title}:</legend>}

      <div className="dinner-choice-inputs">
        {Object.keys(DinnerChoice)
          .map((dinnerChoice, i) => {
            if (!hasNone && dinnerChoice === DinnerChoice.None) {
              return null;
            }

            return (
              <div key={i} className="dinner-choice-radio-option">
                <input
                  type="radio"
                  id={`${name}-dinnerChoice-${dinnerChoice.toLowerCase()}`}
                  name={`${name}-dinnerChoice`}
                  value={
                    DinnerChoice[dinnerChoice as keyof typeof DinnerChoice]
                  }
                  checked={
                    selectedOption ===
                    DinnerChoice[dinnerChoice as keyof typeof DinnerChoice]
                  }
                  onChange={handleOptionChange}
                />
                <label
                  htmlFor={`${name}-dinnerChoice-${dinnerChoice.toLowerCase()}`}
                >
                  {dinnerChoice}
                </label>
              </div>
            );
          })
          .filter((t) => t != null)}
      </div>
    </fieldset>
  );
};

export default DinnerChoiceSelect;
