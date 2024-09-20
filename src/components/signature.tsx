import React from "react";
import { Section } from "../types/section";
import { useAppContext } from "../contexts/app-context";

const Signature = () => {
  const { date, location } = useAppContext();

  return (
    <section id={Section.Signature} className="signature">
      <h1 className="text-8xl font-bold cursive-font pt-8 pb-4">
        Welcome to the Wedding of
      </h1>
      <h2 className="text-5xl playfair-display-font uppercase tracking-widest">
        Margot & Paul
      </h2>
      <h3 className="text-2xl montserrat-font pt-2 uppercase tracking-wider">
        {date} • {location}
      </h3>
    </section>
  );
};

export default Signature;
