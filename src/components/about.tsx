import React from "react";
import { Section } from "../types/section";
import PageSection from "./page-section";

const AboutSection = () => {
  return (
    <PageSection id={Section.AboutUs} title="Our Story">
      <p className="text-lg">
        We first met in 2017 when two of our close childhood friends were
        dating. They thought we’d be a great match, but we were a little too shy
        at the time. Our paths crossed infrequently over the next few years,
        though the universe had its way of reminding us of each other from time
        to time. For example, we waved hello across a crowded room in Israel
        while on separate Birthright trips. Fast forward to 2020 when we were
        both unexpectedly living at home in Baltimore due to Covid. Margot
        should have been in Atlanta starting her senior year at Emory and Paul
        was supposed to be starting a new job in Philly after graduating from
        GW. Paul said hello on a dating app, asked Margot on a walk, and the
        rest is history! Almost exactly five years after that first socially
        distanced walk on August 30th, 2020, we can’t wait to take another walk,
        this time down the aisle on our wedding day. We are happy and in love as
        ever, and so excited to celebrate with all of you!
      </p>
      <p>לי חיים</p>
    </PageSection>
  );
};

export default AboutSection;
