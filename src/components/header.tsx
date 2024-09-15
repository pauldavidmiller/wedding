import React from "react";
import Tabs from "./tabs";

const Header = () => {
  return (
    <header className="header hidden lg:flex lg:flex-row w-full justify-center">
      <div className="header-nav">
        <nav className="space-x-4 items-center">
          <Tabs />
        </nav>
      </div>
    </header>
  );
};

export default Header;
