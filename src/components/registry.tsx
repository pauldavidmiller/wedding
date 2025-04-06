import React from "react";
import PageSection, { SectionVariant } from "./page-section";
import { Section } from "../types/section";
import { useAppContext } from "../contexts/app-context";
import { isDevelopment } from "../extensions/environments";

type Registry = {
  name: string;
  img: string;
  url: string;
};

const RegistrySection = () => {
  const { registryReleaseDate } = useAppContext();
  const hideRegistries = new Date() < registryReleaseDate && !isDevelopment();

  const registries: Registry[] = [
    {
      name: "Crate & Barrel",
      img: "/images/crateandbarrellogo.png",
      url: "https://www.crateandbarrel.com/gift-registry/margot-bailowitz-and-paul-miller/r7298090",
    },
    {
      name: "Williams Sonoma",
      img: "/images/williamssonomalogo.png",
      url: "https://www.williams-sonoma.com/registry/qwf5hhrb7r/registry-list.html",
    },
    {
      name: "Macy's",
      img: "/images/macyslogo.png",
      url: "https://www.macys.com/registry/Margot-Bailowitz-Paul-Miller/1055428",
    },
  ];

  return (
    <PageSection
      id={Section.Registry}
      title="Registry"
      variant={SectionVariant.pink}
    >
      <div className="flex flex-col gap-4">
        {!!hideRegistries ? (
          <p>Our registries are coming soon!</p>
        ) : (
          <>
            <p>
              Here are the few registries we have opened to contribute to. Thank
              you so much for all of your generosity!
            </p>
            <div className="registry-images">
              {registries.map((r) => (
                <img
                  src={r.img}
                  alt={r.name}
                  className="w-12 h-auto"
                  onClick={() => window.open(r.url, "_blank")}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </PageSection>
  );
};

export default RegistrySection;
