import React from "react";
import Countdown from "react-countdown";

const Timer = ({ time, completionText }) => {
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return { completionText };
    } else {
      // Render a countdown
      return <span>{seconds}</span>;
    }
  };

  return (
    <div>
      {" "}
      <Countdown date={Date.now() + time} renderer={renderer} />
    </div>
  );
};

export default Timer;
