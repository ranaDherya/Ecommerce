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
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const myOrdersSlice = createSlice({
  name: "myOrders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    myOrdersRequest(state) {
      state.loading = true;
    },
    myOrdersSuccess(state, action) {
      state.loading = false;
      state.orders = action.payload.orders;
    },
    myOrdersFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

// Order Details
export const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: {
    order: {},
    loading: false,
    error: null,
  },
  reducers: {
    orderDetailsRequest(state) {
      state.loading = true;
    },
    orderDetailsSuccess(state, action) {
      state.loading = false;
      state.order = action.payload.order;
    },
    orderDetailsFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    clearAllErrors(state) {
      state.error = null;
    },
  },
});

export const allOrdersSlice = createSlice({
  name: "allOrders",
  initialState: {
    orders: [],
  },
  reducers: {
    allOrdersRequest(state) {
      state.loading = true;
    },
    allOrdersSuccess(state, action) {
      state.loading = false;
      state.orders = action.payload.orders;
    },
    allOrdersFail(state, action) {
      state.error = action.payload.error;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    isUpdated: false,
    loading: false,
    error: null,
    isDeleted: false,
  },
  reducers: {
    updateOrdersRequest(state) {
      state.loading = true;
    },
    updateOrdersSuccess(state, action) {
      state.loading = false;
      state.isUpdated = action.payload.isUpdated;
    },
    updateOrdersFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    updateOrdersReset(state, action) {
      state.isUpdated = false;
    },

    deleteOrdersRequest(state) {
      state.loading = true;
    },
    deleteOrdersSuccess(state, action) {
      state.loading = false;
      state.isDeleted = action.payload.isDeleted;
    },
    deleteOrdersFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    deleteOrdersReset(state, action) {
      state.isDeleted = false;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const newOrderActions = newOrderSlice.actions;
export const myOrdersActions = myOrdersSlice.actions;
export const orderDetailsActions = orderDetailsSlice.actions;
export const allOrdersActions = allOrdersSlice.actions;
export const orderActions = orderSlice.actions;
