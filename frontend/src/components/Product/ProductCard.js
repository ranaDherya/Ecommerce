import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

function ProductCard(props) {
  const options = {
    value: props.product.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="productCard" to={`/product/${props.product._id}`}>
      {props.product.images[0] && (
        <img src={props.product.images[0].url} alt={props.product.name} />
      )}
      <p>{props.product.name}</p>
      <div>
        <Rating {...options} />{" "}
        <span className="productCardSpan">
          ({props.product.numOfReviews} reviews)
        </span>
      </div>
      <span>&#x20b9;{props.product.price}</span>
    </Link>
  );
}

export default ProductCard;
