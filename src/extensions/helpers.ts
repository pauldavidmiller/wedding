import { Section } from "../types/section";
import jaroWinkler from "../data/jarowinkler";
import levenshtein from "../data/levenshtein";

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

export const isValidFullName = (name: string): boolean => {
  var enteredFullNameArr = name?.trim()?.split(" ");
  if (enteredFullNameArr.length <= 1) {
    return false;
  }
  return true;
};

export const isPersonOnList = (
  inputName: string,
  list: { firstName: string; lastName: string }[]
): boolean => {
  return (
    list.find((po) => {
      var allowListFullName = (po.firstName + " " + po.lastName).toLowerCase();
      var enteredFullNameArr = inputName.trim().split(" ");
      if (!isValidFullName(inputName)) {
        return false;
      }

      // Only use first and last name anyway
      var enteredFullName = [
        enteredFullNameArr[0],
        enteredFullNameArr[enteredFullNameArr.length - 1],
      ]
        .join(" ")
        .toLowerCase();
      return (
        jaroWinkler(allowListFullName, enteredFullName, 0) >= 0.9 ||
        levenshtein(allowListFullName, enteredFullName) <= 5
      );
    }) != null
  );
};
