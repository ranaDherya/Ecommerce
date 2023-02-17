import { configureStore } from "@reduxjs/toolkit";

import { productSlice, productDetailSlice } from "./reducers/product-slice";

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    productDetail: productDetailSlice.reducer,
  },
  devTools: true,
});

export default store;
