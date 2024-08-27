import React, { useState } from "react";
import CryptoJS from "crypto-js";

interface PasswordPromptProps {
  hashedPassword: string;
  onUnlock: () => void;
}

const PasswordPrompt: React.FC<PasswordPromptProps> = ({
  hashedPassword,
  onUnlock,
}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hash = CryptoJS.SHA256(password).toString();
    if (hash === hashedPassword) {
      onUnlock();
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="password-prompt">
      <div className="password-prompt-container">
        <h2>Paul and Margot Get Married!</h2>
        <p>Please enter the password to access the site:</p>
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
