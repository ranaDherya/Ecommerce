import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import { MailOutline, Person, VerifiedUser } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../Alert/Alert";

import "./NewProduct.css";
import {
  updateDeleteUserActions,
  userDetailsActions,
} from "../../store/reducers/user-slice";
import { getUserDetails, updateUser } from "../../store/actions/user-actions";
import Loader from "../layout/Loader/Loader";

function UpdateUser() {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.updateDeleteUser);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  const { id: userId } = useParams();

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [dispatch, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      role,
    };

    dispatch(updateUser(userId, data));
  };

  return (
    <>
      {error && (
        <Alert
          type="error"
          message={error}
          onClose={(e) => {
            dispatch(userDetailsActions.clearErrors());
          }}
        />
      )}

      {updateError && (
        <Alert
          type="error"
          message={updateError}
          onClose={(e) => {
            dispatch(updateDeleteUserActions.clearErrors());
          }}
        />
      )}

      {isUpdated && (
        <Alert
          type="success"
          message="User updated successfully."
          onClose={(e) => {
            dispatch(updateDeleteUserActions.updateUserReset());
            navigate("/admin/users");
          }}
        />
      )}

      <MetaData title="Update User" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading || updateLoading ? (
            <Loader />
          ) : (
            <form
              className="createProductForm"
              onSubmit={updateUserSubmitHandler}
            >
              <h1>Update User</h1>

              <div>
                <Person />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <MailOutline />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <VerifiedUser />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default UpdateUser;
