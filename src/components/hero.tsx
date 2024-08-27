import React from "react";

type HeroSectionProps = {
  venueName: string;
  date: string;
};

const HeroSection = ({ venueName, date }: HeroSectionProps) => {
  return (
    <section id="hero" className="hero">
      <div className="hero-background">
        <img src="/images/bma1.jpg" alt="BMA 1" />
        <img src="/images/bma2.jpg" alt="BMA 2" />
        <img src="/images/bma3.jpg" alt="BMA 3" />
      </div>
      <div className="hero-content">
        <h1 className="text-5xl font-bold pt-8">Welcome to the Wedding of</h1>
        <h2 className="text-4xl font-bold">Paul and Margot</h2>
        <p className="mt-4 text-xl">
          We are so excited to celebrate with you on {date} at the {venueName}!
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
