import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css"; // Import the custom stylesheet

import Header from "./components/header";
import HeroSection from "./components/hero";
import AboutSection from "./components/about";
import GallerySection from "./components/gallery";
import RSVPSection from "./components/rsvp";
import Footer from "./components/footer";
import PasswordPrompt from "./components/password-prompt";
import VenueSection from "./components/venue";
import HotelsSection from "./components/hotels";
import FAQsSection from "./components/faqs";
import { useHamburgerMenu } from "./contexts/hamburger-menu-context";
import HamburgerMenu from "./components/hamburger-menu";
import Signature from "./components/signature";

const isPasswordEnabled = true;
const hashedPassword =
  "ebb516c0b83b18417f43bbdc46ddb0bf41ec495df0821e9936d8d38003b0bde2";
const venueName = "Baltimore Museum of Art";
const date = "Sunday, August 31st, 2025";

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { isHamburgerMenuOpen, setIsHamburgerMenuOpen } = useHamburgerMenu();

  const hamburgerMenuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        hamburgerMenuRef.current &&
        !hamburgerMenuRef.current.contains(event.target as Node)
      ) {
        setIsHamburgerMenuOpen(false);
      }
    },
    [setIsHamburgerMenuOpen]
  );

  useEffect(() => {
    if (isHamburgerMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside, isHamburgerMenuOpen]);

  return (
    <div className="app-container">
      {isPasswordEnabled && !isUnlocked ? (
        <PasswordPrompt
          hashedPassword={hashedPassword}
          onUnlock={() => setIsUnlocked(true)}
        />
      ) : (
        <>
          <Signature venueName={venueName} date={date} />
          <Header />
          <HeroSection />
          <AboutSection />
          <GallerySection />
          <VenueSection venueName={venueName} />
          <HotelsSection />
          <FAQsSection />
          <RSVPSection />
          <Footer />

          {isHamburgerMenuOpen && (
            <div ref={hamburgerMenuRef}>
              <HamburgerMenu />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
