import React from "react";
import Navbar from "../Navbar/Navbar";
import "./ContactCss.css";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import Contact from "../Contact/Contact";

const ContactManagement = () => {
  return (
    <>
      <Navbar />
      <div className="contact___banner">
        <div className="contact___banner__text">
          <h1>Contact Us</h1>
          <p>
            “Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            suscipit, esse harum ipsam expedita, mollitia aspernatur molestiae
            iste delectus incidunt architecto voluptatem asperiores hic non
            aperiam rerum dolorem eveniet doloribus."
          </p>
          <Link to="/">Explore more</Link>
        </div>
      </div>
      <Contact />
      <Footer />
    </>
  );
};

export default ContactManagement;
