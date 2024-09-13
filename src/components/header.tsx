import React from "react";
import Tabs from "./tabs";
import { useHamburgerMenu } from "../contexts/hamburger-menu-context";

const Header = () => {
  const { setIsHamburgerMenuOpen } = useHamburgerMenu();

  return (
    <header className="header">
      <div className="header-nav">
        {/* <!-- Hamburger Menu --> */}
        <button
          id="menuButton"
          className="lg:hidden mx-3"
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
        <nav className="hidden lg:flex lg:flex-row space-x-4 w-full justify-center items-center">
          <Tabs />
        </nav>
      </div>
    </header>
  );
};

export default Header;
