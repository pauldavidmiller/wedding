import { Section } from "../types/section";
import jaroWinkler from "../data/jarowinkler";
import { Rsvp } from "../types/rsvp";
import { AttendingChoice } from "../types/attending-choice";
import { DinnerChoice } from "../types/dinner-choice";
import { AllowListMember } from "../types/allowlist-member";
import RsvpAllowList from "../data/rsvpAllowList.json";

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
    case Section.AboutUs:
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

export const getPersonOnAllowListByName = (
  inputName: string
): AllowListMember => {
  return RsvpAllowList.find((listMember) => {
    const enteredFullNameArr = inputName.trim().split(" ");
    if (!isValidFullName(inputName)) {
      return false;
    }

    // Only use first and last name anyway
    const enteredFirstName = enteredFullNameArr[0];
    const enteredLastName = enteredFullNameArr[enteredFullNameArr.length - 1];

    // Fuzzy First Name Match and Last Names must be equal
    const firstNameMatch =
      jaroWinkler(listMember.firstName.toLowerCase(), enteredFirstName.toLowerCase(), 0) >= 0.50
    // || levenshtein(listMember.firstName.toLowerCase(), enteredFirstName.toLowerCase()) <= 5

    // Includes
    const lastNameMatch = listMember.lastName.toLowerCase().includes(enteredLastName.toLowerCase());
    // const lastNameMatch = listMember.lastName.toLowerCase() === enteredLastName.toLowerCase();

    return firstNameMatch && lastNameMatch;
  });
};

export const getPersonOnAllowListById = (id: number): AllowListMember => {
  return RsvpAllowList.find((po) => po.id === id);
};

export const isValidSubmission = (
  rsvp: Rsvp,
  nameAttendingAlertMessage: string,
  dinnerAlertMessage: string
): boolean => {
  // Check if name and attending is entered
  if (!isValidFullName(rsvp.name) || !rsvp.attendingChoice) {
    alert(nameAttendingAlertMessage);
    return false;
  }

  // If attending check to make sure other info is filled out
  if (
    rsvp.attendingChoice === AttendingChoice.Yes &&
    (!rsvp.dinnerChoice || rsvp.dinnerChoice === DinnerChoice.None)
  ) {
    alert(dinnerAlertMessage);
    return false;
  }

  return true;
};

export const subtractDays = (date: Date, days: number): Date => {
  const result = new Date(date); // Create a copy of the input date
  result.setDate(result.getDate() - days); // Subtract the days
  return result; // Return the new date
};
