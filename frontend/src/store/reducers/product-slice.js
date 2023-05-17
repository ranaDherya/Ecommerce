import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    error: null,
    productsCount: 0,
    loading: false,
    resultsPerPage: null,
    filteredProductsCount: 0,
  },
  reducers: {
    productRequest(state) {
      state.loading = true;
      state.products = [];
    },
    productSuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resultsPerPage = action.payload.resultsPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
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
