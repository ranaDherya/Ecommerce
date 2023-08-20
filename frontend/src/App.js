import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import webfont from "webfontloader";

import axios from "axios";

import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import ProductsList from "./components/Admin/ProductsList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import Contact from "./components/layout/Contact/Contact";
import About from "./components/layout/About/About";
import Payment from "./components/Cart/Payment";
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
import Home from "./components/Home/Home";
import ProductDetail from "./components/Product/ProductDetail";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import Products from "./components/Product/Products";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";

import "./App.css";
import { loadUser } from "./store/actions/user-actions";
import NotFound from "./components/layout/Not Found/NotFound";

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
    getStripeApiKey();
    dispatch(loadUser());
  }, [dispatch]);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

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
          element={<ProtectedRoute element={<UpdatePassword />} />}
        />
        <Route
          path="/account"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/me/update"
          element={<ProtectedRoute element={<UpdateProfile />} />}
        />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/shipping"
          element={<ProtectedRoute element={<Shipping />} />}
        />
        <Route
          path="/order/confirm"
          element={<ProtectedRoute element={<ConfirmOrder />} />}
        />
        <Route
          path="/process/payment"
          element={
            <ProtectedRoute
              element={
                stripeApiKey && (
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                )
              }
            />
          }
        />
        <Route
          path="/success"
          element={<ProtectedRoute element={<OrderSuccess />} />}
        />
        <Route
          path="/orders"
          element={<ProtectedRoute element={<MyOrders />} />}
        />
        <Route
          path="/order/:id"
          element={<ProtectedRoute element={<OrderDetails />} />}
        />

        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        />

        <Route
          path="/admin/products"
          element={<ProtectedRoute element={<ProductsList />} />}
        />

        <Route
          path="/admin/product/:id"
          element={<ProtectedRoute element={<UpdateProduct />} />}
        />

        <Route
          path="/admin/product"
          element={<ProtectedRoute element={<NewProduct />} />}
        />

        <Route
          path="/admin/orders"
          element={<ProtectedRoute element={<OrderList />} />}
        />

        <Route
          path="/admin/order/:id"
          element={<ProtectedRoute element={<ProcessOrder />} />}
        />

        <Route
          path="/admin/users"
          element={<ProtectedRoute element={<UsersList />} />}
        />

        <Route
          path="/admin/user/:id"
          element={<ProtectedRoute element={<UpdateUser />} />}
        />
        <Route
          path="/admin/reviews"
          element={<ProtectedRoute element={<ProductReviews />} />}
        />

        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
