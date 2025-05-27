export type AllowListMember = {
  id: number;
  firstName: string;
  lastName: string;
  maxAdditionalCount: number;
  additionalMembers: number[];
  rehearsalDinnerRsvpEnabled?: boolean;
};
