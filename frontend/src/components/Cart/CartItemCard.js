import React from "react";
import { Link } from "react-router-dom";

import "./CartItemCard.css";

function CartItem({ item, deleteCartItems }) {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>Price: &#x20b9;{item.price}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
      </div>
    </div>
  );
}

export default CartItem;
