// src/contexts/HamburgerMenuContext.tsx

import React, { createContext, useState, ReactNode } from "react";

interface HamburgerMenuContextType {
  isHamburgerMenuOpen: boolean;
  setIsHamburgerMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const HamburgerMenuContext = createContext<
  HamburgerMenuContextType | undefined
>(undefined);

export const HamburgerMenuProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] =
    useState<boolean>(false);

  return (
    <HamburgerMenuContext.Provider
      value={{ isHamburgerMenuOpen, setIsHamburgerMenuOpen }}
    >
      {children}
    </HamburgerMenuContext.Provider>
  );
};

export const useHamburgerMenu = () => {
  const context = React.useContext(HamburgerMenuContext);
  if (context === undefined) {
    throw new Error(
      "useHamburgerMenu must be used within a HamburgerMenuProvider"
    );
  }
  return context;
};
