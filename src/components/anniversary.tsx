import React from "react";
import { useAppContext } from "../contexts/app-context";
import { getTotalDaysBetween } from "../extensions/helpers";
import AnniversaryConfetti from "./anniversary-confetti";
import AnniversaryCrossword from "./anniversary-crossword";
import AnniversaryPath, {
  AnniversaryStop,
  AnniversaryTrail,
} from "./anniversary-path";
import AnniversaryVideo from "./anniversary-video";
import AnniversaryYouTube from "./anniversary-youtube";
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

        {/* The walk: wedding day, the year since, then the crossword. */}
        <AnniversaryPath>
          <AnniversaryTrail />
          <AnniversaryStop label="Where it started" />
          <AnniversaryYouTube
            src="https://www.youtube.com/embed/90LNqLBa508?si=ss9FiRkvi5xoxNj7"
            title="Margot and Paul's wedding film"
            heading="A Quick Trip Down Memory Lane"
            caption="Two minutes of our wedding day"
          />

          <AnniversaryTrail />
          <AnniversaryStop label="The year since" />
          <AnniversaryVideo
            src="/video/anniversary-video.mp4"
            poster="/images/anniversary-video-poster.jpg"
            title="Our First Year"
            caption="Turn the sound on"
          />

          <AnniversaryTrail />
          <AnniversaryStop label="One year later" />
          <AnniversaryCrossword />

          <AnniversaryTrail />
        </AnniversaryPath>

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
