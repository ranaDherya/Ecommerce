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
    adminProductRequest(state) {
      state.loading = true;
    },
    adminProductSuccess(state, action) {
      state.loading = false;
      state.products = action.payload.products;
    },
    adminProductFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    success: false,
    error: null,
    products: [],
  },
  reducers: {
    productsRequest(state) {
      state.loading = true;
    },
    productsSuccess(state, action) {
      state.loading = false;
      state.success = action.payload.success;
    },
    productsFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    productsReset(state) {
      state.success = false;
      state.loading = false;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const newProductSlice = createSlice({
  name: "newProduct",
  initialState: {
    loading: false,
    success: false,
    product: {},
    error: null,
  },
  reducers: {
    newProductRequest(state) {
      state.loading = true;
    },
    newProductSuccess(state, action) {
      state.loading = false;
      state.success = action.payload.success;
      state.product = action.payload.product;
    },
    newProductFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    newProductReset(state) {
      state.success = false;
      state.loading = false;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const deleteProductSlice = createSlice({
  name: "deleteProduct",
  initialState: {
    loading: false,
    isDeleted: false,
    error: null,
  },
  reducers: {
    deleteProductRequest(state) {
      state.loading = true;
    },
    deleteProductSuccess(state, action) {
      state.loading = false;
      state.isDeleted = action.payload.isDeleted;
    },
    deleteProductFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    deleteProductReset(state) {
      state.isDeleted = false;
      state.loading = false;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState: {
    loading: false,
    isUpdated: false,
    error: null,
  },
  reducers: {
    updateProductRequest(state) {
      state.loading = true;
    },
    updateProductSuccess(state, action) {
      state.loading = false;
      state.isUpdated = action.payload.isUpdated;
    },
    updateProductFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    updateProductReset(state) {
      state.isUpdated = false;
      state.loading = false;
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

export const newReviewSlice = createSlice({
  name: "newReview",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    newReviewRequest(state) {
      state.loading = true;
    },
    newReviewSuccess(state, action) {
      state.loading = false;
      state.success = action.payload.success;
    },
    newReviewFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    newReviewReset(state) {
      state.success = false;
      state.loading = false;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const productReviewsSlice = createSlice({
  name: "productReviews",
  initialState: {
    loading: false,
    reviews: [],
    error: null,
  },
  reducers: {
    productReviewsRequest(state) {
      state.loading = true;
    },
    productReviewsSuccess(state, action) {
      state.loading = false;
      state.reviews = action.payload.reviews;
    },
    productReviewsFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const deleteReviewSlice = createSlice({
  name: "deleteReview",
  initialState: {
    loading: false,
    isDeleted: false,
    error: null,
  },
  reducers: {
    deleteReviewRequest(state) {
      state.loading = true;
    },
    deleteReviewSuccess(state, action) {
      state.loading = false;
      state.isDeleted = action.payload.isDeleted;
    },
    deleteReviewFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    deleteReviewReset(state) {
      state.isDeleted = false;
      state.loading = false;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const productActions = productSlice.actions;
export const productDetailActions = productDetailSlice.actions;
export const newProductActions = newProductSlice.actions;
export const newReviewActions = newReviewSlice.actions;
export const deleteProductActions = deleteProductSlice.actions;
export const updateProductActions = updateProductSlice.actions;
export const productReviewsActions = productReviewsSlice.actions;
export const deleteReviewActions = deleteReviewSlice.actions;
