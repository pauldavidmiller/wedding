import React, { ReactNode } from "react";
import { Section } from "../types/section";

export enum SectionVariant {
  white = "white",
  light = "light",
  dark = "dark",
}

type PageSectionProps = {
  id: Section;
  title?: string;
  variant?: SectionVariant;
  className?: string;
  children: ReactNode;
  isComingSoon?: boolean;
};

const PageSection = ({
  id,
  title,
  variant = SectionVariant.white,
  className,
  children,
  isComingSoon: hideChildren = false,
}: PageSectionProps) => {
  return (
    <section
      id={id}
      className={`section${variant && `-${variant}`} ${className}`}
    >
      {title && <h2 className="section-title">{title}</h2>}
      {hideChildren ? <h3>Rsvp is coming soon...</h3> : children}
    </section>
  );
};

export default PageSection;
