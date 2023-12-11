import { useEffect, useRef, useState, useContext } from "react";
import TimeDisplay from "../TimeDisplay/TimeDisplay";
import ResetButton from "../ResetButton/ResetButton";
import FastForwardButton from "../FastForwardButton/FastForwardButton";
import PlayPauseButton from "../PlayPauseButton/PlayPauseButton";
import LinkButton from "../LinkButton/LinkButton";
import { AppContext } from "../../AppContext";

import TimeInput from "../TimeInput/TimeInput";
import RoundDisplay from "../RoundDisplay/RoundDisplay";

export default function StopWatch({ maxTime, onSpent, description }) {
  const [timePassed, setTimePassed] = useState(0);
  const intervalId = useRef();
  const [running, setRunning] = useState(false);
  const { currentTimer, setTimerQueue } = useContext(AppContext);

  const startTimer = () => {
    if (!intervalId.current && timePassed < maxTime) {
      intervalId.current = setInterval(handleTimeIncrease, 1000);
      setRunning(true);
    }
  };

  const stopTimer = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
      setRunning(false);

      if (timePassed === maxTime) {
        onSpent();
      }
    }
  };

  const resetTimer = () => {
    setTimePassed(0);
    stopTimer();
  };

  const fastForwardTimer = () => {
    if (intervalId.current) {
      setTimePassed(maxTime);
      onSpent();
      stopTimer();
    }
  };

  const handleTimeIncrease = () => {
    setTimePassed((timePassed) => {
      if (timePassed < maxTime) {
        return timePassed + 1;
      } else {
        return maxTime;
      }
    });
  };

  useEffect(() => {
    resetTimer();
  }, [maxTime]);

  useEffect(() => {
    if (timePassed === maxTime) {
      stopTimer();
    }
  }, [timePassed]);
  useEffect(() => {
    resetTimer();
  }, [currentTimer]);

  useEffect(() => {
    if (currentTimer > 0 && timePassed === maxTime) {
      // In the case where there are two timer with the same type,
      // and this is the second timer, we need to reset the current timer
      resetTimer();
    } else if (currentTimer > 0 && timePassed === 0) {
      startTimer();
    }
  }, [currentTimer, timePassed]);
  return (
    <div className="StopWatch">
      <p className="text-p">{description}</p>
      <TimeDisplay time={timePassed} />
      <RoundDisplay maxTime={maxTime} />
      <div className="button-collection">
        <PlayPauseButton
          onPause={stopTimer}
          onPlay={startTimer}
          running={running}
        ></PlayPauseButton>
        <ResetButton onClick={resetTimer}>Reset</ResetButton>
        <FastForwardButton onClick={fastForwardTimer}>
          Fast Forward
        </FastForwardButton>
      </div>
    </div>
  );
}

export const StopWatchWithUserInput = () => {
  const [inputTime, setInputTime] = useState(30);

  return (
    <div className="timer-container">
      <h3 className="text-h3">Stop Watch</h3>
      <div className="input-wrapper">
        <TimeInput setInputTime={setInputTime} />
      </div>
      <StopWatch maxTime={inputTime} />
    </div>
  );
};

export const AddStopwatchInput = ({ type = "add", saveTimer, backButton }) => {
  const [inputTime, setInputTime] = useState(30);
  const { setTimerQueue } = useContext(AppContext);

  return (
    <div className={`timer-container type-${type}`}>
      <h3 className="text-h3">Stop Watch</h3>
      <div className="input-wrapper">
        <TimeInput setInputTime={setInputTime} />
      </div>
      <div className="link-container">
        {type === "add" && (
          <LinkButton
            text="Add to Queue"
            onClick={() => {
              setTimerQueue((v) => [
                ...v,
                {
                  timerType: "Stopwatch",
                  props: {
                    maxTime: inputTime,
                  },
                },
              ]);
            }}
          />
        )}{" "}
        {type === "edit" && (
          <div className="edit-buttons">
            {backButton}
            <LinkButton
              text="Save"
              onClick={() => {
                saveTimer({
                  timerType: "Stopwatch",
                  props: {
                    maxTime: inputTime,
                  },
                });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
