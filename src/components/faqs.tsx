import React from "react";
import { Section } from "../types/section";
import PageSection, { SectionVariant } from "./page-section";

const FAQsSection = () => {
  const faqs = [
    {
      question: "What should I wear?",
      answer:
        "The dress code is formal attire. We want everyone to look their best!",
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
