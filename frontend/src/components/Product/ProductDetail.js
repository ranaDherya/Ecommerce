import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetail } from "../../store/actions/product-actions";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import Alert from "../Alert/Alert";
import { addItemToCart } from "../../store/actions/cart-actions";

import "./ProductDetail.css";

function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

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
  };

  const { loading, product, error } = useSelector(
    (state) => state.productDetail
  );

  useEffect(() => {
    if (error) return <Alert message={error} />;
    dispatch(getProductDetail(id));
  }, [dispatch, id, error]);

  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    value: product.rating,
    // size: window.innerWidth < 600 ? 20 : 25,
    size: window.innerWidth < 600 ? 21 : 40,
    isHalf: true,
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
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
                <ReactStars {...options} />
                <p> </p>
                <span> ({product.numOfReviews} Reviews)</span>
              </div>
              <div className="div3">
                <h1>&#x20b9;{product.price}</h1>
                <div className="div3-1">
                  <div>
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" readOnly value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button onClick={addToCartHandler}>Add to Cart</button>
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

              <button>Submit Review</button>
            </div>
          </div>

          <h2 className="reviewsHead">REVIEWS</h2>

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
