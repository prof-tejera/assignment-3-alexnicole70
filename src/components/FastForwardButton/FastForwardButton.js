import "./FastForwardButton.css";
import Button from "../Button/Button.js";

const FastForwardButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <svg
        className="fast-forward-btn"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="40" cy="40" r="38" stroke="white" strokeWidth="4" />
        <path
          d="M40 28L51 40L40 52"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M25 28L36 40L25 52"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M55 28V52"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </Button>
  );
};

export default FastForwardButton;
