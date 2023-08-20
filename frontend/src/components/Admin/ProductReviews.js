import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllReviews,
  deleteReview,
} from "../../store/actions/product-actions";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import { Delete, Star } from "@mui/icons-material";
import Sidebar from "./Sidebar";

import "./ProductReviews.css";
import Alert from "../Alert/Alert";
import {
  deleteReviewActions,
  productReviewsActions,
} from "../../store/reducers/product-slice";

function ProductReviews() {
  const dispatch = useDispatch();

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteReview
  );
  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (id) => {
    dispatch(deleteReview(id, productId));
  };
  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId === "") return;
    if (productId.length < 24) return;
    dispatch(getAllReviews(productId));
  }, [dispatch, productId]);
  const columns = [
    { field: "id", headerName: "REVIEW ID", minWidth: 200, flex: 0.5 },
    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,
      cellClassName: (params) => {
        return params.row.rating >= 3 ? "greenColor" : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => deleteReviewHandler(params.row.id)}>
              <Delete />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <>
      <MetaData title={`ALL REVIEWS - Admin`} />

      {error && (
        <Alert
          type="error"
          message={error}
          onClose={(e) => {
            dispatch(productReviewsActions.clearErrors());
          }}
        />
      )}

      {deleteError && (
        <Alert
          type="error"
          message={deleteError}
          onClose={(e) => {
            dispatch(deleteReviewActions.clearErrors());
          }}
        />
      )}
      {isDeleted && (
        <Alert
          type="success"
          message="Review Deleted Successfully"
          onClose={(e) => {
            dispatch(deleteReviewActions.deleteReviewReset());
            dispatch(getAllReviews(productId));
          }}
        />
      )}

      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product ID"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductReviews;
