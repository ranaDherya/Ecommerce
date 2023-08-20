import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import axios from "axios";

function ReviewCard(props) {
  const options = {
    size: "large",
    value: props.review.rating,
    readOnly: true,
    precision: 0.5,
  };

  let [avatar, setAvatar] = useState(
    "https://res.cloudinary.com/dmnjtpuzu/image/upload/v1686561110/Ecommerce/avatars/default_avatar_ombzaz.png"
  );

  const getUser = async () => {
    const { data } = await axios.get(
      `/api/v1/userDetails/${props.review.user}`
    );
    setAvatar(data.user.avatar.url);
  };

  useEffect(() => {
    getUser();
  });

  return (
    <div className="reviewCard">
      <img src={avatar} alt="User" />
      <p>{props.review.name}</p>
      <Rating {...options} />
      <span className="reviewCard-span">{props.review.comment}</span>
    </div>
  );
}

export default ReviewCard;
