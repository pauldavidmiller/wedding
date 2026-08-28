import React from "react";
import { Section } from "../types/section";
import { useAppContext } from "../contexts/app-context";
import CountdownTimer from "./countdown-timer";

const Signature = () => {
  const { date, dateFullSpelledString, location } = useAppContext();

  return (
    <section id={Section.Signature} className="signature">
      <h1>Welcome to the Wedding of</h1>
      <h2>Margot & Paul</h2>
      <h3>
        {dateFullSpelledString} • {location}
      </h3>
      <CountdownTimer targetDate={date} countUp hasTitle />
    </section>
  );
};

export default Signature;
