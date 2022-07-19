import React, { useState } from "react";
import { Link } from "react-router-dom";

const HomeCategoriesDetails = ({ categoryData }) => {
  const [transtions, setTranstions] = useState(false);
  const changeBackground = () => {
    if (window.scrollY > 40) {
      setTranstions(true);
    } else {
      setTranstions(false);
    }
  };
  window.addEventListener("scroll", changeBackground);
  return (
    <>
      <div
        className="bg-section transtions"
        style={{
          background: `linear-gradient(#130e0e35,#0000008a),url(${
            categoryData.image ? categoryData.image : categoryData.imageUrl
          })`,
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
        data-aos={categoryData?.fadeTwo}
      ></div>
      <div className="content-section" data-aos={categoryData?.fade}>
        <h1>{categoryData.name}</h1>
        <p>{categoryData.description}</p>
        <Link to={`/products/${categoryData.category}`}>
          <button>Show More</button>
        </Link>
      </div>
    </>
  );
};

export default HomeCategoriesDetails;
