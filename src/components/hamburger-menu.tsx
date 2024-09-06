import React from "react";
import Tabs from "./tabs";
import { useHamburgerMenu } from "../contexts/hamburger-menu-context";

const HamburgerMenu = () => {
  const { isHamburgerMenuOpen } = useHamburgerMenu();

  return (
    <div
      className={`fixed top-0 left-0 w-24 h-full z-50 transform transition-transform duration-500 ease-in-out md:px-6 bg-red-500 flex flex-col items-center text-left justify-between ${
        isHamburgerMenuOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Navigation Tabs */}
      <nav>
        <Tabs />
      </nav>
    </div>
  );
};

export default HamburgerMenu;
