import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

function Product(props) {
  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    value: props.product.rating,
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };

  return (
    <Link className="productCard" to={`/product/${props.product._id}`}>
      <img src={props.product.images[0].url} alt={props.product.name} />
      <p>{props.product.name}</p>
      <div>
        <ReactStars {...options} />{" "}
        <span>({props.product.numOfReviews} reviews)</span>
      </div>
      <span>&#x20b9;{props.product.price}</span>
    </Link>
  );
}

export default Product;
