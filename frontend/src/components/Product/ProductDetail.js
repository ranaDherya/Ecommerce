import React, { useEffect } from "react";
import Carousel from "./Carousel";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetail } from "../../store/actions/product-actions";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";

import "./ProductDetail.css";

function ProductDetail() {
  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.productDetail
  );

  useEffect(() => {
    dispatch(getProductDetail("63cbdc49ccb28c01c45b35be"));
  }, [dispatch]);

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
                <button>-</button>
                <input defaultValue="1" type="number" />
                <button>+</button>
              </div>
              <button>Add to Cart</button>
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
  );
}

export default ProductDetail;