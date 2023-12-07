import "./AddButton.css";

import { Link } from "react-router-dom";

const AddButton = ({ text, to, onClick, type = "add", status = "default" }) => {
  return (
    <Link
      to={to}
      className={`add-button text-p ${status} ${type}`}
      onClick={onClick}
    >
      <div>{text}</div>
    </Link>
  );
};

export default AddButton;
