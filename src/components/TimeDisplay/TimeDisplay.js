import { useEffect, useRef, useState } from "react";

export default function TimeDisplay({ time }) {
  return (
    <div className="timeDisplay">
      <h1 className="text-h1">
        {String(Math.floor(time / 60)).padStart(2, "0")}:
        {String(time % 60).padStart(2, "0")}
      </h1>
    </div>
  );
}
