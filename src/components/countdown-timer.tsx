import React, { useState, useEffect, useCallback } from "react";

interface CountdownTimerProps {
  targetDate: Date;
  hasTitle?: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  hasTitle = false,
}) => {
  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const target = new Date(targetDate);

    // Convert to Eastern Time (ET)
    const estNow = new Date(
      now.toLocaleString("en-US", { timeZone: "America/New_York" })
    );
    const estTarget = new Date(
      target.toLocaleString("en-US", { timeZone: "America/New_York" })
    );

    const difference = estTarget.getTime() - estNow.getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft, targetDate]);

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2">
      {hasTitle && <h1 className="text-2xl font-bold">Countdown</h1>}
      <div className="flex space-x-4">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-semibold">{timeLeft.days}</span>
          <span className="text-sm">Days</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-semibold">{timeLeft.hours}</span>
          <span className="text-sm">Hours</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-semibold">{timeLeft.minutes}</span>
          <span className="text-sm">Minutes</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-semibold">{timeLeft.seconds}</span>
          <span className="text-sm">Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
