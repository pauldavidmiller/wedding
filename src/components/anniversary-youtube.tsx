import React from "react";

type AnniversaryYouTubeProps = {
  src: string;
  title: string;
  heading?: string;
  caption?: string;
};

/* Same frame as the self-hosted anniversary video, but wrapped around a
   YouTube embed so the wedding film can live off-site. */
const AnniversaryYouTube = ({
  src,
  title,
  heading,
  caption,
}: AnniversaryYouTubeProps) => {
  return (
    <div className="anniversary-video">
      {heading && <h2 className="anniversary-video-title">{heading}</h2>}
      <div className="anniversary-video-frame">
        <iframe
          className="anniversary-video-player"
          src={src}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      {caption && <p className="anniversary-video-caption">{caption}</p>}
    </div>
  );
};

export default AnniversaryYouTube;
