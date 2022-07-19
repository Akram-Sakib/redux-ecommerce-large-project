import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";

const ProductDetails = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div
        style={{
          background: `url(${product?.images[0]?.url})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "70vh",
        }}
        className="product-main-div"
      >
        <div className="visibility-need ">
          <p>{product?.name}</p>
          <Link to={`/product/${product._id}`}>
            <span>
              <ShoppingBagOutlinedIcon />
            </span>
          </Link>

          <span>
            <CollectionsOutlinedIcon />
          </span>

          <p className="mt-3">${product?.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductDetails;
