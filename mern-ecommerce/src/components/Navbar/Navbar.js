import React from "react";
import { ReactNavbar } from "overlay-navbar";
import "./Navbar.css";
import "./style.css";
import { FaSearch, FaShoppingCart, FaUserAlt } from "react-icons/fa";
const Navbar = () => {
  return (
    <ReactNavbar
      navColor1="white"
      navColor2="hsl(219, 48%, 8%)"
      burgerColor="hsl(250, 100%, 75%)"
      burgerColorHover="hsl(250, 100%, 75%)"
      logoWidth="250px"
      logoHoverColor="black"
      nav2justifyContent="space-around"
      nav3justifyContent="space-around"
      link1Text="Home"
      link2Text="product"
      link3Text="About"
      link4Text="Contact"
      link1Url="/"
      link2Url="/products"
      link3Url="/about"
      link4Url="/contact"
      link1ColorHover="white"
      link1Color="HSL(250, 100%, 75%)"
      link1Size="1.5rem"
      link1Padding="3vmax"
      profileIcon={true}
      cartIcon={true}
      searchIcon={true}
      SearchIconElement={FaSearch}
      CartIconElement={FaShoppingCart}
      ProfileIconElement={FaUserAlt}
      profileIconColor="HSL(250, 100%, 75%)"
      profileIconColorHover="white"
    />
  );
};

export default Navbar;
