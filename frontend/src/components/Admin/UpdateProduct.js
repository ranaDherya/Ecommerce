import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateProduct,
  getProductDetail,
} from "../../store/actions/product-actions";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import {
  AccountTree,
  Description,
  Storage,
  Spellcheck,
  AttachMoney,
} from "@mui/icons-material";
import Sidebar from "./Sidebar";
import {
  productDetailActions,
  updateProductActions,
} from "../../store/reducers/product-slice";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../Alert/Alert";

import "./NewProduct.css";

function UpdateProduct() {
  const dispatch = useDispatch();
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.updateProduct);

  const { error, product } = useSelector((state) => state.productDetail);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["Paddy", "Macca", "Soyabean", "Wheat"];

  const navigate = useNavigate();
  const { id: productId } = useParams();

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetail(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }
  }, [dispatch, navigate, productId, product]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      name,
      price,
      description,
      category,
      Stock: stock,
      images: [...images],
    };

    dispatch(updateProduct(productId, data));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setOldImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          const base64 = reader.result.toString("base64");
          setImages((old) => [...old, base64]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      {updateError && (
        <Alert
          type="error"
          message={updateError}
          onClose={(e) => {
            dispatch(updateProductActions.clearErrors());
          }}
        />
      )}

      {error && (
        <Alert
          type="error"
          message={error}
          onClose={(e) => {
            dispatch(productDetailActions.clearErrors());
          }}
        />
      )}

      {isUpdated && (
        <Alert
          type="success"
          message="Product Updated Successfully"
          onClose={(e) => {
            dispatch(updateProductActions.updateProductReset());
            navigate("/admin/products");
          }}
        />
      )}
      <MetaData title="Update Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              <Spellcheck />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoney />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              <Description />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTree />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Storage />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={stock}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Update
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateProduct;
