import {
  productActions,
  productDetailActions,
} from "../reducers/product-slice";
import axios from "axios";

export const getProducts = (
  keyword = "",
  currentPage = 1,
  price = [0, 25000]
) => {
  return async (dispatch) => {
    try {
      dispatch(productActions.productRequest());

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;
      const { data } = await axios.get(link);

      dispatch(
        productActions.productSuccess({
          products: data.products,
          productsCount: data.productsCount,
          resultsPerPage: data.resultsPerPage,
          filteredProductsCount: data.filteredProductsCount,
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
