import React from "react";
import "./NoMach.css";
import Navbar from "../Navbar/Navbar";
const NoMatch = () => {
  return (
    <>
      <Navbar />
      <div className="no-match ">
        <h1 className="animate__animated animate__fadeInUp">404 NOT FOUND</h1>
      </div>
    </>
  );
};

export default NoMatch;
