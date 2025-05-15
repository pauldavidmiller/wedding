import React from "react";
import { Section } from "../types/section";
import PageSection, { SectionVariant } from "./page-section";

type Faq = {
  question: string;
  answer?: string;
};

const FAQsSection = () => {
  // const DEFAULT_ANSWER = "More information is coming soon!";
  const faqs: Faq[] = [
    {
      question: "What should I wear?",
      answer: "The dress code is Black tie optional.",
    },
    {
      question: "When should I arrive?",
      answer:
        "Our wedding will begin promptly at 6pm EST. Please plan to be seated by 5:45pm at the latest.",
    },
    {
      question: "How should I get to the venue?",
      answer:
        "For those staying at the Study Hotel, the BMA is a five minute walk around the block. See image above for walking directions.",
    },
    {
      question: "Where should I park?",
      answer:
        "Valet parking will be provided at the BMA entrance. Once parked, we recommend walking up the exterior staircase directly into the ceremony location. An accessible route is available through the main museum entrance at valet drop off. Attendants will be onsite to direct you.",
    },
  ];

  return (
    <PageSection
      id={Section.Faq}
      title="Frequently Asked Questions"
      variant={SectionVariant.pink}
    >
      <div className="faqs-list">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <h3 className="faq-question">{faq.question}</h3>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </PageSection>
  );
};

export default FAQsSection;
