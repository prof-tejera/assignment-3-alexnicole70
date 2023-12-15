import { useState, useEffect } from "react";

import "./TextInput.css";

const TextInput = ({ setText, inputLabelName = "Add Description" }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    setText(input);
  }, [input]);

  return (
    <div className="description-input">
      <label className="text-label">{inputLabelName}</label>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Come up with a motivating description"
        className="text-p"
      />
    </div>
  );
};

export default TextInput;
