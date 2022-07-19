/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import "./CreateProduct.css";
import DashboardSidebar from "../Dashboard/DashboardSidebar/DashboardSidebar";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import { NEW_PRODUCTS_RESET } from "../../constants/productConstants";
import { createProduct, clearError } from "../../actions/productAction";
import MetaData from "../MetaData/MetaData";
// import {
//   createProduct,
//   clearError,
// } from "../../";
const CreateProduct = () => {
  const { loading, error, success } = useSelector((state) => state.newProduct);
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [Stock, setStock] = useState(1);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]); //   add product categories
  const categoriesData = ["summer", "winter", "autumn", "spring"];
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError);
    }
    if (success) {
      alert.success("product created successfully");
      history.push("/dashboard");
      dispatch({ type: NEW_PRODUCTS_RESET });
    }
  }, [dispatch, error, success, alert, history]);

  /// submit handler
  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  ///
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <>
      <MetaData title="CREATE PRODUCT" />

      <DashboardSidebar />
      <div className="add-product need-padding-for-uploading-product">
        <form
          encType="multipart/form-data"
          onSubmit={createProductSubmitHandler}
        >
          {" "}
          <h1 className="pt-4">Add Product</h1>
          <div className="product-input">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="margin-right"
            />
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
            />
          </div>
          <div className="product-upload-input">
            <input
              type="number"
              required
              value={Stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Stock"
            />
          </div>
          <div className="product-upload-input">
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              {categoriesData.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="product-upload-input">
            <textarea
              cols="30"
              rows="5"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div id="createProductFormFile">
            <input
              type="file"
              name="review"
              accept="image/*"
              onChange={createProductImagesChange}
              multiple
            />
          </div>
          <div className="product-parent-div">
            {imagesPreview.map((image, index) => (
              <div className="product-image-details">
                <img key={index} src={image} alt="" />
              </div>
            ))}
          </div>
          <button type="submit" disabled={loading ? true : false}>
            {" "}
            CREATE PRODUCT
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateProduct;
