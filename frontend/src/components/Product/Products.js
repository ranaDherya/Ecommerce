import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProducts } from "../../store/actions/product-actions";
import Loader from "../layout/Loader/Loader";
import ProductCard from "./ProductCard";
import Pagination from "../layout/Pagination/Pagination";
import { Typography, Slider } from "@mui/material";
import Alert from "../Alert/Alert";
import { productActions } from "../../store/reducers/product-slice";

import "./Products.css";

function Products(props) {
  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 140000]);

  const dispatch = useDispatch();
  const {
    products,
    loading,
    error,
    productsCount,
    resultsPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts(keyword, currentPage, price));
  }, [dispatch, keyword, currentPage, price]);

  const onPageChangeHandler = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  return (
    <>
      {error && (
        <Alert
          message={error}
          type="error"
          onClose={(e) => {
            dispatch(productActions.clearErrors());
          }}
        />
      )}
      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={140000}
            />
          </div>

          <div className="paginationDiv">
            {productsCount && resultsPerPage < filteredProductsCount && (
              <Pagination
                currentPage={currentPage}
                onPageChange={onPageChangeHandler}
                totalCount={filteredProductsCount}
                pageSize={resultsPerPage}
                linkClassName="page-link"
                itemClassName="page-item"
                prevPageText="Prev"
                nextPageText="Next"
                activeItemClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Products;
