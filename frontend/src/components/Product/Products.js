import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProducts } from "../../store/actions/product-actions";
import Loader from "../layout/Loader/Loader";
import ProductCard from "./ProductCard";
import Pagination from "../layout/Pagination/Pagination";
import { Typography, Slider } from "@mui/material";

import "./Products.css";
import Alert from "../Alert/Alert";

function Products(props) {
  const params = useParams();
  const { keyword } = params;

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);

  const dispatch = useDispatch();
  const {
    products,
    loading,
    error,
    productsCount,
    resultsPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.product);

  // const keyword = props.match.params.keyword;

  useEffect(() => {
    dispatch(getProducts(keyword, currentPage, price));
  }, [dispatch, keyword, currentPage, price]);

  const onPageChangeHandler = (pageNum) => {
    setCurrentPage(pageNum);
  };
  // console.log(productsCount);

  const priceHandler = (event, newPrice) => {
    console.log(newPrice);
    setPrice(newPrice);
  };

  console.log(currentPage);
  console.log(productsCount);
  console.log(resultsPerPage);
  return (
    <>
      {error && (
        <Alert message={error} type="error" clearErrors={clearErrors} />
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
              max={25000}
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
