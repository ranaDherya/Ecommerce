import {
  deleteProductActions,
  deleteReviewActions,
  newProductActions,
  newReviewActions,
  productActions,
  productDetailActions,
  productReviewsActions,
  updateProductActions,
} from "../reducers/product-slice";
import axios from "axios";

export const getProducts = (
  keyword = "",
  currentPage = 1,
  price = [0, 140000]
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

// Get all products for ADMIN
export const getAdminProducts = () => {
  return async (dispatch) => {
    try {
      dispatch(productActions.adminProductRequest());

      let link = `/api/v1/admin/products`;
      const { data } = await axios.get(link);

      dispatch(
        productActions.adminProductSuccess({
          products: data.products,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        productActions.adminProductFail({
          error: error.response.data.message,
        })
      );
    }
  };
};

// Create Product
export const newProduct = (productData) => {
  return async (dispatch) => {
    try {
      dispatch(newProductActions.newProductRequest());

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/v1/product/new`,
        productData,
        config
      );
      dispatch(
        newProductActions.newProductSuccess({
          success: data.success,
          product: data.product,
        })
      );
    } catch (error) {
      dispatch(
        newProductActions.newProductFail({ error: error.response.data.message })
      );
    }
  };
};

// Delete a Product --ADMIN
export const deleteProduct = (id) => {
  return async (dispatch) => {
    try {
      dispatch(deleteProductActions.deleteProductRequest());

      const { data } = await axios.delete(`/api/v1/product/${id}`);

      dispatch(
        deleteProductActions.deleteProductSuccess({
          isDeleted: data.success,
        })
      );
    } catch (error) {
      dispatch(
        deleteProductActions.deleteProductFail({
          error: error.response.data.message,
        })
      );
    }
  };
};

// Update Product -- ADMIN
export const updateProduct = (id, productData) => {
  return async (dispatch) => {
    try {
      dispatch(updateProductActions.updateProductRequest());

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.put(
        `/api/v1/product/${id}`,
        productData,
        config
      );

      dispatch(
        updateProductActions.updateProductSuccess({
          success: data.success,
        })
      );
    } catch (error) {
      dispatch(
        updateProductActions.updateProductFail({
          error: error.response.data.message,
        })
      );
    }
  };
};

// New Review
export const newReview = (reviewData) => {
  return async (dispatch) => {
    try {
      dispatch(newReviewActions.newReviewRequest());

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(`/api/v1/review`, reviewData, config);
      dispatch(newReviewActions.newReviewSuccess({ success: data.success }));
    } catch (error) {
      dispatch(
        newReviewActions.newReviewFail({ error: error.response.data.message })
      );
    }
  };
};

// Get All Reviews of a Product --Admin
export const getAllReviews = (id) => {
  return async (dispatch) => {
    try {
      dispatch(productReviewsActions.productReviewsRequest());
      const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
      dispatch(
        productReviewsActions.productReviewsSuccess({ reviews: data.reviews })
      );
    } catch (error) {
      dispatch(
        productReviewsActions.productReviewsFail({
          error: error.response.data.message,
        })
      );
    }
  };
};

// Delete a review of a Product --Admin
export const deleteReview = (reviewId, productId) => {
  return async (dispatch) => {
    try {
      dispatch(deleteReviewActions.deleteReviewRequest());
      const { data } = await axios.delete(
        `/api/v1/reviews?id=${reviewId}&productId=${productId}`
      );
      dispatch(
        deleteReviewActions.deleteReviewSuccess({ isDeleted: data.success })
      );
    } catch (error) {
      dispatch(
        deleteReviewActions.deleteReviewFail({
          error: error.response.data.message,
        })
      );
    }
  };
};
