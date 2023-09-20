import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../store/actions/user-actions";
import { userActions } from "../../store/reducers/user-slice";
import MetaData from "../layout/MetaData";
import { LockOpen, Lock, VpnKey } from "@mui/icons-material";
import Alert from "../Alert/Alert";
import Loader from "../layout/Loader/Loader";

import "./UpdatePassword.css";

function UpdatePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.user);
  const [misMatchError, setMisMatchError] = useState();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMisMatchError(
        "Error: New Password and Confirm New Password Field doesnot match at"
      );
    } else {
      const myForm = new FormData();

      myForm.set("oldPassword", oldPassword);
      myForm.set("newPassword", newPassword);
      myForm.set("confirmPassword", confirmPassword);

      dispatch(updatePassword(myForm));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          {error && (
            <Alert
              message={error}
              type="error"
              onClose={(e) => {
                dispatch(userActions.clearErrors());
              }}
            />
          )}

          {misMatchError && (
            <Alert
              message={misMatchError}
              type="error"
              onClose={(e) => {
                setMisMatchError();
              }}
            />
          )}

          {isUpdated && (
            <Alert
              message="Password Successfully Updated."
              type="success"
              onClose={(e) => {
                dispatch(userActions.updatePasswordReset());
                navigate("/account");
              }}
            />
          )}
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Password</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKey />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpen />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <Lock />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UpdatePassword;
