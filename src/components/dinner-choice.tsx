import React from "react";

export enum DinnerChoiceType {
  Meat = "Meat",
  Fish = "Fish",
  Vegetarian = "Vegetarian",
}

type DinnerChoiceProps = {
  name: string;
  title: string;
  selectedOption: DinnerChoiceType;
  setSelectedOption: React.Dispatch<React.SetStateAction<DinnerChoiceType>>;
};
const DinnerChoice = ({
  name,
  title,
  selectedOption,
  setSelectedOption,
}: DinnerChoiceProps) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value as DinnerChoiceType);
  };

  return (
    <fieldset className="dinner-choice">
      <legend>{title}:</legend>

      <div className="radio-option">
        <input
          type="radio"
          id={`${name}-meat`}
          name={name}
          value={DinnerChoiceType.Meat}
          checked={selectedOption === DinnerChoiceType.Meat}
          onChange={handleOptionChange}
        />
        <label htmlFor={`${name}-meat`}>Meat</label>
      </div>

      <div className="radio-option">
        <input
          type="radio"
          id={`${name}-fish`}
          name={name}
          value={DinnerChoiceType.Fish}
          checked={selectedOption === DinnerChoiceType.Fish}
          onChange={handleOptionChange}
        />
        <label htmlFor={`${name}-fish`}>Fish</label>
      </div>

      <div className="radio-option">
        <input
          type="radio"
          id={`${name}-vegetarian`}
          name={name}
          value={DinnerChoiceType.Vegetarian}
          checked={selectedOption === DinnerChoiceType.Vegetarian}
          onChange={handleOptionChange}
        />
        <label htmlFor={`${name}-vegetarian`}>Vegetarian</label>
      </div>
    </fieldset>
  );
};

export default DinnerChoice;
