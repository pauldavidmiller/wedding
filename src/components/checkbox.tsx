import React from "react";

type CheckboxProps = {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  label?: string;
};

const Checkbox = ({ isChecked, setIsChecked, label }: CheckboxProps) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="checkbox-container">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="custom-checkbox"
        />
        <span className="checkmark"></span>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
