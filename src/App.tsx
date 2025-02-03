import React, { useCallback, useEffect, useRef } from "react";
import "./App.css"; // Import the custom stylesheet

import Header from "./components/header";
import AboutSection from "./components/about";
import GallerySection from "./components/gallery";
import RSVPSection from "./components/rsvp";
import Footer from "./components/footer";
import SaveTheDate from "./components/save-the-date";
import VenueSection from "./components/venue";
import HotelsSection from "./components/hotels";
import FAQsSection from "./components/faqs";
import { useHamburgerMenu } from "./contexts/hamburger-menu-context";
import HamburgerMenu from "./components/hamburger-menu";
import Signature from "./components/signature";
import HeroSection from "./components/hero";
import HamburgerHeader from "./components/hamburger-header";
import { useAppContext } from "./contexts/app-context";
import RegistrySection from "./components/registry";

function App() {
  const { isUnlocked } = useAppContext();
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isUnlocked]);

  return (
    <>
      {!isUnlocked ? (
        <SaveTheDate />
      ) : (
        <div className="app-container">
          <HamburgerHeader />
          <Signature />
          <Header />
          <div className="body-container">
            <HeroSection />
            <AboutSection />
            <GallerySection />
            <VenueSection />
            <HotelsSection />
            <RegistrySection />
            <FAQsSection />
            {/* <StreamSection /> */}
            <RSVPSection />
          </div>
          <Footer />

          {isHamburgerMenuOpen && (
            <div ref={hamburgerMenuRef}>
              <HamburgerMenu />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
