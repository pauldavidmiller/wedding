import React from "react";
import { Section } from "../types/section";

const AboutSection = () => {
  return (
    <section id={Section.About} className="about">
      <h2>Our Story</h2>
      <p className="mt-4 text-lg">
        It was the summer of 2018 when we were introduced to each other in a
        group. Both of our high school friends introduced us and wanted us to
        date each other because they thought that we would be a good match.
        Unfortunately, we were too shy at the time. However, we were at
        university far away from each other at the time, so it wasn't right...
        Then, a year and a half later we spotted each other in Israel while we
        were both on our school trips. Just the universe reminding us of each
        other. We waved hello but that would be the last time we would see each
        other until Paul said hello on a dating app during Covid (yep even the
        deadly Covid wouldn't keep us apart as challenging as the distancing
        was)... the rest was history: Paul asked Margot on a walk, then took her
        out on some dates, and just like that here we are on our wedding day!
        Roughly 5 years after that first August 30th 2020 walk. Happy and in
        love as ever, and so excited to be here with all of you!
      </p>
      <p>לי חיים</p>
    </section>
  );
};

export default AboutSection;
