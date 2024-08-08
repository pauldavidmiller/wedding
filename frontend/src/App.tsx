import React, { useState } from "react";
import "./App.css"; // Import the custom stylesheet

import Header from "./components/header";
import HeroSection from "./components/hero";
import AboutSection from "./components/about";
import GallerySection from "./components/gallery";
import RSVPSection from "./components/rsvp";
import Footer from "./components/footer";
import PasswordPrompt from "./components/password-prompt";
import VenueSection from "./components/venue";

const isPasswordEnabled = false; // TODO: Enable before deploying
const hashedPassword =
  "f9da371f8ec027b5e598d64ded7722d8b023b0e5d676fa6e03ed1702c8f88bc9";
const venueName = "<venueName>";

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <div className="App">
      {isPasswordEnabled && !isUnlocked ? (
        <PasswordPrompt
          hashedPassword={hashedPassword}
          onUnlock={() => setIsUnlocked(true)}
        />
      ) : (
        <>
          <Header />
          <HeroSection venueName={venueName} />
          <VenueSection venueName={venueName} />
          <AboutSection />
          <GallerySection />
          <RSVPSection />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
