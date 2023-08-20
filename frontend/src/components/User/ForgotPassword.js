import React, { useState } from "react";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../store/actions/user-actions";
import MetaData from "../layout/MetaData";
import Alert from "../Alert/Alert";

import "./ForgotPassword.css";
import { forgotPasswordActions } from "../../store/reducers/user-slice";

function ForgotPassword() {
  const dispatch = useDispatch();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {message && (
            <Alert
              type="success"
              message={message}
              onClose={(e) => {
                dispatch(forgotPasswordActions.forgotPasswordReset());
              }}
            />
          )}
          {error && (
            <Alert
              type="error"
              message={error}
              onClose={(e) => {
                dispatch(forgotPasswordActions.clearErrors());
              }}
            />
          )}
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmitHandler}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ForgotPassword;
