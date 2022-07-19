/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import DashboardSidebar from "../Dashboard/DashboardSidebar/DashboardSidebar";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory, useRouteMatch } from "react-router-dom";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import {
  createProduct,
  clearError,
  getProductDetails,
  updateProduct,
} from "../../actions/productAction";
import MetaData from "../MetaData/MetaData";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();
  const match = useRouteMatch();
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);
  const { products, error } = useSelector((state) => state.productDetails);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [Stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]); //   add product categories
  const categoriesData = ["summer", "winter", "autumn", "spring"];
  const productId = match?.params?.id;
  console.log("productId", productId);
  ////data handling
  useEffect(() => {
    if (products?._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(products?.name);
      setPrice(products?.price);
      setDescription(products?.description);
      setStock(products?.Stock);
      setCategory(products?.category);
      setOldImages(products?.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("product updated successfully");
      history.push("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    productId,
    products,
    updateError,
  ]);

  /// submit handler
  const updateProductSubmitHandler = (e) => {
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
    dispatch(updateProduct(productId, myForm));
  };

  ///
  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);
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
      <MetaData title="UPDATE PRODUCT" />

      <DashboardSidebar />
      <div className="add-product need-padding-for-uploading-product">
        <form
          encType="multipart/form-data"
          onSubmit={updateProductSubmitHandler}
        >
          {" "}
          <h1 className="pt-4">Update Product</h1>
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
            {/* ///next work to add a image upload */}
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
              name="avatar"
              accept="image/*"
              onChange={updateProductImagesChange}
              multiple
            />
          </div>{" "}
          <div className="product-parent-div">
            {oldImages?.map((image, index) => (
              <div className="product-image-details">
                <img key={index} src={image?.url} alt="" />
              </div>
            ))}
            {console.log("products", products)}
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
            UPDATE PRODUCT
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
