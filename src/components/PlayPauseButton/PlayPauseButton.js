import Button from "../Button/Button";
import "./PlayPauseButton.css";
import { useEffect, useRef, useState } from "react";

const PlayPauseButton = ({ onPause, onPlay, running }) => {
  // const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="play-pause-btn">
      {running ? (
        <Button onClick={onPause}>
          <svg
            className="pause-btn"
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="40" cy="40" r="40" fill="#6ACCDE" />
            <path
              d="M35.3333 28.3334V52.5152"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M45.8333 28.3334V52.5152"
              stroke="#FFFFFF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      ) : (
        <Button onClick={onPlay}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="play-btn"
          >
            <circle cx="40" cy="40" r="40" fill="#6ACCDE" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M29 23L56 41L29 59"
              fill="white"
            />
            <path
              d="M29 23L56 41L29 59V23Z"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      )}
    </div>
  );
};
export default PlayPauseButton;
