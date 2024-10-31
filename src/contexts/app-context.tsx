// src/contexts/AppContext.tsx

import React, { createContext, useState, ReactNode } from "react";
import { subtractDays } from "../extensions/helpers";

interface AppContextType {
  websiteReleaseDate: Date;
  isPasswordEnabled: boolean;
  isUnlocked?: boolean;
  setIsUnlocked?: React.Dispatch<React.SetStateAction<boolean>>;
  hashedPassword: string;
  venueName: string;
  dateString: string;
  location: string;
  zoomMeetingLink?: string;
  isStreamEnabled: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [websiteReleaseDate] = useState<Date>(new Date("01/01/2025"));
  const [isPasswordEnabled] = useState<boolean>(true);
  const [isUnlocked, setIsUnlocked] = useState<boolean>(!isPasswordEnabled);
  const [hashedPassword] = useState<string>(
    "ebb516c0b83b18417f43bbdc46ddb0bf41ec495df0821e9936d8d38003b0bde2"
  );
  const [venueName] = useState<string>("Baltimore Museum of Art");
  const [date] = useState<Date>(new Date("08/31/2025"));
  const [dateString] = useState<string>("Sunday, August 31st, 2025");
  const [location] = useState<string>("Baltimore, MD");

  /*
    Embedding a Zoom call into a React website can enhance user engagement, allowing visitors to join meetings directly from your platform. Here’s a structured approach to achieve this:

    Step 1: Setting Up Your Zoom Account
    Create a Zoom Meeting: Log in to your Zoom account and schedule a meeting. Note the Meeting ID and the meeting link.

    Enable Embed Features: Ensure that your Zoom account settings allow for embedding. You may need to check the "Embed the join URL" option under the meeting settings.

    Step 2: Generating an Embed Code
    While Zoom does not provide a straightforward embed code like some video platforms, you can use the meeting link in an iframe to create an embedded experience.

    Additional Considerations
      Permissions: Users will need to allow camera and microphone access for full functionality.
      Mobile Responsiveness: Ensure your iframe and component styles are responsive for better usability on mobile devices.
      Security: Be cautious about sharing meeting links publicly; consider using passwords for meetings to enhance security.
  */
  const [zoomMeetingLink] = useState<string>("https://zoom.us/j/MEETING_ID");
  const [isStreamEnabled] = useState<boolean>(
    new Date() >= subtractDays(date, 14)
  );

  return (
    <AppContext.Provider
      value={{
        websiteReleaseDate,
        isPasswordEnabled,
        isUnlocked,
        setIsUnlocked,
        hashedPassword,
        venueName,
        dateString,
        location,
        zoomMeetingLink,
        isStreamEnabled,
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
