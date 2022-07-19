import React from "react";

const WebReviewDetails = ({ review }) => {
  return (
    <div className="user-information-for-review">
      <img src={review?.images[0]?.url} alt="" />
      <p>{review.description}</p>
      <h5>{review.name}</h5>
    </div>
  );
};

export default WebReviewDetails;
