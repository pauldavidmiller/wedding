import React from "react";
import PageSection, { SectionVariant } from "./page-section";
import { Section } from "../types/section";

const RegistrySection = () => {
  return (
    <PageSection
      id={Section.Registry}
      title="Registry"
      variant={SectionVariant.light}
    >
      <div className="flex flex-col gap-4">
        <p>
          Here are the few registries we have opened to contribute to. Thank you
          so much for all of your generosity!
        </p>
        <div className="registry-images">
          <img
            src="/images/crateandbarrellogo.png"
            alt="Crate & Barrel"
            className="w-12 h-auto"
            onClick={() =>
              window.open(
                "https://www.crateandbarrel.com/gift-registry/margot-bailowitz/r7269468",
                "_blank"
              )
            }
          />
        </div>
      </div>
    </PageSection>
  );
};

export default RegistrySection;
