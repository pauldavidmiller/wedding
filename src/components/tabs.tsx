import React from "react";
import { useHamburgerMenu } from "../contexts/hamburger-menu-context";
import { Section } from "../types/section";
import { getTabFromSection } from "../extensions/helpers";

const Tabs = () => {
  const { isHamburgerMenuOpen, setCurrentSection } = useHamburgerMenu();

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
      <li>
        <button
          className={`header-button ${isHamburgerMenuOpen && "w-full"}`}
          onClick={() => handleScrollToSection(Section.Signature)}
        >
          {getTabFromSection(Section.Signature)}
        </button>
      </li>
      <li>
        <button
          className={`header-button ${isHamburgerMenuOpen && "w-full"}`}
          onClick={() => handleScrollToSection(Section.About)}
        >
          {getTabFromSection(Section.About)}
        </button>
      </li>
      <li>
        <button
          className={`header-button ${isHamburgerMenuOpen && "w-full"}`}
          onClick={() => handleScrollToSection(Section.Gallery)}
        >
          {getTabFromSection(Section.Gallery)}
        </button>
      </li>
      <li>
        <button
          className={`header-button ${isHamburgerMenuOpen && "w-full"}`}
          onClick={() => handleScrollToSection(Section.Venue)}
        >
          {getTabFromSection(Section.Venue)}
        </button>
      </li>
      <li>
        <button
          className={`header-button ${isHamburgerMenuOpen && "w-full"}`}
          onClick={() => handleScrollToSection(Section.Hotels)}
        >
          {getTabFromSection(Section.Hotels)}
        </button>
      </li>
      <li>
        <button
          className={`header-button ${isHamburgerMenuOpen && "w-full"}`}
          onClick={() => handleScrollToSection(Section.Faq)}
        >
          {getTabFromSection(Section.Faq)}
        </button>
      </li>
      <li>
        <button
          className={`header-button ${isHamburgerMenuOpen && "w-full"}`}
          onClick={() => handleScrollToSection(Section.Rsvp)}
        >
          {getTabFromSection(Section.Rsvp)}
        </button>
      </li>
    </ul>
  );
};

export default Tabs;
