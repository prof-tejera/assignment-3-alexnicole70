import HandleIcon from "../Icons/HandleIcon";
import "./QueueCard.css";
import { useRef } from "react";
import SquareButton from "../SquareButton/SquareButton";

import { useDrag, useDrop } from "react-dnd";

const ItemTypes = {
  CARD: "card",
};

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
  // description: "Description"
};

const QueueCard = ({
  id,
  cardIndex,
  moveCard,
  timerType,
  timerSettings,
  deleteTimer,
  editTimer,
  onClick,
  status = "default",
}) => {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.cardIndex;
      const hoverIndex = cardIndex;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.cardIndex = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, cardIndex };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div className="queue-card-wrapper" ref={ref} data-handler-id={handlerId}>
      <div className="queue-card-container">
        <div className="queue-card-icon">
          <HandleIcon />
        </div>
        <div className="queue-card-content">
          <div className="text-p">{timerType}</div>
          <div className="queue-card-customizations text-p-small">
            <div className="queue-card-configs">
              {timerSettings &&
                Object.keys(timerSettings)
                  .filter((k) => Object.keys(TIMER_SETTINGS_NAMES).includes(k))
                  .map((k) => (
                    <div key={k}>
                      <span>{TIMER_SETTINGS_NAMES[k]}:</span>
                      <span className="text-p-small text-bold">
                        {k === "rounds"
                          ? timerSettings[k]
                          : formatTime(timerSettings[k])}
                      </span>
                    </div>
                  ))}
            </div>
            {timerSettings &&
              Object.keys(timerSettings).includes("description") &&
              timerSettings["description"] && (
                <div className="queue-card-descriptions">
                  Description: {timerSettings["description"]}
                </div>
              )}
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
