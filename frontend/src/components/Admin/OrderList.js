import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { allOrders, deleteOrder } from "../../store/actions/order-actions";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import { Edit, Delete } from "@mui/icons-material";
import Sidebar from "./Sidebar";
import Alert from "../Alert/Alert";
import {
  allOrdersActions,
  orderActions,
} from "../../store/reducers/order-slice";
import Loader from "../layout/Loader/Loader";

import "./ProductsList.css";

function OrderList() {
  const dispatch = useDispatch();

  const {
    error: getAllOrderError,
    orders,
    loading,
  } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    dispatch(allOrders());
  }, [dispatch]);
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
            <Link to={`/admin/order/${params.row.id}`}>
              <Edit />
            </Link>

            <Button onClick={() => deleteOrderHandler(params.row.id)}>
              <Delete />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`ALL ORDERS - Admin`} />

          {getAllOrderError && (
            <Alert
              type="error"
              message={getAllOrderError}
              onClose={(e) => {
                dispatch(allOrdersActions.clearErrors());
              }}
            />
          )}

          {deleteError && (
            <Alert
              type="error"
              message={deleteError}
              onClose={(e) => {
                dispatch(orderActions.clearErrors());
              }}
            />
          )}
          {isDeleted && (
            <Alert
              type="success"
              message="Order Deleted Successfully"
              onClose={(e) => {
                dispatch(orderActions.deleteOrdersReset());
                dispatch(allOrders());
              }}
            />
          )}

          <div className="dashboard">
            <Sidebar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL ORDERS</h1>

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

export default OrderList;
