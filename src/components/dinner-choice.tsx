import React from "react";

export enum DinnerChoiceType {
  None = "None",
  Meat = "Meat",
  Fish = "Fish",
  Vegetarian = "Vegetarian",
}

type DinnerChoiceProps = {
  name: string;
  title?: string;
  selectedOption: DinnerChoiceType;
  setSelectedOption: (dinnerChoice: DinnerChoiceType) => void;
  disabled?: boolean;
  hasNone?: boolean;
};
const DinnerChoice = ({
  name,
  title,
  selectedOption,
  setSelectedOption,
  disabled,
  hasNone,
}: DinnerChoiceProps) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value as DinnerChoiceType);
  };

  return (
    <fieldset disabled={disabled} className="dinner-choice">
      {title && <legend>{title}:</legend>}

      <div className="dinner-choice-inputs">
        {Object.keys(DinnerChoiceType)
          .map((dinnerChoice, i) => {
            if (!hasNone && dinnerChoice === DinnerChoiceType.None) {
              return null;
            }

            return (
              <div key={i} className="radio-option">
                <input
                  type="radio"
                  id={`${name}-${dinnerChoice.toLowerCase()}`}
                  name={name}
                  value={
                    DinnerChoiceType[
                      dinnerChoice as keyof typeof DinnerChoiceType
                    ]
                  }
                  checked={
                    selectedOption ===
                    DinnerChoiceType[
                      dinnerChoice as keyof typeof DinnerChoiceType
                    ]
                  }
                  onChange={handleOptionChange}
                />
                <label htmlFor={`${name}-${dinnerChoice.toLowerCase()}`}>
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

export default DinnerChoice;
