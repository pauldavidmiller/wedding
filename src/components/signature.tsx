import React from "react";

type SignatureProps = {
  venueName: string;
  date: string;
};

const Signature = ({ venueName, date }: SignatureProps) => {
  return (
    <section id="signature" className="signature">
      <h1 className="text-5xl font-bold pt-8 cursive-font">
        Welcome to the Wedding of
      </h1>
      <h2 className="text-4xl font-bold oswald-font">Margot and Paul</h2>
      <h3 className="text-2xl font-semibold pt-2">{date}</h3>
    </section>
  );
};

export default Signature;
