import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import {
  getAdminProducts,
  deleteProduct,
} from "../../store/actions/product-actions";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import { Edit, Delete } from "@mui/icons-material";
import Sidebar from "./Sidebar";

import "./ProductsList.css";
import {
  deleteProductActions,
  productActions,
} from "../../store/reducers/product-slice";
import Alert from "../Alert/Alert";
import Loader from "../layout/Loader/Loader";

function ProductsList() {
  const dispatch = useDispatch();

  const { error, products, loading } = useSelector((state) => state.product);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteProduct
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    dispatch(getAdminProducts());
  }, [dispatch]);
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/product/${params.row.id}`}>
              <Edit />
            </Link>

            <Button onClick={() => deleteProductHandler(params.row.id)}>
              <Delete />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`ALL PRODUCTS - Admin`} />

          {error && (
            <Alert
              type="error"
              message={error}
              onClose={(e) => {
                dispatch(productActions.clearErrors());
              }}
            />
          )}

          {deleteError && (
            <Alert
              type="error"
              message={deleteError}
              onClose={(e) => {
                dispatch(deleteProductActions.clearErrors());
              }}
            />
          )}
          {isDeleted && (
            <Alert
              type="success"
              message="Product Deleted Successfully."
              onClose={(e) => {
                dispatch(deleteProductActions.deleteProductReset());
                dispatch(getAdminProducts());
              }}
            />
          )}

          <div className="dashboard">
            <Sidebar />
            <div className="productListContainer">
              <h1 id="productListHeading">ALL PRODUCTS</h1>

              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ProductsList;
