import "./AddInputPanel.css";
import { useContext, useEffect, useState } from "react";

import TimeInput from "../TimeInput/TimeInput";
import RoundInput from "../RoundInput/RoundInput";
import LinkButton from "../LinkButton/LinkButton";
import TextInput from "../TextInput/TextInput";
import { AppContext } from "../../AppContext";

export const AddInputPanel = ({ timerType, setTimerConfig }) => {
  const [description, setDescription] = useState("");
  const [workTime, setWorkTime] = useState(30);
  const [restTime, setRestTime] = useState(30);
  const [inputTime, setInputTime] = useState(30);
  const [maxTime, setMaxTime] = useState(30);
  const [rounds, setRounds] = useState(2);
  const {timerQueue} = useContext(AppContext);
  const handleAddTimer = () => {
    if (timerType === "TABATA") {
      setTimerConfig({
        id: timerQueue.length ,
        timerType: timerType,
        props: {
          workInterval: workTime,
          restInterval: restTime,
          rounds: rounds,
          description: description,
        },
      });
    } else if (timerType === "XY") {
      setTimerConfig({
        id: timerQueue.length ,
        timerType: "XY",
        props: {
          inputTime: inputTime,
          rounds: rounds,
          description: description,
        },
      });
    } else if (timerType === "Countdown") {
      setTimerConfig({
        id: timerQueue.length ,
        timerType: "Countdown",
        props: {
          inputTime: inputTime,
          description: description,
        },
      });
    } else if (timerType === "Stopwatch") {
      setTimerConfig({
        id: timerQueue.length ,
        timerType: "Stopwatch",
        props: {
          maxTime: inputTime,
          description: description,
        },
      });
    }
  };

  return (
    <div className={`timer-container type-add`}>
      <h3 className="text-h3">{timerType}</h3>
      <div>
        <TextInput setText={setDescription} />
      </div>
      <div className="input-wrapper">
        {timerType === "TABATA" && (
          <>
            <TimeInput
              setInputTime={setWorkTime}
              timeLabelName={"Workout Time"}
            />
            <TimeInput setInputTime={setRestTime} timeLabelName={"Rest Time"} />
            <RoundInput setRounds={setRounds} rounds={rounds} />
          </>
        )}
        {timerType === "XY" && (
          <>
            <TimeInput setInputTime={setInputTime} />
            <RoundInput setRounds={setRounds} rounds={rounds} />
          </>
        )}
        {timerType === "Stopwatch" && (
          <>
            <TimeInput setInputTime={setInputTime} />
          </>
        )}
        {timerType === "Countdown" && (
          <>
            <TimeInput setInputTime={setInputTime} />
          </>
        )}
      </div>
      <div className="link-container">
        {<LinkButton text="Add to Queue" onClick={handleAddTimer} />}
      </div>
    </div>
  );
};

export const EditInputPanel = ({ timerConfig, setTimerConfig, closeModal }) => {
  const [description, setDescription] = useState(
    timerConfig.props["description"] || ""
  );
  const [workTime, setWorkTime] = useState(timerConfig.props["workTime"] || 30);
  const [restTime, setRestTime] = useState(timerConfig.props["restTime"] || 30);
  const [inputTime, setInputTime] = useState(
    timerConfig.props["inputTime"] || 30
  );
  const [maxTime, setMaxTime] = useState(timerConfig.props["maxTime"] || 30);
  const [rounds, setRounds] = useState(timerConfig.props["rounds"]  || 2);

  const { timerType } = timerConfig;

  const handleEditTimer = () => {
    if (timerType === "TABATA") {
      setTimerConfig({
        timerType: timerType,
        props: {
          workInterval: workTime,
          restInterval: restTime,
          rounds: rounds,
          description: description,
        },
      });
    } else if (timerType === "XY") {
      setTimerConfig({
        timerType: "XY",
        props: {
          inputTime: inputTime,
          rounds: rounds,
          description: description,
        },
      });
    } else if (timerType === "Countdown") {
      setTimerConfig({
        timerType: "Countdown",
        props: {
          inputTime: inputTime,
          description: description,
        },
      });
    } else if (timerType === "Stopwatch") {
      setTimerConfig({
        timerType: "Stopwatch",
        props: {
          maxTime: maxTime,
          description: description,
        },
      });
    }
  };
  return (
    <div className={`timer-container type-edit`}>
      <h3 className="text-h3">{timerType}</h3>
      <div>
        <TextInput setText={setDescription} />
      </div>
      <div className="input-wrapper">
        {timerType === "TABATA" && (
          <>
            <TimeInput
              setInputTime={setWorkTime}
              timeLabelName={"Workout Time"}
            />
            <TimeInput setInputTime={setRestTime} timeLabelName={"Rest Time"} />
            <RoundInput setRounds={setRounds} rounds={rounds} />
          </>
        )}
        {timerType === "XY" && (
          <>
            <TimeInput setInputTime={setInputTime} />
            <RoundInput setRounds={setRounds} rounds={rounds} />
          </>
        )}
        {timerType === "Stopwatch" && (
          <>
            <TimeInput setInputTime={setMaxTime} />
          </>
        )}
        {timerType === "Countdown" && (
          <>
            <TimeInput setInputTime={setInputTime} />
          </>
        )}
      </div>
      <div className="link-container">
        <div className="edit-buttons">
          <LinkButton
            onClick={closeModal}
            text="Back"
            type="secondary"
          ></LinkButton>
          <LinkButton text="Add to Queue" onClick={handleEditTimer} />
        </div>
      </div>
    </div>
  );
};
