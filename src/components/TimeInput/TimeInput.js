import { useState, useEffect } from "react";

import "./TimeInput.css";

const TimeInput = ({ inputTime, setInputTime, timeLabelName = "Set Time" }) => {
  const [input, setInput] = useState("00:30");
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    const [minutes, seconds] = input.split(":");

    if (parseInt(minutes) <= 99 && parseInt(seconds) <= 60) {
      setInputTime(parseInt(minutes) * 60 + parseInt(seconds));
    } else {
      setInputTime(3599);
    }
  }, [input]);

  const formatTime = (time) => {
    // Check if the time is already in mm:ss format
    const timePattern = /^\d{1,2}:\d{2}$/;
    if (timePattern.test(time)) return time;

    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleBlur = () => {
    if (input.includes(":")) {
      const [minutes, seconds] = input.split(":").map(Number);
      if (minutes <= 59 && seconds <= 60) {
        setInput(formatTime(minutes * 60 + seconds));
      } else {
        setInput(formatTime(59 * 60 + 59));
      }
    } else if (!isNaN(Number(input))) {
      // 5999
      if (input <= 3599) {
        setInput(formatTime(Number(input)));
      } else {
        setInput(formatTime(59 * 60 + 59));
      }
    } else {
      setInput("Invalid input");
    }
    setIsFocus(false);
  };

  return (
    <div className="time-input">
      <label className="text-label">{timeLabelName}</label>
      <input
        type="text"
        value={isFocus ? input : formatTime(input)}
        onFocus={() => setIsFocus(true)}
        onChange={(e) => setInput(e.target.value)}
        onBlur={handleBlur}
        placeholder="mm:ss"
        className="text-p-large"
      />
    </div>
  );
};

export default TimeInput;
