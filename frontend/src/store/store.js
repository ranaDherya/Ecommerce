import { configureStore } from "@reduxjs/toolkit";

import { productSlice, productDetailSlice } from "./reducers/product-slice";
import { userSlice } from "./reducers/user-slice";

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    productDetail: productDetailSlice.reducer,
    user: userSlice.reducer,
  },
  devTools: true,
});

export default store;
