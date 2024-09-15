import React from "react";
import { useHamburgerMenu } from "../contexts/hamburger-menu-context";

const Tabs = () => {
  const { isHamburgerMenuOpen } = useHamburgerMenu();

  const scrollToSection = (id: any) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  return (
    <ul className={`header-menu ${isHamburgerMenuOpen && "flex-col"}`}>
      <li>
        <button
          className={`header-button ${isHamburgerMenuOpen && "w-full"}`}
          onClick={() => scrollToSection("signature")}
        >
          Home
        </button>
      </li>
      <li>
        <button
          className={`header-button ${isHamburgerMenuOpen && "w-full"}`}
          onClick={() => scrollToSection("gallery")}
        >
          Gallery
        </button>
      </li>
      <li>
        <button
          className={`header-button ${isHamburgerMenuOpen && "w-full"}`}
          onClick={() => scrollToSection("about")}
        >
          About
        </button>
      </li>
      <li>
        <button
          className={`header-button ${isHamburgerMenuOpen && "w-full"}`}
          onClick={() => scrollToSection("venue")}
        >
          Venue
        </button>
      </li>
      <li>
        <button
          className={`header-button ${isHamburgerMenuOpen && "w-full"}`}
          onClick={() => scrollToSection("hotels")}
        >
          Hotels
        </button>
      </li>
      <li>
        <button
          className={`header-button ${isHamburgerMenuOpen && "w-full"}`}
          onClick={() => scrollToSection("faqs")}
        >
          Faq
        </button>
      </li>
      <li>
        <button
          className={`header-button ${isHamburgerMenuOpen && "w-full"}`}
          onClick={() => scrollToSection("rsvp")}
        >
          Rsvp
        </button>
      </li>
    </ul>
  );
};

export default Tabs;
