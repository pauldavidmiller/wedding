import React from "react";
import "./App.css"; // Import the custom stylesheet

import Header from "./components/header";
import HeroSection from "./components/hero";
import AboutSection from "./components/about";
import GallerySection from "./components/gallery";
import RSVPSection from "./components/rsvp";
import Footer from "./components/footer";

function App() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <RSVPSection />
      <Footer />
    </div>
  );
}

export default App;
