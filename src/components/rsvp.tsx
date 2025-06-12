import React, { useEffect, useState } from "react";
import Checkbox from "./checkbox";
import axios from "axios";
import { Section } from "../types/section";
import { useAppContext } from "../contexts/app-context";
import {
  getPersonOnAllowListById,
  getPersonOnAllowListByName,
  isValidSubmission,
} from "../extensions/helpers";
import RsvpInput from "./rsvp-input";
import { Rsvp } from "../types/rsvp";
import { DinnerChoice } from "../types/dinner-choice";
import { AttendingChoice } from "../types/attending-choice";
import PageSection, { SectionVariant } from "./page-section";
import { isDevelopment } from "../extensions/environments";
import { useLocalStorage } from "../contexts/use-local-storage";
import DinnerMenu from "./dinner-menu";

const DEFAULT_RSVP: Rsvp = {
  id: 0,
  name: "",
  attendingChoice: null,
  dinnerChoice: null,
  dietaryRestrictions: "",
  attendingRehearsal: null,
};
const DEFAULT_EXTRA_RSVP: Rsvp = {
  id: 0,
  name: "",
  attendingChoice: AttendingChoice.Yes,
  dinnerChoice: null,
  dietaryRestrictions: "",
  attendingRehearsal: null,
};

function RSVPSection() {
  const { rsvpReleaseDate, reshearsalRsvpDateSpelledString } = useAppContext();
  const disabled = new Date() < rsvpReleaseDate && !isDevelopment();

  const [isRsvpFormOpen, setIsRsvpFormOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Primary
  const [primaryRsvp, setPrimaryRsvp] = useState<Rsvp>(DEFAULT_RSVP);
  const primaryRsvpAllowedData = getPersonOnAllowListByName(primaryRsvp.name);
  const [otherComments, setOtherComments] = useState<string>("");
  const [confirmationEmailAddress, setConfirmationEmailAddress] =
    useState<string>("");

  // Additions
  const [isFillingOutAdditions, setIsFillingOutAdditions] =
    useState<boolean>(false);
  const [additionalRsvps, setAdditionalRsvps] = useState<Rsvp[]>([
    DEFAULT_EXTRA_RSVP,
  ]);

  // Reactions
  useEffect(() => {
    if (!primaryRsvpAllowedData && !!primaryRsvp.attendingChoice) {
      setPrimaryRsvp((r) => ({
        ...r,
        attendingChoice: null,
        dinnerChoice: null,
        dietaryRestrictions: "",
        attendingRehearsal: null,
      }));
      setAdditionalRsvps([]);
    }
  }, [primaryRsvpAllowedData, primaryRsvp.attendingChoice]);

  // TODO: move to online database
  const [hasAlreadyRsvped, setHasAlreadyRsvped] = useLocalStorage(
    "already-rsvped",
    false
  );

  const handleAddAddition = () => {
    setAdditionalRsvps((fm) => [
      ...fm,
      { ...DEFAULT_EXTRA_RSVP, id: fm.length },
    ]);
  };

  const handleUpdateAdditionName = (id: number, newName: string) => {
    setAdditionalRsvps((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      )
    );
  };

  const handleUpdateAdditionAttendingChoice = (
    id: number,
    newAttendingChoice: AttendingChoice
  ) => {
    setAdditionalRsvps((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              attendingChoice: newAttendingChoice,
              dinnerChoice: null,
              dietaryRestrictions: null,
            }
          : item
      )
    );
  };

  const handleUpdateAdditionAttendingRehearsal = (
    id: number,
    newAttendingRehearsal: AttendingChoice
  ) => {
    setAdditionalRsvps((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              attendingRehearsal: newAttendingRehearsal,
            }
          : item
      )
    );
  };

  const handleUpdateAdditionDinnerChoice = (
    id: number,
    newDinnerChoice: DinnerChoice
  ) => {
    setAdditionalRsvps((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, dinnerChoice: newDinnerChoice } : item
      )
    );
  };

  const handleUpdateAdditionDietaryRestrictions = (
    id: number,
    newDietaryRestrictions: string
  ) => {
    setAdditionalRsvps((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, dietaryRestrictions: newDietaryRestrictions }
          : item
      )
    );
  };

  const handleRemoveAddition = (id: number) => {
    setAdditionalRsvps((prevItems) => prevItems.filter((i) => i.id !== id));
  };

  const clearForm = () => {
    setPrimaryRsvp(DEFAULT_RSVP);

    setIsFillingOutAdditions(false);
    setAdditionalRsvps([DEFAULT_EXTRA_RSVP]);

    setOtherComments("");
    setConfirmationEmailAddress("");
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Gather all Rsvps
    let rsvps = [primaryRsvp];

    // Validate Primary Rsvp
    const isValid = isValidSubmission(
      primaryRsvp,
      "Please enter your full name and whether you're attending.",
      "Please enter your dinner choice.",
      "Please enter whether you are attending the rehearsal dinner."
    );

    if (!isValid) {
      return;
    }

    if (isFillingOutAdditions) {
      // Validate all Additional Rsvps
      for (let i = 0; i < additionalRsvps.length; i++) {
        const fm = additionalRsvps[i];

        const isValid = isValidSubmission(
          fm,
          "One of the members of your party is missing either their full name or their RSVP status.",
          "There is a missing dinner selection for a member of your party.",
          "One of the members of your party is missing their RSVP to the rehearsal dinner."
        );

        if (!isValid) {
          return;
        }
      }

      rsvps.push(...additionalRsvps);
    }

    try {
      setIsSubmitting(true);

      const res = await axios.post("/api/notify", {
        rsvps,
        confirmationEmailAddress,
        otherComments,
      });

      if (res?.data?.success) {
        setIsSubmitting(false);
        setHasAlreadyRsvped(true);
        clearForm(); // Clear the form after successful submission
        alert("RSVP sent successfully!");
      } else {
        alert("RSVP failed to send!");
      }
    } catch (error: any) {
      console.error("Error sending notification:", error);
      alert("RSVP failed to send!");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isFillingOutAdditions) {
      const autoFillRsvps: Rsvp[] =
        primaryRsvpAllowedData?.additionalMembers?.map((memberId, i) => {
          const allowListMember = getPersonOnAllowListById(memberId);
          return {
            id: i,
            name: allowListMember.firstName + " " + allowListMember.lastName,
            dietaryRestrictions: "",
            allowListMember: allowListMember,
          };
        });
      setAdditionalRsvps(
        autoFillRsvps?.length > 0 ? autoFillRsvps : [DEFAULT_EXTRA_RSVP]
      );
    } else {
      setIsFillingOutAdditions(false);
      setAdditionalRsvps([]);
    }
  }, [isFillingOutAdditions, primaryRsvpAllowedData?.additionalMembers]);

  useEffect(() => {
    if (!!primaryRsvpAllowedData?.additionalMembers?.length) {
      setIsFillingOutAdditions(true);
    } else {
      setIsFillingOutAdditions(false);
      setAdditionalRsvps([]);
    }
  }, [primaryRsvpAllowedData?.additionalMembers?.length]);

  if (!isRsvpFormOpen) {
    return (
      <PageSection
        id={Section.Rsvp}
        title="RSVP"
        variant={SectionVariant.white}
        isComingSoon={disabled}
      >
        <div className="flex flex-col gap-4">
          <label className="text-xl">
            Kindly RSVP by {reshearsalRsvpDateSpelledString}
          </label>
          <button
            type="button"
            className="rsvp-button"
            onClick={() => setIsRsvpFormOpen(true)}
          >
            Send Rsvp Now
          </button>
        </div>
      </PageSection>
    );
  }

  return (
    <PageSection
      id={Section.Rsvp}
      title="RSVP"
      variant={SectionVariant.white}
      isComingSoon={disabled}
    >
      {/* Menu */}
      {primaryRsvp.attendingChoice === AttendingChoice.Yes && <DinnerMenu />}

      {/* RSVP Form */}
      <form
        className="rsvp-form lora-text"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <RsvpInput
          name={primaryRsvp.name}
          setName={(e) =>
            setPrimaryRsvp((rsvp) => ({ ...rsvp, name: e.target.value }))
          }
          rsvpKey="primary"
          attendingChoice={primaryRsvp.attendingChoice}
          setAttendingChoice={(attendingChoice) =>
            setPrimaryRsvp((rsvp) => ({ ...rsvp, attendingChoice }))
          }
          dinnerChoice={primaryRsvp.dinnerChoice}
          setDinnerChoice={(dinnerChoice) =>
            setPrimaryRsvp((rsvp) => ({ ...rsvp, dinnerChoice }))
          }
          dietaryRestrictions={primaryRsvp.dietaryRestrictions}
          setDietaryRestrictions={(e) =>
            setPrimaryRsvp((rsvp) => ({
              ...rsvp,
              dietaryRestrictions: e.target.value,
            }))
          }
          attendingRehearsal={primaryRsvp.attendingRehearsal}
          setAttendingRehearsal={(attendingRehearsal) =>
            setPrimaryRsvp((rsvp) => ({ ...rsvp, attendingRehearsal }))
          }
          disabled={disabled}
          className={
            !!additionalRsvps?.find((r) => !r.allowListMember) && "pr-12"
          }
          allowListMember={primaryRsvpAllowedData}
        />

        {primaryRsvpAllowedData?.additionalMembers?.length > 0 && (
          <fieldset disabled={disabled}>
            <Checkbox
              isChecked={isFillingOutAdditions}
              setIsChecked={setIsFillingOutAdditions}
              label={
                primaryRsvpAllowedData?.additionalMembers?.length === 1
                  ? "Additional Guest?"
                  : "Filling out for Family?"
              }
            />
            {isFillingOutAdditions && (
              <div className="flex flex-col gap-4 pb-4">
                {additionalRsvps.map((fm, i) => (
                  <div
                    key={i}
                    className="flex gap-3 justify-between border rounded-lg border-gray-300 py-2 px-4"
                  >
                    <RsvpInput
                      name={fm.name}
                      setName={(e) =>
                        handleUpdateAdditionName(i, e.target.value)
                      }
                      rsvpKey={`familymember-${i}`}
                      attendingChoice={fm.attendingChoice}
                      setAttendingChoice={(attendingChoice) =>
                        handleUpdateAdditionAttendingChoice(i, attendingChoice)
                      }
                      dinnerChoice={fm.dinnerChoice}
                      setDinnerChoice={(dinnerChoice) =>
                        handleUpdateAdditionDinnerChoice(i, dinnerChoice)
                      }
                      dietaryRestrictions={fm.dietaryRestrictions}
                      setDietaryRestrictions={(e) =>
                        handleUpdateAdditionDietaryRestrictions(
                          i,
                          e.target.value
                        )
                      }
                      attendingRehearsal={fm.attendingRehearsal}
                      setAttendingRehearsal={(attendingRehearsal) =>
                        handleUpdateAdditionAttendingRehearsal(
                          i,
                          attendingRehearsal
                        )
                      }
                      disabled={disabled}
                      allowListMember={getPersonOnAllowListByName(fm.name)}
                    />
                    {!fm.allowListMember && (
                      <button
                        type="button"
                        className="close-button"
                        onClick={() => handleRemoveAddition(i)}
                        disabled={additionalRsvps.length === 1}
                      >
                        ✖
                      </button>
                    )}
                  </div>
                ))}
                {additionalRsvps.length <
                  primaryRsvpAllowedData?.additionalMembers?.length && (
                  <button
                    type="button"
                    className="add-button"
                    onClick={() => handleAddAddition()}
                  >
                    ➕ Add Family Member
                  </button>
                )}
              </div>
            )}
          </fieldset>
        )}

        <div className="rsvp-other-comments">
          <legend>Custom Message:</legend>
          <textarea
            placeholder="Leave a custom message here..."
            value={otherComments}
            onChange={(e) => setOtherComments(e.target.value)}
            disabled={disabled}
          />
        </div>

        <div className="rsvp-email-address">
          <legend>Your Email Address (optional for confirmation):</legend>
          <input
            type="email"
            disabled={disabled}
            placeholder="name@email.com"
            value={confirmationEmailAddress}
            onChange={(e) => setConfirmationEmailAddress(e.target.value)}
          />
        </div>
        <button
          disabled={disabled} // TODO: Disable one day for real site || hasAlreadyRsvped}
          type="submit"
          className="rsvp-submit-button"
          title={
            hasAlreadyRsvped
              ? "You or a member of your party has already RSVPed."
              : null
          }
        >
          {isSubmitting ? <div className="spinner" /> : "Send RSVP"}
        </button>
      </form>
    </PageSection>
  );
}

export default RSVPSection;
