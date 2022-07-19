import React from "react";
import "./Loader.css";
import { PuffLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="Loader">
      <PuffLoader color={"#DDD"} size={155} />
    </div>
  );
};

export default Loader;
