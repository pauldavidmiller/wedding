import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css"; // Import the custom stylesheet

import Header from "./components/header";
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
import HeroSection from "./components/hero";
import HamburgerHeader from "./components/hamburger-header";
import { useAppContext } from "./contexts/app-context";
import Modal from "./components/modal";

function App() {
  const { isUnlocked } = useAppContext();
  const { isHamburgerMenuOpen, setIsHamburgerMenuOpen } = useHamburgerMenu();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

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
      {!isUnlocked ? (
        <PasswordPrompt />
      ) : (
        <>
          <HamburgerHeader />
          <Signature />
          <Header />
          <div className="body-container">
            <HeroSection />
            <AboutSection />
            <GallerySection />
            <VenueSection />
            <HotelsSection />
            <FAQsSection />
            <RSVPSection />
          </div>
          <Footer />

          {isHamburgerMenuOpen && (
            <div ref={hamburgerMenuRef}>
              <HamburgerMenu />
            </div>
          )}

          {isModalOpen && (
            <Modal
              title="More info and RSVP coming soon!"
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
