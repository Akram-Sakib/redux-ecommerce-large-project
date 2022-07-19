/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import "./SingleProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearError } from "../actions/productAction";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import ReactStarts from "react-rating-stars-component";
import Reviews from "../components/Reviews/Reviews";
import Footer from "../components/Footer/Footer";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../components/MetaData/MetaData";
import { addToCartItem } from "../actions/cartAction";
import UserOptions from "../components/UserOptions/UserOptions";
import { newReview } from "../actions/productAction";
import { NEW_REVIEW_RESET } from "../constants/productConstants";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const SingleProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const { products, loading, error } = useSelector(
    (state) => state.productDetails
  );
  /// review
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  ///review state
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  // review__function
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  //
  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);
    dispatch(newReview(myForm));
    setOpen(false);
  };
  //
  const isNotAuth = () => {
    history.push("/login");
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert, reviewError, success]);

  const options = {
    edit: false,
    color: "rgba(255, 255, 255, 0.329)",
    activeColor: "black",
    size: window.innerWidth < 600 ? 20 : 25,
    value: products?.reviews?.length,
    isHalf: true,
  };

  console.log("products", products?.ratings);

  ///review_rating
  // const options = {
  //   size: "large",
  //   value: products?.ratings,
  //   readOnly: true,
  //   precision: 0.5,
  // };

  //// product quantity set up

  const increaseQuantity = () => {
    // if (products?.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addToCartItem(match.params.id, quantity));
    alert.success("item added to cart");
  };

  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <div>
      <Navbar />
      {isAuthenticated && <UserOptions user={user} />}

      <div
        style={{
          background: `url(https://i.ibb.co/M1W0Lyz/h1-slider-1.jpg)fixed`,
          backgroundPosition: "center !important",
          backgroundRepeat: "no-repeat !important",
          backgroundSize: "cover !important",
          height: "100vh",
        }}
        className="background-of-details-page"
      >
        <h1>pure ecommerce magnificence</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
          similique ducimus rerum !
        </p>
        <p className="p-0">Adipisicing elit. Atque similique ducimus rerum !</p>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`You chosen ${products?.name}`} />
          <div className="single_product_show">
            {/* slider */}
            <div className="slider_section">
              <Carousel>
                {products?.images &&
                  products?.images?.map((item, i) => (
                    <div>
                      <div
                        className="repeation"
                        style={{
                          background: `url(${item?.url})`,
                          backgroundPosition: "top center !important",
                          backgroundRepeat: "no-repeat !important",
                          backgroundSize: "cover !important",
                          objectFit: "cover",
                          height: "130vh",
                        }}
                      ></div>

                      <img className="display none" src={item?.url} alt="" />
                    </div>
                  ))}
              </Carousel>
            </div>
            {/* slider */}

            <div className="product_details_name">
              <div className="product-introduce">
                <h1>{products?.name}</h1>
                <span className="productId">product#{products?._id}</span>
                <h4>${products?.price}</h4>
                <div className="grid-system">
                  <div className="quantity_div">
                    <input type="text" value={quantity} readOnly />
                    <div className="increment_decrement">
                      <button onClick={increaseQuantity}>+</button>
                      <button onClick={decreaseQuantity}>-</button>
                    </div>
                  </div>
                  {/* // */}
                  <div className="add_to_cart_button">
                    <div>
                      <button onClick={addToCartHandler}>ADD TO CART</button>
                    </div>
                  </div>
                </div>
                {/* /// */}
                <div className="more__information__for__this__product">
                  <ReactStarts {...options} />

                  <p>{products?.reviews?.length} Reviews</p>
                </div>
                <div className="inStock__Status">
                  <h6>
                    Stock -<> {products?.Stock < 1 ? "Stock Out" : "InStock"}</>
                  </h6>
                  <p>{products?.description}</p>
                  <button
                    onClick={isAuthenticated ? submitReviewToggle : isNotAuth}
                  >
                    Add Review
                  </button>
                </div>
              </div>
              <>
                {/* //Dialog// */}
                <Dialog
                  aria-labelledby="simple-dialog-title"
                  open={open}
                  onClose={submitReviewToggle}
                >
                  <h2 className="submit_review">Add review</h2>
                  <DialogContent className="submitDialog">
                    <div className="rating">
                      <Rating
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        size="small"
                      />
                    </div>

                    <textarea
                      className="submitDialogTextArea"
                      cols="30"
                      rows="7"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="add comment"
                    ></textarea>
                    <div className="close-n-submit-btn">
                      <button onClick={submitReviewToggle}>Cancel</button>
                      <button onClick={reviewSubmitHandler}>Submit</button>
                    </div>
                  </DialogContent>
                </Dialog>
                {/*  */}
                <div className="review-section">
                  <h2>Users Reviews </h2>
                  {products?.reviews && products?.reviews[0] ? (
                    <div className="reviews">
                      {products?.reviews?.map((review) => (
                        <Reviews review={review} />
                      ))}
                    </div>
                  ) : (
                    <div className="reviews">
                      <div className="user_review_name_photo">
                        <img
                          src="https://i.ibb.co/Gx2CZ8b/facebook-profile-blank-face.jpg"
                          alt=""
                        />
                        <h5>Akram Hossain Ahmed</h5>
                      </div>
                      <div className="comment">
                        <p>
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Libero eos, doloremque numquam maiores quasi
                          magnam molestias at quia ut quod sint enim, illo,
                          soluta laborum in iure cumque! Sit, est!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            </div>
          </div>
        </>
      )}
      <div className="display-none-when-media-query-active">
        <Footer />
      </div>
    </div>
  );
};

export default SingleProductDetails;
