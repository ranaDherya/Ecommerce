import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductDetail,
  newReview,
} from "../../store/actions/product-actions";
import ReviewCard from "./ReviewCard";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import Alert from "../Alert/Alert";
import { addItemToCart } from "../../store/actions/cart-actions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Rating,
} from "@mui/material";
import {
  newReviewActions,
  productDetailActions,
} from "../../store/reducers/product-slice";

import "./ProductDetail.css";

function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  const [addedToCart, setAddedToCart] = useState(false);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    dispatch(addItemToCart(id, quantity));
    setAddedToCart(true);
  };

  const { loading, product, error } = useSelector(
    (state) => state.productDetail
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  const options = {
    size: "large",
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error && (
            <Alert
              type="error"
              message={error}
              onClose={(e) => {
                dispatch(productDetailActions.clearErrors());
              }}
            />
          )}
          {reviewError && (
            <Alert
              type="error"
              message={reviewError}
              onClose={(e) => {
                dispatch(newReviewActions.clearErrors());
              }}
            />
          )}

          {success && (
            <Alert
              type="success"
              message="Review Submitted Successfully"
              onClose={(e) => {
                dispatch(newReviewActions.newReviewReset());
              }}
            />
          )}

          {addedToCart && (
            <Alert
              message="Item Added to Cart."
              type="success"
              onClose={(e) => {
                setAddedToCart(false);
              }}
            />
          )}

          <div className="ProductDetails">
            <div className="carouselDiv">
              {product.images && <Carousel images={product.images} />}
            </div>
            <div className="details">
              <div className="div1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="div2">
                <Rating {...options} />
                <p> </p>
                <span className="div2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="div3">
                <h1>&#x20b9;{product.price}</h1>
                <div className="div3-1">
                  <div>
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" readOnly value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "Out of stock" : "In stock"}
                  </b>
                </p>
              </div>
              <div className="div4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h2 className="reviewsHead">REVIEWS</h2>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="error">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="success">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
}

export default ProductDetail;
