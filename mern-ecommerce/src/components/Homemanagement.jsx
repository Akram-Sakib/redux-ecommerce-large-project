import React from "react";
import HomeCategories from "../HomeCategories/HomeCategories";
import SliderOfCategories from "../ProductShowWithCategories/SliderOfCategories";

import Footer from "./Footer/Footer";
import MetaData from "./MetaData/MetaData";
import Navbar from "./Navbar/Navbar";
import Product from "./Product/Product";
import WebReview from "./Review/WebReview";
import Slider from "./Slider/Slider";
import Subscribe from "./Subscribe/Subscribe";
import TittleSection from "./TittleSection/TittleSection";
import { useSelector } from "react-redux";
import UserOptions from "./UserOptions/UserOptions";
import Contact from "./Contact/Contact";

const HomeManagement = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <>
      <MetaData title="RSM E-COMMERCE" />
      <Navbar />
      {isAuthenticated && <UserOptions user={user} />}
      <SliderOfCategories />
      <HomeCategories />
      <Product />
      <TittleSection />
      <WebReview />
      <Contact />
      <Subscribe />
      <Footer />
    </>
  );
};

export default HomeManagement;
