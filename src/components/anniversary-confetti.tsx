import React, { useMemo } from "react";

type AnniversaryConfettiProps = {
  pieceCount?: number;
};

const CONFETTI_COLORS = [
  "#d9534f",
  "#f0ad4e",
  "#f7d354",
  "#e8a0bf",
  "#c9a227",
  "#ffffff",
];

/**
 * Purely decorative falling confetti. Sits behind the page content and is
 * switched off for anyone who prefers reduced motion (see App.css).
 */
const AnniversaryConfetti = ({ pieceCount = 60 }: AnniversaryConfettiProps) => {
  // Randomised once on mount so the pieces don't jump around on re-render
  const pieces = useMemo(
    () =>
      Array.from({ length: pieceCount }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 7 + Math.random() * 8,
        color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
        size: 6 + Math.random() * 8,
        isRound: Math.random() > 0.6,
      })),
    [pieceCount]
  );

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            width: `${piece.size}px`,
            height: `${piece.size * (piece.isRound ? 1 : 1.6)}px`,
            backgroundColor: piece.color,
            borderRadius: piece.isRound ? "50%" : "2px",
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default AnniversaryConfetti;
