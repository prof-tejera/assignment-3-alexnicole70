import "./RoundInput.css";
import { useEffect, useRef, useState } from "react";

const RoundInput = ({ setRounds, rounds }) => {
  const [input, setInput] = useState("2");

  return (
    <div className="round-input">
      <label className="text-label">Rounds</label>
      <input
        type="number"
        className="text-p-large"
        min={1}
        // value={rounds}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onBlur={(e) => {
          let r = parseInt(input);
          if (r > 0) {
            setRounds(r);
          } else {
            setRounds(1);
            setInput(1);
          }
        }}
      ></input>
    </div>
  );
};

export default RoundInput;
