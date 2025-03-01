import { DinnerChoice } from "./dinner-choice";

export type DinnerMenuOption = {
  choice: DinnerChoice;
  description: string;
  note?: string;
};
