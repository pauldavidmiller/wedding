import React from "react";
import { useHamburgerMenu } from "../contexts/hamburger-menu-context";

const HamburgerHeader = () => {
  const { setIsHamburgerMenuOpen } = useHamburgerMenu();

  return (
    <header className="header lg:hidden">
      <div className="flex flex-row items-center">
        {/* <!-- Hamburger Menu --> */}
        <button
          id="menuButton"
          className="m-3"
          onClick={() => setIsHamburgerMenuOpen(true)}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default HamburgerHeader;
