import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newProduct } from "../../store/actions/product-actions";
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
import { newProductActions } from "../../store/reducers/product-slice";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert/Alert";

import "./NewProduct.css";

function NewProduct() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["Paddy", "Macca", "Soyabean", "Wheat"];

  const navigate = useNavigate();

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const data = {
      name,
      price,
      description,
      category,
      Stock: stock,
      images: [...images],
    };

    dispatch(newProduct(data));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
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
      {error && (
        <Alert
          type="error"
          message={error}
          onClose={(e) => {
            dispatch(newProductActions.clearErrors());
          }}
        />
      )}
      {success && (
        <Alert
          type="success"
          message="Product Created Successfully"
          onClose={(e) => {
            dispatch(newProductActions.newProductReset());
            navigate("/admin/dashboard");
          }}
        />
      )}
      <MetaData title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

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
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
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
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
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
              Create
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewProduct;
