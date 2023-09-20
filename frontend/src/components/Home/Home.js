import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import ProductCard from "../Product/ProductCard";
import MetaData from "../layout/MetaData";
import { getProducts } from "../../store/actions/product-actions";
import { useSelector, useDispatch } from "react-redux";

import "./Home.css";
import Loader from "../layout/Loader/Loader";
import Alert from "../Alert/Alert";
import { productActions } from "../../store/reducers/product-slice";

function Home() {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Trikuta Seeds" />

          {error && (
            <Alert
              message={error}
              type="error"
              onClose={(e) => {
                dispatch(productActions.clearErrors());
              }}
            />
          )}
          <div className="banner">
            <p>Welcome to Trikuta Agri Seeds</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#homeHeading">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 id="homeHeading" className="homeHeading">
            Featured Products
          </h2>

          <div className="container">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
