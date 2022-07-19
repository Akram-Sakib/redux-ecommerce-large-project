import React, { useEffect, useState } from "react";
import { reviewData } from "../../Fakedata/FakeHomeCategoriesData";
import "./WebReview.css";
import WebReviewDetails from "./WebReviewDetails";
import Carousel from "react-material-ui-carousel";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";
import {
  clearError,
  createREview,
  getAllReviews,
} from "../../actions/reviewAction";
import { NEW_REVIEW_RESET } from "../../constants/reviewConstants";
const WebReview = () => {
  //
  const { loading, error, success } = useSelector((state) => state.webReview);
  const { reviews } = useSelector((state) => state.peopleReview);

  const dispatch = useDispatch();
  const alert = useAlert();
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]); //   add product categories
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (success) {
      alert.success("thank you for your review");
      history.push("/");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getAllReviews());
  }, [dispatch, error, success, alert, history]);

  /// submit handler
  const createReviewSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("description", description);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createREview(myForm));
  };

  ///
  const createReviewImagesChange = (e) => {
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

  ///
  //
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1080,
    bgcolor: "background.paper",
    boxShadow: 0,
    p: 5,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 2000);
  }
  return (
    <>
      <div className="reviews-item-container">
        <div className="user-review-btn">
          <button onClick={handleOpen}>ADD REVIEW</button>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <div className="review-container-of-web">
                <h1>ADD REVIEW</h1>
                <h4>Share your opinion about our site</h4>
                <div className="review-form">
                  <form
                    onSubmit={createReviewSubmitHandler}
                    encType="multipart/form-data"
                  >
                    <input
                      type="text"
                      placeholder="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <input
                      type="email"
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      cols="30"
                      rows="4"
                      placeholder="opinion"
                    ></textarea>
                    <div className="file-uploader">
                      <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={createReviewImagesChange}
                        multiple
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading ? true : false}
                      onClick={refreshPage}
                    >
                      Submit Opinion
                    </button>
                  </form>
                </div>
              </div>
            </Box>
          </Fade>
        </Modal>
        <div className="review-of-for-website" data-aos="fade-right">
          <div data-aos="fade-up">
            <h4>What people say about our site</h4>
            <Carousel>
              {reviews?.map((review) => (
                <WebReviewDetails key={review?.name} review={review} />
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebReview;
