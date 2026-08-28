// src/contexts/AppContext.tsx

import React, { createContext, useState, ReactNode } from "react";
import { subtractDays } from "../extensions/helpers";
import { SiteView } from "../types/site-view";

/**
 * A password and the view it unlocks. Add a new entry here (with the sha256
 * hash of the new password) to hang another experience off the same front door.
 */
export type PasswordView = {
  hashedPassword: string;
  view: SiteView;
};

interface AppContextType {
  websiteReleaseDate: Date;
  registryReleaseDate: Date;
  rsvpReleaseDate: Date;
  isUnlocked: boolean;
  unlockedView?: SiteView;
  setUnlockedView?: React.Dispatch<React.SetStateAction<SiteView | undefined>>;
  passwordViews: PasswordView[];
  venueName: string;
  venuAddress: string;
  reshearsalRsvpDateSpelledString: string;
  date: Date;
  dateSpelledString: string;
  dateFullSpelledString: string;
  location: string;
  zoomMeetingLink?: string;
  isStreamEnabled: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [websiteReleaseDate] = useState<Date>(new Date("04/01/2025"));
  const [registryReleaseDate] = useState<Date>(new Date("04/15/2025"));
  const [rsvpReleaseDate] = useState<Date>(new Date("05/11/2025"));
  const [unlockedView, setUnlockedView] = useState<SiteView | undefined>(
    undefined
  );
  const [passwordViews] = useState<PasswordView[]>([
    {
      // "mp2025" - the original 2025 wedding site, kept exactly as it was
      hashedPassword:
        "ebb516c0b83b18417f43bbdc46ddb0bf41ec495df0821e9936d8d38003b0bde2",
      view: SiteView.Wedding,
    },
    {
      // "mp1year" - the 1 year anniversary page
      hashedPassword:
        "9ad8aa16527b464f9f30321e86e7ebf60e3455b3895e2f2454b96534cce793ed",
      view: SiteView.OneYearAnniversary,
    },
  ]);
  const [venueName] = useState<string>("Baltimore Museum of Art (BMA)");
  const [venuAddress] = useState<string>(
    "10 Art Museum Dr, Baltimore, MD 21218, USA"
  );
  const [reshearsalRsvpDateSpelledString] = useState<string>("July 30th, 2025");
  const [date] = useState<Date>(new Date("08/31/2025"));
  const [dateSpelledString] = useState<string>("August 31st, 2025");
  const [dateFullSpelledString] = useState<string>("Sunday, August 31st, 2025");
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
        registryReleaseDate,
        rsvpReleaseDate,
        isUnlocked: unlockedView != null,
        unlockedView,
        setUnlockedView,
        passwordViews,
        venueName,
        venuAddress,
        reshearsalRsvpDateSpelledString,
        date,
        dateSpelledString,
        dateFullSpelledString,
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
