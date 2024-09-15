import React from "react";
import { Section } from "../types/section";

const HeroSection = () => {
  return (
    <section id={Section.Hero} className="hero">
      <img src="/images/main-us.jpeg" alt="main-us" />
    </section>
  );
};

export default HeroSection;
