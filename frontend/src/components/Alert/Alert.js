import React, { useState } from "react";

import "./Alert.css";

export default function Alert({ children, type, message }) {
  const [isShow, setIsShow] = useState(true);

  const renderElAlert = function () {
    return React.cloneElement(children);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setIsShow(false);
  };

  const css = `alert ${type} ${!isShow ? "hide" : ""}`;

  let err = "";
  for (let i = 6; i < message.length - 1; i++) {
    if (message.charAt(i) + message.charAt(i + 1) === "at") break;
    err += message.charAt(i);
  }

  return (
    <div className={css}>
      <span className="closebtn" onClick={handleClose}>
        &times;
      </span>
      {children ? renderElAlert() : err}
    </div>
  );
}
