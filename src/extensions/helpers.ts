import { Section } from "../types/section";

export const capitalizeFirstLetter = (string?: string): string => {
  return string == null
    ? null
    : string.charAt(0).toUpperCase() + string.slice(1);
};

export const getTabFromSection = (tab: Section): string => {
  switch (tab) {
    case Section.Signature:
      return "Home";
    default:
      return tab;
  }
};

export const getTitleFromSection = (tab: Section): string => {
  switch (tab) {
    case Section.Signature:
    case Section.Hero:
      return "Home";
    case Section.About:
      return "Our Story";
    default:
      return tab;
  }
};
