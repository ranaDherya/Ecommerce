import React, { useState } from "react";
import "./Alert.css";

function Alert({ children, type, message, onClose }) {
  const [isShow, setIsShow] = useState(true);

  const renderElAlert = function () {
    return React.cloneElement(children);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setIsShow(false);
    onClose();
  };

  const css = `alert ${type} ${!isShow ? "hide" : ""}`;

  if (type === "error") {
    message = message.split("Error: ")[1].split(" at ")[0].trim();
  }

  return (
    <div className={css}>
      <span className="closebtn" onClick={handleClose}>
        &times;
      </span>
      {children ? renderElAlert() : message}
    </div>
  );
}

export default Alert;
