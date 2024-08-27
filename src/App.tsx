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
import HotelsSection from "./components/hotels";
import FAQsSection from "./components/faqs";

const isPasswordEnabled = true;
const hashedPassword =
  "ebb516c0b83b18417f43bbdc46ddb0bf41ec495df0821e9936d8d38003b0bde2";
const venueName = "Baltimore Museum of Art";
const date = "Sunday, August 31st, 2025"

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
          <HeroSection venueName={venueName} date={date} />
          <AboutSection />
          <GallerySection />
          <VenueSection venueName={venueName} />
          <HotelsSection />
          <FAQsSection />
          <RSVPSection />
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
