import "./ResetButton.css";

import Button from "../Button/Button.js";

const ResetButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <svg
        className="reset-btn"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="40" cy="40" r="38" stroke="white" strokeWidth="4" />
        <path
          d="M60 37L53 45L46 37"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M37 54C28.1634 54 21 46.8366 21 38C21 29.1634 28.1634 22 37 22C45.8366 22 53 29.1634 53 38C53 43.891 53 46.3526 53 45.3846"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Button>
  );
};

export default ResetButton;
