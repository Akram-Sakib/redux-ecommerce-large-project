import React from "react";
import ReactStarts from "react-rating-stars-component";

const Reviews = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(255, 255, 255, 0.329)",
    activeColor: "black",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review?.rating,
    isHalf: true,
  };
  return (
    <>
      <div className="user_review_name_photo">
        <img src="https://i.ibb.co/q0ymGTS/Profile-697fdcd2.png" alt="" />
        <h5>{review?.name}</h5>
      </div>
      <div className="comment">
        <p>
          {review?.comment} <br />
          <div className="text-center need-position-of-star">
            <ReactStarts {...options} />
          </div>
        </p>
      </div>
    </>
  );
};

export default Reviews;
