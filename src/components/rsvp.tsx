import React, { useEffect, useState } from "react";
import Checkbox from "./checkbox";
import plusOneAllowList from "../data/plusOneAllowList.json";
import familyAllowList from "../data/familyAllowList.json";
import axios from "axios";
import { DinnerChoiceType } from "./dinner-choice";
import { Section } from "../types/section";
import { useAppContext } from "../contexts/app-context";
import { isPersonOnList, isValidFullName } from "../extensions/helpers";
import RsvpInput from "./rsvp-input";
import { Rsvp } from "../types/rsvp";

const DEFAULT_RSVP: Rsvp = {
  id: 0,
  name: "",
  dinnerChoice: null,
  dietaryRestrictions: "",
};
const DEFAULT_FAMILY_RSVP: Rsvp = {
  id: 0,
  name: "",
  dinnerChoice: DinnerChoiceType.None,
  dietaryRestrictions: "",
};

function RSVPSection() {
  const { websiteReleaseDate } = useAppContext();
  const disabled = new Date() < websiteReleaseDate;

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Primary
  const [primaryRsvp, setPrimaryRsvp] = useState<Rsvp>(DEFAULT_RSVP);

  // Plus One
  const allowedPlusOne = isPersonOnList(primaryRsvp.name, plusOneAllowList);
  const [isBringingPlusOne, setIsBringingPlusOne] = useState<boolean>(false);
  const [plusOneRsvp, setPlusOneRsvp] = useState<Rsvp>(DEFAULT_RSVP);

  // Family
  const allowedFamily = isPersonOnList(primaryRsvp.name, familyAllowList);
  const [isFillingOutFamily, setIsFillingOutFamily] = useState<boolean>(false);
  const [familyMemberRsvps, setFamilyMemberRsvps] = useState<Rsvp[]>([
    DEFAULT_FAMILY_RSVP,
  ]);

  const handleAddFamilyMember = () => {
    setFamilyMemberRsvps((fm) => [
      ...fm,
      { id: fm.length, name: "", dinnerChoice: DinnerChoiceType.None },
    ]);
  };

  const handleUpdateFamilyMemberName = (id: number, newName: string) => {
    setFamilyMemberRsvps((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      )
    );
  };

  const handleUpdateFamilyMemberDinnerChoice = (
    id: number,
    newDinnerChoice: DinnerChoiceType
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
    setPlusOneRsvp(DEFAULT_RSVP);

    setIsFillingOutFamily(false);
    setFamilyMemberRsvps([DEFAULT_FAMILY_RSVP]);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Gather all Rsvps
    let rsvps = [primaryRsvp];

    // Check if name and dinner choice is entered
    if (
      !isValidFullName(primaryRsvp.name) ||
      !primaryRsvp.dinnerChoice ||
      primaryRsvp.dinnerChoice === DinnerChoiceType.None
    ) {
      alert("Please enter your full name and dinner choice!");
      return;
    }

    if (isBringingPlusOne) {
      // Check if plus one name is required
      if (
        !isValidFullName(plusOneRsvp.name) ||
        !primaryRsvp.dinnerChoice ||
        plusOneRsvp.dinnerChoice === DinnerChoiceType.None
      ) {
        alert("Please provide your plus one's full name and dinner choice!");
        return;
      }

      rsvps.push(plusOneRsvp);
    }

    if (isFillingOutFamily) {
      // Check if any family members aren't valid
      if (familyMemberRsvps.find((fm) => !isValidFullName(fm.name))) {
        alert("Please provide a valid full name for a family member");
        return;
      }

      rsvps.push(...familyMemberRsvps);
    }

    try {
      setIsSubmitting(true);

      const res = await axios.post("/api/notify", {
        rsvps,
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
      setPlusOneRsvp(DEFAULT_RSVP);
    }
  }, [allowedPlusOne, isBringingPlusOne]);

  useEffect(() => {
    if (!allowedFamily || !isFillingOutFamily) {
      setIsFillingOutFamily(false);
      setFamilyMemberRsvps([DEFAULT_FAMILY_RSVP]);
    }
  }, [allowedFamily, isFillingOutFamily]);

  return (
    <section id={Section.Rsvp} className="rsvp">
      <h2>RSVP</h2>
      <form className="rsvp-form" autoComplete="off" onSubmit={handleSubmit}>
        <RsvpInput
          name={primaryRsvp.name}
          setName={(e) =>
            setPrimaryRsvp((rsvp) => ({ ...rsvp, name: e.target.value }))
          }
          dinnerChoiceName="primary"
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
                      dinnerChoiceName={`familymember-${i}`}
                      dinnerChoice={fm.dinnerChoice}
                      setDinnerChoice={(dinnerChoice) =>
                        handleUpdateFamilyMemberDinnerChoice(i, dinnerChoice)
                      }
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
                  setPlusOneRsvp((rsvp) => ({ ...rsvp, name: e.target.value }))
                }
                dinnerChoiceName="plusOne"
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
        <button
          disabled={disabled}
          type="submit"
          className="w-1/3 justify-center bg-green-500 disabled:cursor-not-allowed"
        >
          {isSubmitting ? <div className="spinner" /> : "Send RSVP"}
        </button>
      </form>
    </section>
  );
}

export default RSVPSection;
