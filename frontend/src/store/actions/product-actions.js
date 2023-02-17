import {
  productActions,
  productDetailActions,
} from "../reducers/product-slice";
import axios from "axios";

export const getProducts = () => {
  return async (dispatch) => {
    try {
      dispatch(productActions.productRequest());

      const { data } = await axios.get("/api/v1/products");

      dispatch(
        productActions.productSuccess({
          products: data.products,
          productsCount: data.productCount,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        productActions.productFail({
          error: error.response.data.message,
        })
      );
    }
  };
};

export const getProductDetail = (id) => {
  return async (dispatch) => {
    try {
      dispatch(productDetailActions.productDetailRequest());

      const { data } = await axios.get(`/api/v1/product/${id}`);

      dispatch(
        productDetailActions.productDetailSuccess({
          product: data.product,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        productDetailActions.productDetailFail({
          error: error.response.data.message,
        })
      );
    }
  };
};

export const clearErrors = () => {
  return async (dispatch) => {
    dispatch(productActions.clearErrors());
    // dispatch(productDetailActions.clearErrors());
  };
};
