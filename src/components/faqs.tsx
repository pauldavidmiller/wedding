import React from "react";
import { Section } from "../types/section";
import PageSection, { SectionVariant } from "./page-section";

type Faq = {
  question: string;
  answer?: string;
};

const FAQsSection = () => {
  const faqs: Faq[] = [
    {
      question: "What should I wear?",
      answer: "The dress code is Black tie optional.",
    },
    {
      question: "When should I arrive?",
      answer: "Our ceremony will begin promptly at 6pm EST.",
    },
    {
      question: "How should I get to the venue?",
      // answer:
      //   "If you are coming from the hotel, please see the map above for walking directions.",
    },
    {
      question: "Where should I park?",
    },
  ];

  return (
    <PageSection
      id={Section.Faq}
      title="Frequently Asked Questions"
      variant={SectionVariant.dark}
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
