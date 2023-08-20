import { configureStore } from "@reduxjs/toolkit";

import {
  productSlice,
  productDetailSlice,
  newReviewSlice,
  newProductSlice,
  deleteProductSlice,
  updateProductSlice,
  productReviewsSlice,
  deleteReviewSlice,
} from "./reducers/product-slice";
import {
  userSlice,
  forgotPasswordSlice,
  allUsersSlice,
  updateDeleteUserSlice,
  userDetailsSlice,
} from "./reducers/user-slice";
import { cartSlice } from "./reducers/cart-slice";
import {
  allOrdersSlice,
  myOrdersSlice,
  newOrderSlice,
  orderDetailsSlice,
  orderSlice,
} from "./reducers/order-slice";

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    productDetail: productDetailSlice.reducer,
    user: userSlice.reducer,
    forgotPassword: forgotPasswordSlice.reducer,
    cart: cartSlice.reducer,
    newOrder: newOrderSlice.reducer,
    myOrders: myOrdersSlice.reducer,
    orderDetails: orderDetailsSlice.reducer,
    newReview: newReviewSlice.reducer,
    allUsers: allUsersSlice.reducer,
    newProduct: newProductSlice.reducer,
    deleteProduct: deleteProductSlice.reducer,
    allOrders: allOrdersSlice.reducer,
    updateProduct: updateProductSlice.reducer,
    order: orderSlice.reducer,
    updateDeleteUser: updateDeleteUserSlice.reducer,
    userDetails: userDetailsSlice.reducer,
    productReviews: productReviewsSlice.reducer,
    deleteReview: deleteReviewSlice.reducer,
  },
  devTools: true,
});

export default store;
