import React from "react";
import { useHamburgerMenu } from "../contexts/hamburger-menu-context";
import { Section } from "../types/section";
import { getTabFromSection } from "../extensions/helpers";

const Tabs = () => {
  const { isHamburgerMenuOpen, currentSection, setCurrentSection } =
    useHamburgerMenu();

  const sectionIgnoreList: Section[] = [Section.Hero, Section.Stream];

  const scrollToSection = (section: Section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  const handleScrollToSection = (section: Section) => {
    scrollToSection(section);
    setCurrentSection(section);
  };

  return (
    <ul className={`header-menu ${isHamburgerMenuOpen && "flex-col"}`}>
      {Object.values(Section)
        .filter((section) => !sectionIgnoreList.includes(section))
        .map((section, i) => (
          <li key={i}>
            <button
              className={`header-button ${isHamburgerMenuOpen && "w-full"} ${
                currentSection === section && "header-button-selected"
              }`}
              onClick={() => handleScrollToSection(section)}
            >
              {getTabFromSection(section)}
            </button>
          </li>
        ))}
    </ul>
  );
};

export default Tabs;
