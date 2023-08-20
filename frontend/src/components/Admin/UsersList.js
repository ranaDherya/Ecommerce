import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import { Edit, Delete } from "@mui/icons-material";
import Sidebar from "./Sidebar";

import "./ProductsList.css";
import Alert from "../Alert/Alert";
import { deleteUser, getAllUsers } from "../../store/actions/user-actions";
import {
  allUsersActions,
  updateDeleteUserActions,
} from "../../store/reducers/user-slice";
import Loader from "../layout/Loader/Loader";

function UsersList() {
  const dispatch = useDispatch();

  const {
    error: getAllUsersError,
    users,
    loading,
  } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.updateDeleteUser);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.role === "admin" ? "greenColor" : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/user/${params.row.id}`}>
              <Edit />
            </Link>

            <Button onClick={() => deleteUserHandler(params.row.id)}>
              <Delete />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <>
      <MetaData title={`ALL USERS - Admin`} />

      {loading ? (
        <Loader />
      ) : (
        <>
          {" "}
          {getAllUsersError && (
            <Alert
              type="error"
              message={getAllUsersError}
              onClose={(e) => {
                dispatch(allUsersActions.clearErrors());
              }}
            />
          )}
          {deleteError && (
            <Alert
              type="error"
              message={deleteError}
              onClose={(e) => {
                dispatch(updateDeleteUserActions.clearErrors());
              }}
            />
          )}
          {isDeleted && (
            <Alert
              type="success"
              message={message}
              onClose={(e) => {
                dispatch(updateDeleteUserActions.deleteUserReset());
                dispatch(getAllUsers());
              }}
            />
          )}
          <div className="dashboard">
            <Sidebar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL USERS</h1>

              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UsersList;
