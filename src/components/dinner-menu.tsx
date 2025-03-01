import React from "react";
import { DinnerMenuOption } from "../types/dinner-menu-option";
import { DinnerChoice } from "../types/dinner-choice";

const DinnerMenu = () => {
  const dinnerMenuOptions: DinnerMenuOption[] = [
    {
      choice: DinnerChoice.Beef,
      description: "Espresso Rubbed Sliced Beef Tenderloin",
      note: "with charred pearl onions, huckleberry habanero sauce",
    },
    {
      choice: DinnerChoice.Chicken,
      description: "Parmesan Crusted Chicken",
      note: "with basil beurre blanc",
    },
    {
      choice: DinnerChoice.Fish,
      description: "Blackened BBQ Salmon",
      note: "with spiced cherry compote",
    },
    {
      choice: DinnerChoice.Vegan,
      description: "Chickpea Cake",
      note: "with lemon tahini sauce",
    },
  ];

  return (
    <div className="dinner-menu">
      <h1>Menu</h1>
      <table className="border-separate border-spacing-x-6 border-spacing-y-1">
        <thead>
          <tr>
            <th className="dinner-menu-table-option">Option</th>
            <th className="dinner-menu-table-description">Description</th>
          </tr>
        </thead>
        <tbody>
          {dinnerMenuOptions.map((o, i) => (
            <tr key={i}>
              <td className="dinner-menu-table-option underline underline-offset-2">
                {o.choice}
              </td>
              <td className="dinner-menu-table-description">
                <div className="flex flex-col">
                  <p>{o.description}</p>
                  <p className="text-xs">{o.note}</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DinnerMenu;
