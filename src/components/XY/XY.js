// fix the bug where round increases by 2.
// User input field for the number of rounds.

import { useEffect, useRef, useState, useContext } from "react";
import TimeDisplay from "../TimeDisplay/TimeDisplay";
import ResetButton from "../ResetButton/ResetButton";
import FastForwardButton from "../FastForwardButton/FastForwardButton";
import PlayPauseButton from "../PlayPauseButton/PlayPauseButton";
import SplitButton from "../SplitButton/SplitButton";

import TimeInput from "../TimeInput/TimeInput";
import RoundInput from "../RoundInput/RoundInput";
import RoundDisplay from "../RoundDisplay/RoundDisplay";
import LinkButton from "../LinkButton/LinkButton";
import { AppContext } from "../../AppContext";

export default function XY({ inputTime, rounds, onSpent }) {
  const [remainingTime, setRemainingTime] = useState(inputTime);
  const [currentRound, setCurrentRound] = useState(1);
  const intervalId = useRef();
  const [running, setRunning] = useState(false);
  const { currentTimer, setTimerQueue } = useContext(AppContext);

  const startTimer = () => {
    if (!intervalId.current && (currentRound !== rounds || remainingTime > 0)) {
      intervalId.current = setInterval(handleTimeDecrease, 1000);
      setRunning(true);
    }
  };

  const stopTimer = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
      setRunning(false);

      if (remainingTime === 0 && currentRound === rounds) {
        onSpent();
      }
    }
  };

  const resetTimer = () => {
    setRemainingTime(inputTime);
    stopTimer();
    setCurrentRound(1);
  };

  const split = () => {
    setCurrentRound((currentRound) => {
      return currentRound + 1;
    });
  };
  useEffect(() => {
    if (remainingTime === 0) {
      // We move to the next round anytime the timer finish.
      split();
    }
  }, [remainingTime]);

  useEffect(() => {
    if (currentRound < rounds + 1) {
      // This is all the rounds before the last round, we just top-up the timer.
      setRemainingTime(inputTime);
    } else {
      // This is the last round: end the timer in this case
      fastForwardTimer();
    }
  }, [currentRound]);

  const fastForwardTimer = () => {
    if (intervalId.current) {
      setRemainingTime(0);
      stopTimer();
      setCurrentRound(rounds);

      onSpent();
    }
  };

  const handleTimeDecrease = () => {
    setRemainingTime((remainingTime) => remainingTime - 1);
  };

  useEffect(() => {
    resetTimer();
  }, [currentTimer, inputTime, rounds]);

  useEffect(() => {
    if (currentTimer > 0 && remainingTime === inputTime && currentRound === 1) {
      startTimer();
    }
  }, [remainingTime, currentRound, currentTimer]);

  useEffect(() => {
    if (currentTimer > 0 && remainingTime === 0 && currentRound === rounds) {
      // In the case where there are two timer with the same type,
      // and the second timer is at the END STATE of the previous timer,
      // react hasn't  "reset" the timer yet. We need to do it ourselves.
      resetTimer();
    } else if (
      currentTimer > 0 &&
      remainingTime === inputTime &&
      currentRound === 1
    ) {
      // This is after the reset, we are at the BEGINNING STATE of the timer.
      startTimer();
    }
  }, [currentTimer, remainingTime, currentRound]);

  return (
    <div className="XY">
      <TimeDisplay time={remainingTime} />

      <RoundDisplay
        inputTime={inputTime}
        currentRound={currentRound}
        rounds={rounds}
      />
      <div className="button-collection">
        <PlayPauseButton
          onPause={stopTimer}
          onPlay={startTimer}
          running={running}
        ></PlayPauseButton>
        <ResetButton onClick={resetTimer}>Reset</ResetButton>
        <SplitButton onClick={split}></SplitButton>
        <FastForwardButton onClick={fastForwardTimer}>
          Fast Forward
        </FastForwardButton>
      </div>
    </div>
  );
}

export const XYWithUserInput = () => {
  const [inputTime, setInputTime] = useState(30);
  const [rounds, setRounds] = useState(2);

  return (
    <div className="timer-container">
      <h3 className="text-h3">XY</h3>
      <div className="input-wrapper">
        <TimeInput setInputTime={setInputTime} />
        <RoundInput setRounds={setRounds} rounds={rounds} />
      </div>
      <XY inputTime={inputTime} rounds={rounds} />
    </div>
  );
};

export const AddXYInput = ({ type = "add", saveTimer, backButton }) => {
  const { setTimerQueue } = useContext(AppContext);
  const [inputTime, setInputTime] = useState(30);
  const [rounds, setRounds] = useState(2);

  return (
    <div className={`timer-container type-${type}`}>
      <h3 className="text-h3">XY</h3>
      <div className="input-wrapper">
        <TimeInput setInputTime={setInputTime} />
        <RoundInput setRounds={setRounds} rounds={rounds} />
      </div>
      <div className="link-container">
        {type === "add" && (
          <LinkButton
            text="Add to Queue"
            onClick={() => {
              setTimerQueue((v) => [
                ...v,
                {
                  timerType: "XY",
                  props: {
                    inputTime: inputTime,
                    rounds: rounds,
                  },
                },
              ]);
            }}
          />
        )}
        {type === "edit" && (
          <div className="edit-buttons">
            {backButton}
            <LinkButton
              text="Save"
              onClick={() => {
                saveTimer({
                  timerType: "XY",
                  props: {
                    inputTime: inputTime,
                    rounds: rounds,
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
