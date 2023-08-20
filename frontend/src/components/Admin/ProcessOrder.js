import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import Loader from "../layout/Loader/Loader";
import Alert from "../Alert/Alert";
import { Button } from "@mui/material";

import "../Cart/ConfirmOrder.css";
import {
  orderActions,
  orderDetailsActions,
} from "../../store/reducers/order-slice";
import {
  getOrderDetails,
  updateOrder,
} from "../../store/actions/order-actions";
import { useDispatch } from "react-redux";
import { AccountTree } from "@mui/icons-material";
import "./ProcessOrder.css";

function ProcessOrder() {
  const { error: updateOrderError, isUpdated } = useSelector(
    (state) => state.order
  );
  const {
    error: orderDetailError,
    order,
    loading,
  } = useSelector((state) => state.orderDetails);

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);
  const [status, setStatus] = useState("");
  const processOrderHandler = (e) => {
    e.preventDefault();

    const data = { status };

    dispatch(updateOrder(id, data));
  };

  return (
    <>
      <MetaData title="Process Order" />
      {updateOrderError && (
        <Alert
          type="error"
          message={updateOrderError}
          onClose={(e) => {
            dispatch(orderActions.clearErrors());
          }}
        />
      )}

      {orderDetailError && (
        <Alert
          type="error"
          message={orderDetailError}
          onClose={(e) => {
            dispatch(orderDetailsActions.clearAllErrors());
          }}
        />
      )}

      {isUpdated && (
        <Alert
          type="success"
          message="Order Updated Successfully"
          onClose={(e) => {
            dispatch(orderActions.updateProductReset());
            navigate("/admin/dashboard");
          }}
        />
      )}

      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmShippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order &&
                          order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>
                </div>

                <Typography>Payment</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>

                  <div>
                    <p>Amount:</p>
                    <span>{order.totalPrice && order.totalPrice}</span>
                  </div>
                </div>

                <Typography>Order Status</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order.orderStatus && order.orderStatus === "Delivered"
                          ? "greenColor"
                          : "redColor"
                      }
                    >
                      {order.orderStatus && order.orderStatus}
                    </p>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Your Order Items:</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X {item.price} ={" "}
                            <b>&#x20b9;{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/*  */}
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={processOrderHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTree />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}
                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      (loading ? true : false) || (status === "" ? true : false)
                    }
                  >
                    Update
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProcessOrder;
