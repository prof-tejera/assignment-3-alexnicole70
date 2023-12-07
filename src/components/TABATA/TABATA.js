import { useContext, useEffect, useRef, useState } from "react";
import TimeDisplay from "../TimeDisplay/TimeDisplay";
import ResetButton from "../ResetButton/ResetButton";
import FastForwardButton from "../FastForwardButton/FastForwardButton";
import PlayPauseButton from "../PlayPauseButton/PlayPauseButton";
import SplitButton from "../SplitButton/SplitButton";

import RoundInput from "../RoundInput/RoundInput";
import TimeInput from "../TimeInput/TimeInput";
import RoundDisplay from "../RoundDisplay/RoundDisplay";
import LinkButton from "../LinkButton/LinkButton";
import { AppContext } from "../../AppContext";

export default function Tabata({
  workInterval,
  restInterval,
  rounds,
  onSpent,
}) {
  const [remainingTime, setRemainingTime] = useState(workInterval);
  const [currentRound, setCurrentRound] = useState(1);
  const [timerType, setTimerType] = useState("Workout");
  const intervalId = useRef();
  const [running, setRunning] = useState(false);
  const { currentTimer, setTimerQueue } = useContext(AppContext);

  const startTimer = () => {
    if (
      !intervalId.current &&
      (timerType === "Workout" ||
        (timerType === "Rest" && remainingTime > 0 && currentRound !== rounds))
    ) {
      intervalId.current = setInterval(handleTimeDecrease, 1000);
      setRunning(true);
    }
  };

  const stopTimer = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
      setRunning(false);
    }
  };

  const resetTimer = () => {
    setRemainingTime(workInterval);
    setTimerType("Workout");
    stopTimer();
    setCurrentRound(1);
  };

  const split = () => {
    setCurrentRound((currentRound) => {
      if (currentRound < rounds && timerType === "Rest") {
        setRemainingTime(workInterval);
        setTimerType("Workout");
        return currentRound + 1;
      } else if (currentRound <= rounds && timerType === "Workout") {
        setRemainingTime(restInterval);
        setTimerType("Rest");
        return currentRound;
      } else {
        fastForwardTimer();
        return currentRound;
      }
    });
  };

  const fastForwardTimer = () => {
    if (intervalId.current) {
      setRemainingTime(0);
      onSpent();
      stopTimer();
      setCurrentRound(rounds);
      setTimerType("Rest");
    }
  };

  const handleTimeDecrease = () => {
    setRemainingTime((remainingTime) => remainingTime - 1);
  };

  useEffect(() => {
    if (remainingTime + 1 === 0) {
      split();
    }
  }, [remainingTime]);

  // useEffect(() => {
  //   resetTimer();
  // }, [workInterval, restInterval, rounds]);

  // useEffect(() => {
  //   if (
  //     currentTimer > 0 &&
  //     (remainingTime === workInterval || remainingTime === restInterval) &&
  //     currentRound === 1
  //   ) {
  //     startTimer();
  //   }
  // }, [remainingTime, currentRound, currentTimer]);

  useEffect(() => {
    if (
      currentTimer > 0 &&
      remainingTime === 0 &&
      currentRound === rounds &&
      timerType === "Rest"
    ) {
      // In the case where there are two timer with the same type,
      // and the second timer is at the END STATE of the previous timer,
      // react hasn't  "reset" the timer yet. We need to do it ourselves.
      resetTimer();
    } else if (
      currentTimer > 0 &&
      remainingTime === workInterval &&
      currentRound === 1 &&
      timerType === "Workout"
    ) {
      // This is after the reset, we are at the BEGINNING STATE of the timer.
      startTimer();
    }
  }, [currentTimer, remainingTime, currentRound, timerType]);

  return (
    <div className="Tabata">
      <TimeDisplay time={remainingTime} />
      <RoundDisplay
        currentRound={currentRound}
        rounds={rounds}
        timerType={timerType}
        workInterval={workInterval}
        restInterval={restInterval}
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

export const TabataWithUserInput = () => {
  const [workTime, setWorkTime] = useState(30);
  const [restTime, setRestTime] = useState(30);
  const [rounds, setRounds] = useState(2);

  return (
    <div className="timer-container">
      <h3 className="text-h3">TABATA</h3>

      <div className="input-wrapper">
        <TimeInput setInputTime={setWorkTime} timeLabelName={"Workout Time"} />
        <TimeInput setInputTime={setRestTime} timeLabelName={"Rest Time"} />
        <RoundInput setRounds={setRounds} rounds={rounds} />
      </div>
      <Tabata workInterval={workTime} restInterval={restTime} rounds={rounds} />
    </div>
  );
};

export const AddTabataInput = ({ type = "add", saveTimer, backButton }) => {
  const { setTimerQueue } = useContext(AppContext);

  const [workTime, setWorkTime] = useState(30);
  const [restTime, setRestTime] = useState(30);
  const [rounds, setRounds] = useState(2);

  return (
    <div className={`timer-container type-${type}`}>
      <h3 className="text-h3">TABATA</h3>

      <div className="input-wrapper">
        <TimeInput setInputTime={setWorkTime} timeLabelName={"Workout Time"} />
        <TimeInput setInputTime={setRestTime} timeLabelName={"Rest Time"} />
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
                  timerType: "TABATA",
                  props: {
                    workInterval: workTime,
                    restInterval: restTime,
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
                  timerType: "TABATA",
                  props: {
                    workInterval: workTime,
                    restInterval: restTime,
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
