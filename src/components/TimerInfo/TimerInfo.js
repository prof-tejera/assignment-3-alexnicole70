import { useContext } from "react";
import "./TimerInfo.css";
import { AppContext } from "../../AppContext";
/**
 * Calculate the total time of the timer,
 * return the result in number of seconds
 */
const sumTimer = (timers) => {
  let totalTime = 0;

  timers.forEach((timer) => {
    if (timer.timerType === "Countdown") {
      totalTime += timer.props.inputTime;
    } else if (timer.timerType === "Stopwatch") {
      totalTime += timer.props.maxTime;
    } else if (timer.timerType === "XY") {
      totalTime += timer.props.inputTime * timer.props.rounds;
    } else if (timer.timerType === "TABATA") {
      totalTime +=
        timer.props.workInterval * timer.props.rounds +
        timer.props.restInterval * timer.props.rounds;
    }
  });
  return totalTime;
};

export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const remainingSeconds = seconds % 60;
  if (minutes < 1 && hours >= 1) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  } else if (minutes < 1) {
    return `${remainingSeconds}s`;
  } else if (hours < 1) {
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  }
  return "";
};

const TimerInfo = () => {
  const { timerQueue, currentTimer } = useContext(AppContext);

  return (
    <div className="timer-info-container text-p">
      <div className="timer-info-queue">
        <p>Queue</p>
        <p>
          {currentTimer + 1}/{timerQueue.length}
        </p>
      </div>

      <div className="timer-info-total">
        <p>Total Time</p>
        <p>{formatTime(sumTimer(timerQueue))}</p>
      </div>
    </div>
  );
};
export default TimerInfo;
