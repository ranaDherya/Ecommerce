import axios from "axios";
import { newOrderActions } from "../reducers/newOrder-slice";

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

// Clearing Errors
export const clearErrors = () => {
  return async (dispatch) => {
    dispatch(newOrderActions.clearAllErrors());
  };
};
