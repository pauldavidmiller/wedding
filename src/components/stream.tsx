import React from "react";
import ZoomEmbed from "./zoom-embed";
import { Section } from "../types/section";
import { useAppContext } from "../contexts/app-context";

const StreamSection = () => {
  const { zoomMeetingLink, isStreamEnabled } = useAppContext();

  return (
    <section id={Section.Stream} className="stream-section">
      <h2>Video Stream</h2>
      {isStreamEnabled ? (
        <ZoomEmbed meetingLink={zoomMeetingLink} />
      ) : (
        <>
          <p className="text-center">The Wedding Live Stream will be here!</p>
          <ZoomEmbed meetingLink={null} />
        </>
      )}
    </section>
  );
};

export default StreamSection;
