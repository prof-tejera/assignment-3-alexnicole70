/**
 * Button
 *
 * These are the timer control buttons
 */

import "./Button.css";

const Button = ({ onClick, children }) => {
  return (
    <div className="btn" onClick={onClick}>
      {children}
    </div>
  );
};
export default Button;
