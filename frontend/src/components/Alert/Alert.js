import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { clearErrors } from "../../store/actions/product-actions";
// import { clearErrors } from "../../store/actions/user-actions";

import "./Alert.css";

export default function Alert({ children, type, message, clearErrors }) {
  const [isShow, setIsShow] = useState(true);

  const dispatch = useDispatch();

  const renderElAlert = function () {
    return React.cloneElement(children);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setIsShow(false);
    if (clearErrors) {
      dispatch(clearErrors());
    }
  };

  const css = `alert ${type} ${!isShow ? "hide" : ""}`;
  let msg = message;
  if (type === "error") {
    msg = "";
    for (let i = 6; i < message.length - 1; i++) {
      if (message.charAt(i) + message.charAt(i + 1) === "at") break;
      msg += message.charAt(i);
    }
  }

  return (
    <div className={css}>
      <span className="closebtn" onClick={handleClose}>
        &times;
      </span>
      {children ? renderElAlert() : msg}
    </div>
  );
}
