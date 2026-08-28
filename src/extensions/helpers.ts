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

type NameMatch = {
  firstNameMatchValue: number;
  isMatch: boolean;
  listMember: AllowListMember;
}
export const getPersonOnAllowListByName = (
  inputName: string
): AllowListMember => {
  // Make Sure there are 2 names at least
  const enteredFullNameArr = inputName.trim().split(" ");
  if (!isValidFullName(inputName)) {
    return null;
  }

  // Only use first and last name anyway
  const enteredFirstName = enteredFullNameArr[0];
  const enteredLastName = enteredFullNameArr[enteredFullNameArr.length - 1];

  const matches: NameMatch[] =
    // 1. Determine all ListMembers Eligibility
    RsvpAllowList.map((listMember) => {
      // Fuzzy First Name Match and Last Names must be equal
      const firstNameMatchValue = jaroWinkler(listMember.firstName.toLowerCase(), enteredFirstName.toLowerCase(), 0);
      const firstNameMatch = firstNameMatchValue >= 0.50
      // || levenshtein(listMember.firstName.toLowerCase(), enteredFirstName.toLowerCase()) <= 5

      // Includes
      const lastNameMatch = listMember.lastName.toLowerCase() === enteredLastName.toLowerCase();

      return { firstNameMatchValue, isMatch: firstNameMatch && lastNameMatch, listMember };
    })
      // 2. Filter all ListMembers if there is a Match
      ?.filter(m => !!m.isMatch)
      // 3. Rank ListMembers by the Match Score
      ?.sort((a, b) => b.firstNameMatchValue - a.firstNameMatchValue);

  // 4. Return Highest Ranked ListMember
  return matches?.[0]?.listMember;
};

export const getPersonOnAllowListById = (id: number): AllowListMember => {
  return RsvpAllowList.find((po) => po.id === id);
};

export const isValidSubmission = (
  rsvp: Rsvp,
  nameAttendingAlertMessage: string,
  dinnerAlertMessage: string,
  rehearsalAlertMessage: string
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

  // Check to make sure attending rehearsal was filled out if enabled
  if (!!rsvp.allowListMember?.rehearsalDinnerRsvpEnabled && rsvp.attendingRehearsal == null) {
    alert(rehearsalAlertMessage)
    return false;
  }

  return true;
};

export const subtractDays = (date: Date, days: number): Date => {
  const result = new Date(date); // Create a copy of the input date
  result.setDate(result.getDate() - days); // Subtract the days
  return result; // Return the new date
};

export type ElapsedTime = {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/**
 * Calendar accurate elapsed time between two dates, broken down into
 * years / months / days / hours / minutes / seconds. Borrows from the next
 * larger unit whenever a unit goes negative (so "1 year, 0 months, 3 days"
 * stays true no matter how long the months in between happened to be).
 */
export const getElapsedTime = (from: Date, to: Date = new Date()): ElapsedTime => {
  // Nothing has elapsed yet if the start date is still in the future
  if (to.getTime() <= from.getTime()) {
    return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  let hours = to.getHours() - from.getHours();
  let minutes = to.getMinutes() - from.getMinutes();
  let seconds = to.getSeconds() - from.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes -= 1;
  }
  if (minutes < 0) {
    minutes += 60;
    hours -= 1;
  }
  if (hours < 0) {
    hours += 24;
    days -= 1;
  }
  if (days < 0) {
    // Borrow the number of days in the month just before the "to" month
    const daysInPreviousMonth = new Date(
      to.getFullYear(),
      to.getMonth(),
      0
    ).getDate();
    days += daysInPreviousMonth;
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return { years, months, days, hours, minutes, seconds };
};

/** Total whole days between two dates. */
export const getTotalDaysBetween = (from: Date, to: Date = new Date()): number => {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  return Math.max(
    0,
    Math.floor((to.getTime() - from.getTime()) / millisecondsPerDay)
  );
};
