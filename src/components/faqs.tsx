import React from "react";
import { Section } from "../types/section";

const FAQsSection = () => {
  const faqs = [
    {
      question: "What should I wear?",
      answer:
        "The dress code is formal attire. We want everyone to look their best!",
    },
    {
      question: "Is there a gift registry?",
      answer:
        "Yes, we have a gift registry at several stores. Please check out this link for more details.",
    },
  ];

  return (
    <section id={Section.Faq} className="faqs-section">
      <h2 className="faqs-title">Frequently Asked Questions</h2>
      <div className="faqs-list">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <h3 className="faq-question">{faq.question}</h3>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQsSection;
