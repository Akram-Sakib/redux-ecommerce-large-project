/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import ProductDetails from "../ProductDetails/ProductDetails";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProduct } from "../../actions/productAction";
import Loader from "../../Loader/Loader";
import { useAlert } from "react-alert";

const Product = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="parent">
          {products &&
            products.map((product) => (
              <ProductDetails product={product}></ProductDetails>
            ))}
        </div>
      )}
    </>
  );
};

export default Product;
