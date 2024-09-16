// src/contexts/AppContext.tsx

import React, { createContext, useState, ReactNode } from "react";

interface AppContextType {
  websiteReleaseDate: Date;
  isPasswordEnabled: boolean;
  isUnlocked?: boolean;
  setIsUnlocked?: React.Dispatch<React.SetStateAction<boolean>>;
  hashedPassword: string;
  venueName: string;
  date: string;
  location: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [websiteReleaseDate] = useState<Date>(new Date("01/01/2024"));
  const [isPasswordEnabled] = useState<boolean>(true);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(!isPasswordEnabled);
  const [hashedPassword] = useState<string>(
    "ebb516c0b83b18417f43bbdc46ddb0bf41ec495df0821e9936d8d38003b0bde2"
  );
  const [venueName] = useState<string>("Baltimore Museum of Art");
  const [date] = useState<string>("Sunday, August 31st, 2025");
  const [location] = useState<string>("Baltimore, MD");

  return (
    <AppContext.Provider
      value={{
        websiteReleaseDate,
        isPasswordEnabled,
        isUnlocked,
        setIsUnlocked,
        hashedPassword,
        venueName,
        date,
        location,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
};
