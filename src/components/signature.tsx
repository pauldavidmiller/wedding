import React from "react";
import { Section } from "../types/section";
import { useAppContext } from "../contexts/app-context";

const Signature = () => {
  const { dateString, location } = useAppContext();

  return (
    <section id={Section.Signature} className="signature">
      <h1>Welcome to the Wedding of</h1>
      <h2>Margot & Paul</h2>
      <h3>
        {dateString} • {location}
      </h3>
    </section>
  );
};

export default Signature;
