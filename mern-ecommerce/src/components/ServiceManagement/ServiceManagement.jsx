import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import WebReview from "../Review/WebReview";
import TittleSection from "../TittleSection/TittleSection";

const ServiceManagement = () => {
  return (
    <div className="ServiceManagement">
      <Navbar />
      <TittleSection />
      <WebReview />
      <Footer />
    </div>
  );
};

export default ServiceManagement;
