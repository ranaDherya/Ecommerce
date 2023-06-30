import { cartActions } from "../reducers/cart-slice";
import axios from "axios";

// Add Item To Cart
export const addItemToCart = (id, quantity) => {
  return async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch(
      cartActions.addToCart({
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      })
    );

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

// Remove Item From Cart
export const removeItemsFromCart = (id) => {
  return async (dispatch, getState) => {
    dispatch(cartActions.removeFromCart({ product: id }));

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };
};

// Save Shipping Info
export const saveShippingInfo = (data) => {
  return async (dispatch) => {
    dispatch(cartActions.saveShippingInfo({ shippingInfo: data }));

    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };
};
