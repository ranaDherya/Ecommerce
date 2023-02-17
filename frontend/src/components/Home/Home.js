import React, { useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import Product from "./Product";
import MetaData from "../layout/MetaData";
import { getProducts } from "../../store/actions/product-actions";
import { useSelector, useDispatch } from "react-redux";

import "./Home.css";
import Loader from "../layout/Loader/Loader";
import Alert from "../Alert/Alert";

function Home() {
  const dispatch = useDispatch();
  const { loading, products, productsCounter, error } = useSelector(
    (state) => state.product
  );

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

          {error && <Alert message={error} type="error" />}
          <div className="banner">
            <p>Welcome to Trikuta Seeds</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>

          <div id="container" className="container">
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>
        </>
      )}
    </>
  );
}

export default Home;
