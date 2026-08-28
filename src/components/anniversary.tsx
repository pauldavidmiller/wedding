import React from "react";
import { useAppContext } from "../contexts/app-context";
import { getTotalDaysBetween } from "../extensions/helpers";
import AnniversaryConfetti from "./anniversary-confetti";
import AnniversaryVideo from "./anniversary-video";
import CountdownTimer from "./countdown-timer";

const Anniversary = () => {
  const { date, dateFullSpelledString, location, setUnlockedView } =
    useAppContext();

  const daysMarried = getTotalDaysBetween(date);

  return (
    <div className="anniversary">
      <AnniversaryConfetti />

      <div className="anniversary-content">
        {/* Banner */}
        <header className="anniversary-banner">
          <p className="anniversary-eyebrow">Happy Anniversary</p>
          <h1 className="anniversary-headline">One Year</h1>
          <h2 className="anniversary-names">Margot &amp; Paul</h2>
          <p className="anniversary-date">
            {dateFullSpelledString} • {location}
          </p>
          <div className="anniversary-rule">
            <span>&#10084;</span>
          </div>
          <p className="anniversary-days">
            {daysMarried.toLocaleString()} days married and counting
          </p>
          <CountdownTimer
            targetDate={date}
            countUp
            hasTitle
            title="Married For"
            className="anniversary-timer"
          />
        </header>

        {/* Video */}
        <AnniversaryVideo
          src="/video/anniversary-video.mp4"
          poster="/images/anniversary-video-poster.jpg"
          title="Our First Year"
          caption="Turn the sound on"
        />

        {/* More sections to come below */}

        <footer className="anniversary-footer">
          <p>Here's to many, many more.</p>
          <button
            type="button"
            className="anniversary-back-button"
            onClick={() => setUnlockedView(undefined)}
          >
            Back to the front door
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Anniversary;
