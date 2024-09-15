import React from "react";
import { Section } from "../types/section";

type SignatureProps = {
  date: string;
  location: string;
};

const Signature = ({ date, location }: SignatureProps) => {
  return (
    <section id={Section.Signature} className="signature">
      <h1 className="text-8xl font-bold pt-8 pb-2 cursive-font">
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
