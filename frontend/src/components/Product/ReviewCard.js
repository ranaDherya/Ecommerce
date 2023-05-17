import React from "react";
import ReactStars from "react-rating-stars-component";

function ReviewCard(props) {
  const options = {
    edit: false,
    color: "rgba(20, 20, 20, 0.1)",
    activeColor: "tomato",
    value: props.review.rating,
    size: window.innerWidth < 600 ? 21 : 40,
    isHalf: true,
  };

  return (
    <div className="reviewCard">
      <img src="/Images/paddy.png" alt="User" />
      <p>{props.review.name}</p>
      <ReactStars {...options} />
      <span>{props.review.comment}</span>
    </div>
  );
}

export default ReviewCard;
