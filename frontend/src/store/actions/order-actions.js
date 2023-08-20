import axios from "axios";
import {
  newOrderActions,
  myOrdersActions,
  orderDetailsActions,
  allOrdersActions,
  orderActions,
} from "../reducers/order-slice";

// Create Order
export const createOrder = (order) => {
  return async (dispatch) => {
    try {
      dispatch(newOrderActions.createOrderRequest());

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post("/api/v1/order/new", order, config);

      dispatch(newOrderActions.createOrderSuccess({ order: data }));
    } catch (error) {
      dispatch(
        newOrderActions.createOrderFail({ error: error.response.data.message })
      );
    }
  };
};

// My Orders
export const myOrders = () => {
  return async (dispatch) => {
    try {
      dispatch(myOrdersActions.myOrdersRequest());

      const { data } = await axios.get("/api/v1/orders/me");

      dispatch(myOrdersActions.myOrdersSuccess({ orders: data.orders }));
    } catch (error) {
      dispatch(
        myOrdersActions.myOrdersFail({ error: error.response.data.message })
      );
    }
  };
};

// Orders Details
export const getOrderDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch(orderDetailsActions.orderDetailsRequest());

      const { data } = await axios.get(`/api/v1/order/${id}`);

      dispatch(orderDetailsActions.orderDetailsSuccess({ order: data.order }));
    } catch (error) {
      dispatch(
        orderDetailsActions.orderDetailsFail({
          error: error.response.data.message,
        })
      );
    }
  };
};

// Get all orders -- ADMIN
export const allOrders = () => {
  return async (dispatch) => {
    try {
      dispatch(allOrdersActions.allOrdersRequest());

      const { data } = await axios.get(`/api/v1/admin/orders`);

      dispatch(allOrdersActions.allOrdersSuccess({ orders: data.orders }));
    } catch (error) {
      dispatch(
        allOrdersActions.allOrdersFail({ error: error.response.data.message })
      );
    }
  };
};

// Update Order
export const updateOrder = (id, order) => {
  return async (dispatch) => {
    try {
      dispatch(orderActions.updateOrdersRequest());

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/v1/admin/order/${id}`,
        order,
        config
      );

      dispatch(orderActions.updateOrdersSuccess({ isUpdated: data.success }));
    } catch (error) {
      dispatch(
        orderActions.updateOrdersFail({ error: error.response.data.message })
      );
    }
  };
};

// Delete Order
export const deleteOrder = (id) => {
  return async (dispatch) => {
    try {
      dispatch(orderActions.deleteOrdersRequest());

      const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

      dispatch(orderActions.deleteOrdersSuccess({ isDeleted: data.success }));
    } catch (error) {
      dispatch(
        orderActions.deleteOrdersFail({ error: error.response.data.message })
      );
    }
  };
};
