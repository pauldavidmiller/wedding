import React from "react";

type ZoomEmbedProps = {
  meetingLink?: string;
};

const ZoomEmbed = ({ meetingLink }: ZoomEmbedProps) => {
  return (
    <div
      style={{
        width: "75%",
        height: "500px",
        overflow: "hidden",
        justifySelf: "center",
      }}
    >
      <iframe
        src={meetingLink}
        width="100%"
        height="100%"
        // style={{ border: "none" }}
        allow="camera; microphone; autoplay"
        title="Wedding Zoom Video"
        className={`border-none ${meetingLink == null && "bg-black"}`}
      />
    </div>
  );
};

export default ZoomEmbed;
