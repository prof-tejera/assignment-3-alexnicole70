import { useState, useContext } from "react";
import "./EditModal.css";
import { AppContext } from "../../AppContext";

import { EditInputPanel } from "../AddInputPanel/AddInputPanel";

import Modal from "react-modal";
import SquareButton from "../SquareButton/SquareButton";
import LinkButton from "../LinkButton/LinkButton";

const EditModal = ({ modalOpened, closeModal, timerIndex }) => {
  const { timerQueue, setTimerQueue } = useContext(AppContext);
  const timer = timerQueue[timerIndex];
  const handleSaveTimer = (updatedTimer) => {
    // Update the timerQueue

    // Copy the current version of timerQueue
    const updatedTimerQueue = [...timerQueue];
    // Swap out only the one that got edited
    updatedTimerQueue[timerIndex] = updatedTimer;
    // Save
    setTimerQueue(updatedTimerQueue);
    // Close modal
    closeModal();
  };

  const showTimer = (timerType) => {
    switch (timerType) {
      case "TABATA":
        return (
          <AddTabataInput
            key={"TABATA"}
            type="edit"
            saveTimer={handleSaveTimer}
            backButton={
              <LinkButton
                onClick={closeModal}
                text="Back"
                type="secondary"
              ></LinkButton>
            }
          />
        );
      case "XY":
        return (
          <AddXYInput
            key={"XY"}
            type="edit"
            saveTimer={handleSaveTimer}
            backButton={
              <LinkButton
                onClick={closeModal}
                text="Back"
                type="secondary"
              ></LinkButton>
            }
          />
        );
      case "Countdown":
        return (
          <AddCountdownInput
            key={"Countdown"}
            type="edit"
            saveTimer={handleSaveTimer}
            backButton={
              <LinkButton
                onClick={closeModal}
                text="Back"
                type="secondary"
              ></LinkButton>
            }
          />
        );
      case "Stopwatch":
        return (
          <AddStopwatchInput
            key={"Stopwatch"}
            type="edit"
            saveTimer={handleSaveTimer}
            backButton={
              <LinkButton
                onClick={closeModal}
                text="Back"
                type="secondary"
              ></LinkButton>
            }
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <Modal
      isOpen={modalOpened}
      contentLabel="Edit Timer"
      style={{
        overlay: {
          backgroundColor: "rgba(44,44,44,0.95)",
        },
        content: {
          border: "none",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      {timer && (
        <div style={{ textAlign: "center" }}>
          <EditInputPanel
            timerConfig={timer}
            setTimerConfig={handleSaveTimer}
            closeModal={closeModal}
          />
        </div>
      )}
    </Modal>
  );
};

export default EditModal;
