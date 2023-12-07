import { useEffect, useRef, useState, useContext } from "react";
import "./Countdown.css";
import TimeDisplay from "../TimeDisplay/TimeDisplay";
import TimeInput from "../TimeInput/TimeInput";
import ResetButton from "../ResetButton/ResetButton";
import FastForwardButton from "../FastForwardButton/FastForwardButton";
import PlayPauseButton from "../PlayPauseButton/PlayPauseButton";
import LinkButton from "../LinkButton/LinkButton";
import { AppContext } from "../../AppContext";
import RoundDisplay from "../RoundDisplay/RoundDisplay";

export default function Countdown({ inputTime, onSpent }) {
  const [remainingTime, setRemainingTime] = useState(inputTime);
  const intervalId = useRef();
  const [running, setRunning] = useState(false);
  const { currentTimer, setTimerQueue } = useContext(AppContext);

  const startTimer = () => {
    if (!intervalId.current && remainingTime > 0) {
      intervalId.current = setInterval(handleTimeDecrease, 1000);
      setRunning(true);
    }
  };

  const stopTimer = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
      setRunning(false);

      if (remainingTime == 0) {
        onSpent();
      }
    }
  };

  const resetTimer = () => {
    setRemainingTime(inputTime);
    stopTimer();
  };

  const fastForwardTimer = () => {
    if (intervalId.current) {
      setRemainingTime(0);
      stopTimer();
      onSpent();
    }
  };

  useEffect(() => {
    resetTimer();
  }, [inputTime]);

  const handleTimeDecrease = () => {
    setRemainingTime((remainingTime) => {
      if (remainingTime > 0) {
        return remainingTime - 1;
      } else {
        return 0;
      }
    });
  };

  useEffect(() => {
    if (remainingTime === 0) {
      stopTimer();
    }
  }, [remainingTime]);

  useEffect(() => {
    resetTimer();
  }, [currentTimer]);

  useEffect(() => {
    if (currentTimer > 0 && remainingTime === 0) {
      // In the case where there are two timer with the same type,
      // and this is the second timer, we need to reset the current timer
      resetTimer();
    } else if (currentTimer > 0 && remainingTime === inputTime) {
      startTimer();
    }
  }, [currentTimer, remainingTime]);

  return (
    <div className="Countdown">
      <TimeDisplay time={remainingTime} />
      <RoundDisplay inputTime={inputTime} />
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

export const CountdownWithUserInput = () => {
  const [inputTime, setInputTime] = useState(30);

  return (
    <div className="timer-container">
      <h3 className="text-h3">Countdown</h3>
      <div className="input-wrapper">
        <TimeInput setInputTime={setInputTime} />
      </div>
      <Countdown inputTime={inputTime} />
    </div>
  );
};

export const AddCountdownInput = ({ type = "add", saveTimer, backButton }) => {
  const [inputTime, setInputTime] = useState(30);
  const { setTimerQueue } = useContext(AppContext);

  return (
    <div className={`timer-container type-${type}`}>
      <h3 className="text-h3">Countdown</h3>
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
                  timerType: "Countdown",
                  props: {
                    inputTime: inputTime,
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
                  timerType: "Countdown",
                  props: {
                    inputTime: inputTime,
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
