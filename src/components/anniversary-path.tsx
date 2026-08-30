import React, { useCallback, useEffect, useRef, useState } from "react";

/* A thin gold line that threads the page together. It runs straight down
   behind each section and meanders through the gaps between them, drawing
   itself in as you scroll so the page reads as one walk from the wedding to
   now. Everything is measured from the real DOM, so the line stays glued to
   the sections however the page reflows. */

type Band = { top: number; height: number };

const MASK_ID = "anniversary-path-mask";

/* Half a bend: leaves and arrives travelling straight down, so consecutive
   halves join without a kink. */
const bend = (
  fromX: number,
  fromY: number,
  toX: number,
  toY: number
) => {
  const pull = (toY - fromY) * 0.6;
  return `C ${fromX} ${fromY + pull}, ${toX} ${toY - pull}, ${toX} ${toY}`;
};

const buildPath = (width: number, height: number, trails: Band[]) => {
  if (width <= 0 || height <= 0) return "";

  const centre = width / 2;
  const sway = Math.min(width * 0.16, 90);

  let d = `M ${centre} 0`;
  trails.forEach((trail, index) => {
    const side = index % 2 === 0 ? 1 : -1;
    const middle = trail.top + trail.height / 2;
    d += ` L ${centre} ${trail.top}`;
    d += ` ${bend(centre, trail.top, centre + side * sway, middle)}`;
    d += ` ${bend(centre + side * sway, middle, centre, trail.top + trail.height)}`;
  });
  d += ` L ${centre} ${height}`;
  return d;
};

const AnniversaryPath = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const frameRef = useRef<number>();

  const [box, setBox] = useState({ width: 0, height: 0 });
  const [shelters, setShelters] = useState<Band[]>([]);
  const [shape, setShape] = useState("");
  const [length, setLength] = useState(0);
  const [walked, setWalked] = useState(0);
  const [tip, setTip] = useState<{ x: number; y: number }>();

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const bounds = container.getBoundingClientRect();
    const bands = (selector: string): Band[] =>
      Array.from(container.querySelectorAll(selector)).map((element) => {
        const elementBounds = element.getBoundingClientRect();
        return {
          top: elementBounds.top - bounds.top,
          height: elementBounds.height,
        };
      });

    const trails = bands("[data-anniversary-trail]");
    setShelters(bands("[data-anniversary-shelter]"));

    setBox((current) =>
      current.width === bounds.width && current.height === bounds.height
        ? current
        : { width: bounds.width, height: bounds.height }
    );
    setShape(buildPath(bounds.width, bounds.height, trails));
  }, []);

  useEffect(() => {
    measure();

    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }

    /* Videos and the crossword change height as they load, so watch the
       container itself rather than just the window. */
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => {
    setLength(lineRef.current?.getTotalLength() ?? 0);
  }, [shape]);

  /* How far down the path the reader has walked, from the top of the first
     stop to the bottom of the last one. */
  const onScroll = useCallback(() => {
    if (frameRef.current) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = undefined;

      const container = containerRef.current;
      const line = lineRef.current;
      if (!container || !line) return;

      const bounds = container.getBoundingClientRect();
      const marker = window.innerHeight * 0.7;
      const progress = Math.min(
        Math.max((marker - bounds.top) / (bounds.height || 1), 0),
        1
      );

      setWalked(progress);
      const total = line.getTotalLength();
      if (total > 0) {
        const point = line.getPointAtLength(total * progress);
        setTip({ x: point.x, y: point.y });
      }
    });
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [onScroll, shape]);

  return (
    <div className="anniversary-path" ref={containerRef}>
      <svg
        className="anniversary-path-svg"
        viewBox={`0 0 ${box.width || 1} ${box.height || 1}`}
        width={box.width || undefined}
        height={box.height || undefined}
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        {/* Sections without a solid backdrop (the crossword) would otherwise
            have the line running straight through their clues, so black them
            out of the mask and let the line duck behind them instead. */}
        <defs>
          <mask
            id={MASK_ID}
            maskUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={box.width || 1}
            height={box.height || 1}
          >
            <rect
              x={0}
              y={0}
              width={box.width || 1}
              height={box.height || 1}
              fill="#fff"
            />
            {shelters.map((shelter) => (
              <rect
                key={shelter.top}
                x={0}
                y={shelter.top}
                width={box.width || 1}
                height={shelter.height}
                fill="#000"
              />
            ))}
          </mask>
        </defs>

        <g mask={`url(#${MASK_ID})`}>
          <path className="anniversary-path-track" d={shape} />
          <path
            className="anniversary-path-line"
            ref={lineRef}
            d={shape}
            style={{
              strokeDasharray: length || undefined,
              strokeDashoffset: length ? length * (1 - walked) : undefined,
            }}
          />
          {tip && walked > 0 && walked < 1 && (
            <circle
              className="anniversary-path-tip"
              cx={tip.x}
              cy={tip.y}
              r={3}
            />
          )}
        </g>
      </svg>

      <div className="anniversary-path-content">{children}</div>
    </div>
  );
};

/* An empty stretch of page where the line is free to wander. */
export const AnniversaryTrail = () => (
  <div className="anniversary-trail" data-anniversary-trail aria-hidden="true" />
);

/* Wraps a section that the line has to pass behind rather than through. */
export const AnniversaryShelter = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="anniversary-shelter" data-anniversary-shelter>
    {children}
  </div>
);

/* A waypoint sitting on the line, just above whatever comes next. */
export const AnniversaryStop = ({ label }: { label: string }) => (
  <div className="anniversary-stop">
    <span className="anniversary-stop-marker" aria-hidden="true">
      &#10084;
    </span>
    <p className="anniversary-stop-label">{label}</p>
  </div>
);

export default AnniversaryPath;
