// src/contexts/HamburgerMenuContext.tsx

import React, { createContext, useState, ReactNode } from "react";
import { Section } from "../types/section";

interface HamburgerMenuContextType {
  isHamburgerMenuOpen: boolean;
  setIsHamburgerMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentSection: Section;
  setCurrentSection: React.Dispatch<React.SetStateAction<Section>>;
}

const HamburgerMenuContext = createContext<
  HamburgerMenuContextType | undefined
>(undefined);

export const HamburgerMenuProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] =
    useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<Section>(
    Section.Signature
  );

  return (
    <HamburgerMenuContext.Provider
      value={{
        isHamburgerMenuOpen,
        setIsHamburgerMenuOpen,
        currentSection,
        setCurrentSection,
      }}
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
