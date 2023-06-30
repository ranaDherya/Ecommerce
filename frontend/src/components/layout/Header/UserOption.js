import React, { useState } from "react";
import { SpeedDial, SpeedDialAction, Backdrop } from "@mui/material";
import {
  Dashboard,
  Person,
  ExitToApp,
  ListAlt,
  ShoppingCart,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../Alert/Alert";
import { logout } from "../../../store/actions/user-actions";

import "./Header.css";

function UserOption() {
  const [open, setOpen] = useState(false);

  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const options = [
    { icon: <ListAlt />, name: "Orders", func: orders },
    { icon: <Person />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCart
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToApp />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <Dashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  const navigate = useNavigate();
  function dashboard() {
    navigate("/dashboard");
  }

  function orders() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }

  function cart() {
    navigate("/cart");
  }

  const dispatch = useDispatch();
  function logoutUser() {
    dispatch(logout());
    <Alert type="success" message="Logout Successfully" />;
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        style={{ zIndex: "11" }}
        icon={
          <img
            className="speedDialIcon"
            src={
              user.avatar.url
                ? user.avatar.url
                : "https://res.cloudinary.com/dmnjtpuzu/image/upload/v1686561110/Ecommerce/avatars/default_avatar_ombzaz.png"
            }
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
}

export default UserOption;
