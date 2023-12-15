import "./SplitButton.css";
import Button from "../Button/Button";

const SplitButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <svg
        className="split-btn"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="40" cy="40" r="38" stroke="white" strokeWidth="4" />
        <path
          d="M44 28L55 40L44 52"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M29 28L40 40L29 52"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  );
};

export default SplitButton;
