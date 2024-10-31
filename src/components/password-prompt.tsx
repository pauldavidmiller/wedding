import React, { useState } from "react";
import CryptoJS from "crypto-js";
import { useAppContext } from "../contexts/app-context";

const PasswordPrompt = () => {
  const { hashedPassword, setIsUnlocked } = useAppContext();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
        <h2>August 31st, 2025</h2>
        <h3>The Wedding of</h3>
        <h4>Margot and Paul</h4>
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
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default PasswordPrompt;
