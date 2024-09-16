import { DinnerChoiceType } from "../components/dinner-choice";

export type Rsvp = {
  id: number;
  name: string;
  dinnerChoice: DinnerChoiceType;
  dietaryRestrictions?: string;
};
