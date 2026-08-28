import React from "react";

type AnniversaryVideoProps = {
  src: string;
  poster?: string;
  title?: string;
  caption?: string;
};

const AnniversaryVideo = ({
  src,
  poster,
  title,
  caption,
}: AnniversaryVideoProps) => {
  return (
    <div className="anniversary-video">
      {title && <h2 className="anniversary-video-title">{title}</h2>}
      <div className="anniversary-video-frame">
        <video
          controls
          playsInline
          preload="metadata"
          poster={poster}
          className="anniversary-video-player"
        >
          <source src={src} type="video/mp4" />
          Your browser doesn't support embedded video. You can
          <a href={src}> download the video here</a> instead.
        </video>
      </div>
      {caption && <p className="anniversary-video-caption">{caption}</p>}
    </div>
  );
};

export default AnniversaryVideo;
