import { configureStore } from "@reduxjs/toolkit";

import { productSlice, productDetailSlice } from "./reducers/product-slice";
import { userSlice, forgotPasswordSlice } from "./reducers/user-slice";
import { cartSlice } from "./reducers/cart-slice";
import { newOrderSlice } from "./reducers/newOrder-slice";

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    productDetail: productDetailSlice.reducer,
    user: userSlice.reducer,
    forgotPassword: forgotPasswordSlice.reducer,
    cart: cartSlice.reducer,
    newOrder: newOrderSlice.reducer,
  },
  devTools: true,
});

export default store;
