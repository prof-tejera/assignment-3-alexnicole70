import "./RoundDisplay.css";

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

const RoundDisplay = ({
  timerType,
  currentRound,
  rounds,
  workInterval,
  restInterval,
  inputTime,
  maxTime
}) => {
  return (
    <div className="round-display-container">
      {timerType ? (
        <div>
          <span className="text-p">Current Interval</span> <br />{" "}
          <div className="text-p-large">{timerType}</div>
        </div>
      ) : null}

      <div className="round-display">
        {workInterval && restInterval && (
          <>
            <div>
              <span className="text-p">Workout</span> <br />
              <div className="text-p-large">{formatTime(workInterval)}</div>
            </div>
            <div>
              <span className="text-p">Rest</span> <br />
              <div className="text-p-large">{formatTime(restInterval)}</div>
            </div>
          </>
        )}

        {inputTime && (
          <div>
            <span className="text-p">Input Time</span> <br />
            <div className="text-p-large">{formatTime(inputTime)}</div>
          </div>
        )}

        {maxTime && (
          <div>
            <span className="text-p">Max Time</span> <br />
            <div className="text-p-large">{formatTime(maxTime)}</div>
          </div>
        )}

        {currentRound && rounds && (
          <div>
            <span className="text-p">Rounds: </span>
            <br />{" "}
            <div className="text-p-large">
              {currentRound}/{rounds}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoundDisplay;
