import React from "react";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";

import "./Slider.css";
import videoOne from "../../video/salehup_video (online-video-cutter.com).mp4";
import { Link } from "react-router-dom";
const Slider = () => {
  return (
    <div>
      {/* <div className="bg">
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active first-img animate__animated animate__fadeInUp">
            <div className="container">
              <div className="row">
                <div className="col-lg-2"></div>
                <div className="col-lg-8">
                  <div className="img_text">
                    <h1> BREATH TAKING </h1>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Tempora quos sed cupiditate veniam dicta, quas
                      necessitatibus voluptatibus, velit suscipit inventore
                      recusandae soluta nihil sunt similique repudiandae.
                    </p>
                    <button>SHOP NOW </button>
                  </div>
                </div>
                <div className="col-lg-2"></div>
              </div>
            </div>
          </div>
          <div className="carousel-item second-img animate__animated animate__fadeInUp">
            <div className="need-padding-for-product">
              <div className="dummy-text">
                <h1>MacBook Pro</h1>
                <p>
                  Supercharged for pros. amet consectetur adipisicing elit.
                  Tempora quos sed cupiditate veniam dicta, quas necessitatibus
                  voluptatibus, velit suscipit inventore recusandae soluta nihil
                  sunt similique repudiandae.
                </p>

                <button className="customize">SHOP NOW </button>
              </div>

              <div className="text-center">
                <img
                  src="https://i.ibb.co/xhmqdsJ/hero-macbook-pro-14-16-0y2t2v3g4hu2-large-removebg.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="carousel-item third-img animate__animated animate__fadeInUp">
            <div className="px-4">
              <div className="row">
                <div className="col-lg-7">
                  <div className="img_text customize">
                    <h1>Samsung S22 Ultra</h1>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Tempora quos sed cupiditate veniam dicta, quas
                      necessitatibus voluptatibus, velit suscipit inventore
                      recusandae soluta nihil sunt similique repudiandae. Lorem
                      ipsum dolor sit amet consectetur adipisicing elit. Iure,
                      debitis?
                    </p>
                    <button className="customize">SHOP NOW </button>
                  </div>
                </div>
                <div className="col-lg-5"></div>
              </div>
            </div>
          </div>
          <div className="carousel-item four-img animate__animated animate__fadeInUp">
            <div className="container">
              <div className="row">
                <div className="col-lg-6"></div>
                <div className="col-lg-6">
                  <div className="img_text customize">
                    <h1>Oneplus 9 pro</h1>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Tempora quos sed cupiditate veniam dicta, quas
                      necessitatibus voluptatibus, velit suscipit inventore
                      recusandae soluta nihil sunt similique repudiandae.
                    </p>
                    <button className="customize">SHOP NOW </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div> */}
      {/* <div className="otherBg">
        <div className="dummy-text">
          <h4>Welcome to rsm ecommerce</h4>
          <h1>FIND AMAZING PRODUCTS BELOW</h1>
          <button className="customize">
            SHOP NOW <ArrowRightAltOutlinedIcon />{" "}
          </button>
        </div>
      </div> */}

      <div className="video-section">
        <video src={videoOne} muted loop autoPlay></video>
        <div className="video-overly">
          <h1>RSM Ecommerce</h1>
        </div>
        <>
          <div className="products__Item__text">
            <h1>Feel Strong Feel Fashionable</h1>
            <p>
              “Fashion is not something that exists in dresses only. Fashion is
              in the sky, in the street, fashion has to do with ideas, the way
              we live, what is happening"
            </p>
            <Link to="/">
              <button>Explore More</button>
            </Link>
          </div>
        </>
      </div>
    </div>
  );
};

export default Slider;
