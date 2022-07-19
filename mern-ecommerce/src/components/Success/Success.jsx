import React from "react";
import "./Success.css";
import CheckIcon from "@mui/icons-material/Check";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <>
      {" "}
      <Navbar />{" "}
      <div className="success">
        <CheckIcon />
        <h1>Your order has been placed successfully</h1>
        <Link to="/orders">
          {" "}
          <button>View Order</button>
        </Link>
      </div>
    </>
  );
};

export default Success;
