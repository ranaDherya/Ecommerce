import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );
      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (i) => i.product !== action.payload.product
      );
    },
    saveShippingInfo(state, action) {
      state.shippingInfo = action.payload.shippingInfo;
    },
  },
});

export const cartActions = cartSlice.actions;
