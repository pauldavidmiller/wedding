import { AllowListMember } from "./allowlist-member";
import { AttendingChoice } from "./attending-choice";
import { DinnerChoice } from "./dinner-choice";

export type Rsvp = {
  id: number;
  name: string;
  attendingChoice?: AttendingChoice | null;
  dinnerChoice?: DinnerChoice | null;
  dietaryRestrictions: string;
  attendingRehearsal?: AttendingChoice | null;
  allowListMember?: AllowListMember;
};
