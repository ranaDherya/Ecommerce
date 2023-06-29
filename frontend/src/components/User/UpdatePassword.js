import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../store/actions/user-actions";
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

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  const [alert, setAlert] = useState(<></>);

  useEffect(() => {
    if (error) {
      console.log(error);
      setAlert(
        <Alert message={error} type="error" clearErrors={clearErrors} />
      );
    }
    if (isUpdated) {
      setAlert(
        <Alert
          message="Password Successfully Updated"
          type="success"
          clearErrors={clearErrors}
        />
      );
      navigate("/account");
      dispatch(userActions.updatePasswordReset());
    }
  }, [dispatch, error, isUpdated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          {alert}
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
