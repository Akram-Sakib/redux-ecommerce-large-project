import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import "./Search.css";
import MetaData from "../components/MetaData/MetaData";
const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };
  return (
    <>
      <MetaData title="Search Product" />
      <Navbar />
      <div className="Search_container">
        <form className="searchBox" onSubmit={searchSubmitHandler}>
          <h3>Search Your favorite cloth</h3>
          <div className="search-div animate__animated animate__fadeInLeft">
            <input
              type="search"
              placeholder="Search"
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit">
              <SearchRoundedIcon />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Search;
