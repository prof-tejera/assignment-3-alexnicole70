/**
 * LinkButton
 *
 * These are the button like Add to Queue.
 *
 * It has only primary colors for now. It has all the button states.
 *
 */
import "./LinkButton.css";

import { Link } from "react-router-dom";

const LinkButton = ({ text, to, onClick, type = "primary" }) => {
  return (
    <Link to={to} className={`link-button text-p ${type}`} onClick={onClick}>
      {text}
    </Link>
  );
};

export default LinkButton;
