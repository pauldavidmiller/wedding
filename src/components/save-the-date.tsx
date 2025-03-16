import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { useAppContext } from "../contexts/app-context";
import Carousel from "./carousel";
import CountdownTimer from "./countdown-timer";
import { isDevelopment } from "../extensions/environments";

const SaveTheDate = () => {
  const {
    hashedPassword,
    setIsUnlocked,
    websiteReleaseDate,
    date,
    dateSpelledString,
    venueName,
    venuAddress,
  } = useAppContext();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showSiteOverride, setShowSiteOverride] = useState<boolean>(false);
  const showFullSitePasswordInput =
    new Date() >= websiteReleaseDate || showSiteOverride || isDevelopment();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hash = CryptoJS.SHA256(password).toString();
    if (hash === hashedPassword) {
      setIsUnlocked(true);
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="password-prompt">
      <div className="password-prompt-container">
        <h1>Save the Date!</h1>
        <h2>{dateSpelledString}</h2>
        <CountdownTimer targetDate={date} />
        <h3>The Wedding of</h3>
        <h4>Margot and Paul</h4>
        <h5>{venueName}</h5>
        <h6>{venuAddress}</h6>
        <Carousel className="password-prompt-carousel" />
        {showFullSitePasswordInput ? (
          <div className="pt-2">
            <p>Please enter the password to access the full site:</p>
            <form onSubmit={handleSubmit}>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col w-full justify-center pt-2">
            <div className="flex flex-row text-blue-700 font-bold w-full justify-center pt-2">
              <span>Full Wedding Website coming soon</span>
              <span onClick={() => setShowSiteOverride(!showSiteOverride)}>
                ...
              </span>
            </div>
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default SaveTheDate;
