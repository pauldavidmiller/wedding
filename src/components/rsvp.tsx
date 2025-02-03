import React, { useEffect, useState } from "react";
import Checkbox from "./checkbox";
import plusOneAllowList from "../data/plusOneAllowList.json";
import familyAllowList from "../data/familyAllowList.json";
import axios from "axios";
import { Section } from "../types/section";
import { useAppContext } from "../contexts/app-context";
import { isPersonOnList, validateSubmission } from "../extensions/helpers";
import RsvpInput from "./rsvp-input";
import { Rsvp } from "../types/rsvp";
import { DinnerChoice } from "../types/dinner-choice";
import { AttendingChoice } from "../types/attending-choice";
import PageSection from "./page-section";

const DEFAULT_RSVP: Rsvp = {
  id: 0,
  name: "",
  attendingChoice: null,
  dinnerChoice: null,
  dietaryRestrictions: "",
};
const DEFAULT_EXTRA_RSVP: Rsvp = {
  id: 0,
  name: "",
  attendingChoice: AttendingChoice.Yes,
  dinnerChoice: null,
  dietaryRestrictions: "",
};

function RSVPSection() {
  const { websiteReleaseDate } = useAppContext();
  const disabled = new Date() < websiteReleaseDate;

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Primary
  const [primaryRsvp, setPrimaryRsvp] = useState<Rsvp>(DEFAULT_RSVP);
  const [confirmationEmailAddress, setConfirmationEmailAddress] =
    useState<string>("");

  // Plus One
  const allowedPlusOne = isPersonOnList(primaryRsvp.name, plusOneAllowList);
  const [isBringingPlusOne, setIsBringingPlusOne] = useState<boolean>(false);
  const [plusOneRsvp, setPlusOneRsvp] = useState<Rsvp>(DEFAULT_EXTRA_RSVP);

  // Family
  const allowedFamily = isPersonOnList(primaryRsvp.name, familyAllowList);
  const [isFillingOutFamily, setIsFillingOutFamily] = useState<boolean>(false);
  const [familyMemberRsvps, setFamilyMemberRsvps] = useState<Rsvp[]>([
    DEFAULT_EXTRA_RSVP,
  ]);

  const handleAddFamilyMember = () => {
    setFamilyMemberRsvps((fm) => [
      ...fm,
      { ...DEFAULT_EXTRA_RSVP, id: fm.length },
    ]);
  };

  const handleUpdateFamilyMemberName = (id: number, newName: string) => {
    setFamilyMemberRsvps((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      )
    );
  };

  const handleUpdateFamilyMemberAttendingChoice = (
    id: number,
    newAttendingChoice: AttendingChoice
  ) => {
    setFamilyMemberRsvps((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, attendingChoice: newAttendingChoice } : item
      )
    );
  };

  const handleUpdateFamilyMemberDinnerChoice = (
    id: number,
    newDinnerChoice: DinnerChoice
  ) => {
    setFamilyMemberRsvps((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, dinnerChoice: newDinnerChoice } : item
      )
    );
  };

  const handleUpdateFamilyMemberDietaryRestrictions = (
    id: number,
    newDietaryRestrictions: string
  ) => {
    setFamilyMemberRsvps((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, dietaryRestrictions: newDietaryRestrictions }
          : item
      )
    );
  };

  const handleRemoveFamilyMember = (id: number) => {
    setFamilyMemberRsvps((prevItems) => prevItems.filter((i) => i.id !== id));
  };

  const clearForm = () => {
    setPrimaryRsvp(DEFAULT_RSVP);

    setIsBringingPlusOne(false);
    setPlusOneRsvp(DEFAULT_EXTRA_RSVP);

    setIsFillingOutFamily(false);
    setFamilyMemberRsvps([DEFAULT_EXTRA_RSVP]);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Gather all Rsvps
    let rsvps = [primaryRsvp];

    // Validate Primary Rsvp
    validateSubmission(
      primaryRsvp,
      "Please enter your full name and whether you're attending!",
      "Please enter your dinner choice!"
    );

    // Validate Plus One Rsvp
    if (isBringingPlusOne) {
      validateSubmission(
        plusOneRsvp,
        "Please provide your plus one's full name and whether they are attending!",
        "Please enter your plus one's dinner choice!"
      );

      rsvps.push(plusOneRsvp);
    }

    if (isFillingOutFamily) {
      // Valid all Family Members Rsvps
      for (let i = 0; i < familyMemberRsvps.length; i++) {
        const fm = familyMemberRsvps[i];

        validateSubmission(
          fm,
          "Please provide a full name for a family member!",
          "Please provide a dinner choice for a family member!"
        );
      }

      rsvps.push(...familyMemberRsvps);
    }

    try {
      setIsSubmitting(true);

      const res = await axios.post("/api/notify", {
        rsvps,
        confirmationEmailAddress,
      });

      if (res?.data?.success) {
        setIsSubmitting(false);
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
    if (!allowedPlusOne || !isBringingPlusOne) {
      setIsBringingPlusOne(false);
      setPlusOneRsvp(DEFAULT_EXTRA_RSVP);
    }
  }, [allowedPlusOne, isBringingPlusOne]);

  useEffect(() => {
    if (!allowedFamily || !isFillingOutFamily) {
      setIsFillingOutFamily(false);
      setFamilyMemberRsvps([DEFAULT_EXTRA_RSVP]);
    }
  }, [allowedFamily, isFillingOutFamily]);

  return (
    <PageSection id={Section.Rsvp} title="RSVP">
      <form className="rsvp-form" autoComplete="off" onSubmit={handleSubmit}>
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
          disabled={disabled}
        />

        {allowedFamily && (
          <fieldset disabled={disabled}>
            <Checkbox
              isChecked={isFillingOutFamily}
              setIsChecked={setIsFillingOutFamily}
              label="Filling Out for Family?"
            />
            {isFillingOutFamily && (
              <div className="flex flex-col">
                {familyMemberRsvps.map((fm, i) => (
                  <div key={i} className="flex gap-3">
                    <RsvpInput
                      name={fm.name}
                      setName={(e) =>
                        handleUpdateFamilyMemberName(i, e.target.value)
                      }
                      rsvpKey={`familymember-${i}`}
                      attendingChoice={fm.attendingChoice}
                      setAttendingChoice={(attendingChoice) =>
                        handleUpdateFamilyMemberAttendingChoice(
                          i,
                          attendingChoice
                        )
                      }
                      dinnerChoice={fm.dinnerChoice}
                      setDinnerChoice={(dinnerChoice) =>
                        handleUpdateFamilyMemberDinnerChoice(i, dinnerChoice)
                      }
                      hasDinnerChoiceNone={true}
                      dietaryRestrictions={fm.dietaryRestrictions}
                      setDietaryRestrictions={(e) =>
                        handleUpdateFamilyMemberDietaryRestrictions(
                          i,
                          e.target.value
                        )
                      }
                      disabled={disabled}
                    />
                    <button
                      type="button"
                      className="close-button"
                      onClick={() => handleRemoveFamilyMember(i)}
                      disabled={familyMemberRsvps.length === 1}
                    >
                      ✖
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-button"
                  onClick={() => handleAddFamilyMember()}
                >
                  ➕ Add Family Member
                </button>
              </div>
            )}
          </fieldset>
        )}
        {allowedPlusOne && (
          <fieldset disabled={disabled}>
            <Checkbox
              isChecked={isBringingPlusOne}
              setIsChecked={setIsBringingPlusOne}
              label="Plus One?"
            />
            {isBringingPlusOne && (
              <RsvpInput
                name={plusOneRsvp.name}
                setName={(e) =>
                  setPlusOneRsvp((rsvp) => ({
                    ...rsvp,
                    name: e.target.value,
                  }))
                }
                rsvpKey="plusOne"
                attendingChoice={plusOneRsvp.attendingChoice}
                setAttendingChoice={(attendingChoice) =>
                  setPlusOneRsvp((rsvp) => ({ ...rsvp, attendingChoice }))
                }
                dinnerChoice={plusOneRsvp.dinnerChoice}
                setDinnerChoice={(dinnerChoice) =>
                  setPlusOneRsvp((rsvp) => ({ ...rsvp, dinnerChoice }))
                }
                dietaryRestrictions={plusOneRsvp.dietaryRestrictions}
                setDietaryRestrictions={(e) =>
                  setPlusOneRsvp((rsvp) => ({
                    ...rsvp,
                    dietaryRestrictions: e.target.value,
                  }))
                }
                disabled={disabled}
              />
            )}
          </fieldset>
        )}
        <div className="rsvp-email-address">
          <legend>RSVP Confirmation (optional):</legend>
          <input
            type="email"
            disabled={disabled}
            placeholder="name@email.com"
            value={confirmationEmailAddress}
            onChange={(e) => setConfirmationEmailAddress(e.target.value)}
          />
        </div>
        <button
          disabled={disabled}
          type="submit"
          className="rsvp-submit-button"
        >
          {isSubmitting ? <div className="spinner" /> : "Send RSVP"}
        </button>
      </form>
    </PageSection>
  );
}

export default RSVPSection;
