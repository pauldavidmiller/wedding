import React, { useState, useEffect, useCallback } from "react";
import { getElapsedTime } from "../extensions/helpers";

interface CountdownTimerProps {
  targetDate: Date;
  hasTitle?: boolean;
  /**
   * Count up from targetDate instead of down to it. Used now that the wedding
   * has come and gone and the fun number is how long we've been married.
   */
  countUp?: boolean;
  title?: string;
  className?: string;
}

type TimeUnit = { label: string; value: number };

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  hasTitle = false,
  countUp = false,
  title,
  className,
}) => {
  const calculateUnits = useCallback((): TimeUnit[] => {
    const now = new Date();
    const target = new Date(targetDate);

    if (countUp) {
      const elapsed = getElapsedTime(target, now);
      return [
        { label: elapsed.years === 1 ? "Year" : "Years", value: elapsed.years },
        {
          label: elapsed.months === 1 ? "Month" : "Months",
          value: elapsed.months,
        },
        { label: elapsed.days === 1 ? "Day" : "Days", value: elapsed.days },
        { label: "Hours", value: elapsed.hours },
        { label: "Minutes", value: elapsed.minutes },
        { label: "Seconds", value: elapsed.seconds },
      ];
    }

    const difference = Math.max(0, target.getTime() - now.getTime());
    return [
      { label: "Days", value: Math.floor(difference / (1000 * 60 * 60 * 24)) },
      { label: "Hours", value: Math.floor((difference / (1000 * 60 * 60)) % 24) },
      { label: "Minutes", value: Math.floor((difference / 1000 / 60) % 60) },
      { label: "Seconds", value: Math.floor((difference / 1000) % 60) },
    ];
  }, [countUp, targetDate]);

  const [units, setUnits] = useState<TimeUnit[]>(calculateUnits());

  useEffect(() => {
    const timer = setInterval(() => {
      setUnits(calculateUnits());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateUnits]);

  const heading = title ?? (countUp ? "Married For" : "Countdown");

  return (
    <div
      className={`flex flex-col items-center justify-center text-center space-y-2 ${
        className ?? ""
      }`}
    >
      {/* A div, not a heading, so the surrounding page's h1..h6 styles
          (save the date, signature) don't swallow it */}
      {hasTitle && <div className="countdown-timer-title">{heading}</div>}
      {/* 3 + 3 on phones, a single row once there's space */}
      <div
        className={`grid w-full mx-auto justify-items-center gap-x-2 gap-y-3 ${
          countUp
            ? "grid-cols-3 sm:grid-cols-6 max-w-md"
            : "grid-cols-4 max-w-xs"
        }`}
      >
        {units.map((unit) => (
          <div key={unit.label} className="flex flex-col items-center">
            <span className="text-2xl font-semibold">{unit.value}</span>
            <span className="text-sm">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
