import HandleIcon from "../Icons/HandleIcon";
import "./QueueCard.css";

import SquareButton from "../SquareButton/SquareButton";

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

const TIMER_SETTINGS_NAMES = {
  inputTime: "Input Time",
  workInterval: "Work",
  restInterval: "Rest",
  maxTime: "Max Time",
  rounds: "Rounds",
};

const QueueCard = ({
  timerType,
  timerSettings,
  deleteTimer,
  editTimer,
  onClick,
  status = "default",
}) => {
  return (
    <div className="queue-card-wrapper">
      <div className="queue-card-container">
        <div className="queue-card-icon">
          <HandleIcon />
        </div>
        <div className="queue-card-content">
          <div className="text-p">{timerType}</div>
          <div className="queue-card-customizations text-p-small">
            {timerSettings &&
              Object.keys(timerSettings).map((k) => (
                <div>
                  {TIMER_SETTINGS_NAMES[k]}:
                  <span className="text-p-small text-bold">
                    {k === "rounds"
                      ? timerSettings[k]
                      : formatTime(timerSettings[k])}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="queue-card-sidebar">
        <SquareButton type="minus" onClick={deleteTimer} />
        <SquareButton type="edit" onClick={editTimer} />
      </div>
    </div>
  );
};

export default QueueCard;
