import React from "react";

type SignatureProps = {
  venueName: string;
  date: string;
};

const Signature = ({ venueName, date }: SignatureProps) => {
  return (
    <section id="signature" className="signature">
      <img src="/images/signature-background.png" alt="signature-background" />
    </section>
  );
};

export default Signature;
