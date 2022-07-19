import React from "react";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import videoOne from "../video/3d.mp4";
import { Link } from "react-router-dom";

const SliderOfCategories = () => {
  return (
    <div className="video-section">
      <video src={videoOne} muted loop autoPlay></video>
      <div className="video-overly">
        <h1>RSM Ecommerce</h1>
      </div>
      <>
        <div className="products__Item__text">
          <h1>Feel Strong Feel Fashionable</h1>
          <p>
            “Fashion is not something that exists in dresses only. Fashion is in
            the sky, in the street, fashion has to do with ideas, the way we
            live, what is happening"
          </p>

          <Link to="/products">
            <button>Buy Now</button>
          </Link>
        </div>
      </>
    </div>
  );
};

export default SliderOfCategories;
