import { createSlice } from "@reduxjs/toolkit";

export const newOrderSlice = createSlice({
  name: "newOrder",
  initialState: {
    order: {},
    loading: false,
    error: null,
  },
  reducers: {
    createOrderRequest(state) {
      state.loading = true;
    },
    createOrderSuccess(state, action) {
      state.loading = false;
      state.order = action.payload.order;
    },
    createOrderFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const newOrderActions = newOrderSlice.actions;
