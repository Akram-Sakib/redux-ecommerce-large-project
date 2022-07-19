import React from "react";
import { Link } from "react-router-dom";

const HomeCategoriesTwo = ({ categoryDataTwo }) => {
  console.log(categoryDataTwo);
  return (
    <>
      <div className="content-section" data-aos={categoryDataTwo?.fade}>
        <h1>{categoryDataTwo.name}</h1>
        <p>{categoryDataTwo.description}</p>
        <Link to={`/products/${categoryDataTwo.category}`}>
          <button>Show More</button>
        </Link>
      </div>
      <div
        className="bg-section transtions"
        style={{
          background: `linear-gradient(#130e0e35,#0000008a),url(${categoryDataTwo.image})`,
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
        data-aos={categoryDataTwo?.fadeTwo}
      ></div>
    </>
  );
};

export default HomeCategoriesTwo;
