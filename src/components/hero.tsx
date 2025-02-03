import React from "react";
import { Section } from "../types/section";
import PageSection from "./page-section";

const HeroSection = () => {
  return (
    <PageSection id={Section.Hero} className="hero">
      <img src="/images/main-us.jpeg" alt="main-us" />
    </PageSection>
  );
};

export default HeroSection;
