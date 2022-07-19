/* eslint-disable no-sequences */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./ProductShowWithCategories.css";
import Navbar from "../components/Navbar/Navbar";
import SliderOfCategories from "./SliderOfCategories";
import Footer from "../components/Footer/Footer";
import SliderCat from "../components/Slider/Slider";
import Loader from "../Loader/Loader";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import { getProduct, clearError } from "../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { useAlert } from "react-alert";
import MetaData from "../components/MetaData/MetaData";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import UserOptions from "../components/UserOptions/UserOptions";
const categories = ["summer", "winter", "autumn", "spring"];

const ProductShowWithCategories = ({ match }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 500]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState([0, 5]);
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    loading,
    error,
    products,
    productCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);
  ///
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  let count = filteredProductsCount;
  function refreshPage() {
    window.location.reload(false);
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <div>
      <Navbar />
      {isAuthenticated && <UserOptions user={user} />}
      <SliderCat />
      {/* /// */}
      <>
        <div className="filtering___and__categories__and_product___showing____container">
          <div className="sidebar___section">
            <div className="div-sticky">
              <h1>RSM E-COMMERCE</h1>
              <div className="slider-section mt-2 mb-3">
                <h4>Prices</h4>
                <div className="slider-for-rating-pricing">
                  <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={500}
                  />
                </div>
              </div>
              {/* /// */}
              <div className="categories">
                <h2>
                  Categories <ArrowRightAltOutlinedIcon />
                </h2>
                <ul>
                  {categories.map((category) => (
                    <>
                      <li
                        key={category}
                        onClick={() => setCategory(category)}
                        className="li-flex"
                      >
                        {category} <ArrowRightOutlinedIcon />
                      </li>
                    </>
                  ))}

                  <li onClick={refreshPage} className="li-flex">
                    All Products <ArrowRightOutlinedIcon />
                  </li>
                </ul>
              </div>
              {/* //product filtering by price/ */}
              <div className="slider-section mt-5">
                <h4>Ratings Above</h4>
                <div className="slider-for-rating-pricing">
                  <Slider
                    value={ratings}
                    onChange={(e, newRating) => {
                      setRatings(newRating);
                    }}
                    aria-labelledby="range-slider"
                    min={0}
                    max={5}
                    valueLabelDisplay="auto"
                  />
                </div>
              </div>
              {/*  */}
            </div>
          </div>
          <div className="product____section">
            {loading ? (
              <Loader />
            ) : (
              <>
                <MetaData title="product showing by your choosing filter" />
                <div className="parent-of-categories-product">
                  {products &&
                    products.map((product) => (
                      <ProductDetails
                        key={product?._id}
                        product={product}
                      ></ProductDetails>
                    ))}
                </div>
              </>
            )}
          </div>

          {/* /// */}
        </div>
      </>
      {/* <>
      {resultPerPage < productCount && (
        <div className="main-position">
          <div className="child-position">
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              See More Product
            </button>

            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5>See More Product</h5>
                    <button
                      type="button"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      X
                    </button>
                  </div>
                  <div class="modal-body">
                  
                    {resultPerPage < productCount && (
                      <div className="pagination-box">
                        <Pagination
                          activePage={currentPage}
                          itemsCountPerPage={resultPerPage}
                          totalItemsCount={productCount}
                          onChange={setCurrentPageNo}
                          nextPageText="Next"
                          prevPageText="Prev"
                          firstPageText="1st"
                          lastPageText="Last"
                          itemClass="page-item"
                          linkClass="page-link"
                          activeClass="pageItemActive"
                          activeLinkClass="pageLinkActive"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
     </> */}
      {resultPerPage < productCount && (
        <div className="main-position">
          <div className="child-position">
            <button onClick={handleOpen}>Show More Product</button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                {resultPerPage < productCount && (
                  <div className="pagination-box mt-3">
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={resultPerPage}
                      totalItemsCount={productCount}
                      onChange={setCurrentPageNo}
                      nextPageText="Next"
                      prevPageText="Prev"
                      firstPageText="1st"
                      lastPageText="Last"
                      itemClass="page-item"
                      linkClass="page-link"
                      activeClass="pageItemActive"
                      activeLinkClass="pageLinkActive"
                    />
                  </div>
                )}
              </Box>
            </Modal>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductShowWithCategories;
