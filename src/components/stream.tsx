import React from "react";
import ZoomEmbed from "./zoom-embed";
import { Section } from "../types/section";
import { useAppContext } from "../contexts/app-context";
import PageSection, { SectionVariant } from "./page-section";

const StreamSection = () => {
  const { zoomMeetingLink, isStreamEnabled } = useAppContext();

  return (
    <PageSection id={Section.Stream} title="Video Stream">
      {isStreamEnabled ? (
        <ZoomEmbed meetingLink={zoomMeetingLink} />
      ) : (
        <>
          <p className="text-center">The Wedding Live Stream will be here!</p>
          <ZoomEmbed meetingLink={null} />
        </>
      )}
    </PageSection>
  );
};

export default StreamSection;
