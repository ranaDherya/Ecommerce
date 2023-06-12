import Header from "./components/layout/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import webfont from "webfontloader";
import React from "react";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetail from "./components/Product/ProductDetail";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import Products from "./components/Product/Products";
import { loadUser } from "./store/actions/user-actions";
import { useDispatch, useSelector } from "react-redux";
import UserOption from "./components/layout/Header/UserOption";

import "./App.css";

function App() {

  const dispatch = useDispatch();
  const {isAuthenticated, user} = useSelector(state => state.user);

  React.useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    dispatch(loadUser())
  }, []);

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOption user={user} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
