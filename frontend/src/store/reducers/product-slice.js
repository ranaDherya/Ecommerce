import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    error: null,
    productsCounter: 0,
    loading: false,
  },
  reducers: {
    productRequest(state) {
      state.loading = true;
      state.products = [];
    },
    productSuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCounter = action.payload.productsCount;
    },
    productFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: {
    loading: false,
    product: {},
    error: null,
  },
  reducers: {
    productDetailRequest(state) {
      state.loading = true;
    },
    productDetailSuccess(state, action) {
      state.loading = false;
      state.product = action.payload.product;
    },
    productDetailFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const productActions = productSlice.actions;
export const productDetailActions = productDetailSlice.actions;
