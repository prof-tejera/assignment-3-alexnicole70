import { Link } from "react-router-dom";
import MinusIcon from "../Icons/MinusIcon";
import EditIcon from "../Icons/EditIcon";
import "./SquareButton.css";

export const SquareButton = ({ to, onClick, type, status = "default" }) => {
  return (
    <Link
      to={to}
      className={`square-button text-p ${status}`}
      onClick={onClick}
    >
      <div className="button-icon">
        {type === "minus" && <MinusIcon />}
        {type === "edit" && <EditIcon />}
      </div>
    </Link>
  );
};

export default SquareButton;
