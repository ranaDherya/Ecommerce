import Header from "./components/layout/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import webfont from "webfontloader";
import React, { useState, useEffect } from "react";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetail from "./components/Product/ProductDetail";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import Products from "./components/Product/Products";
import { loadUser } from "./store/actions/user-actions";
import { useDispatch, useSelector } from "react-redux";
import UserOption from "./components/layout/Header/UserOption";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState();

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    dispatch(loadUser());

    getStripeApiKey();
  }, [dispatch]);

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOption />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute
              isSignedIn={isAuthenticated}
              element={<UpdatePassword />}
            />
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute
              isSignedIn={isAuthenticated}
              element={<Profile />}
            />
          }
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute
              isSignedIn={isAuthenticated}
              element={<UpdateProfile />}
            />
          }
        />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/shipping"
          element={
            <ProtectedRoute
              isSignedIn={isAuthenticated}
              element={<Shipping />}
            />
          }
        />
        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute
              isSignedIn={isAuthenticated}
              element={<ConfirmOrder />}
            />
          }
        />
        <Route
          path="/process/payment"
          element={
            <ProtectedRoute
              isSignedIn={isAuthenticated}
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              }
            />
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute
              isSignedIn={isAuthenticated}
              element={<OrderSuccess />}
            />
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
