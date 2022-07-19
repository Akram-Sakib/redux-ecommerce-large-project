import React from "react";
import "./AboutManagement.css";
import Navbar from "../Navbar/Navbar";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const AboutManagementAboutManagement = () => {
  return (
    <>
      <Navbar />
      <div className="AboutManagementAboutManagement">
        <div className="about-me" data-aos="fade-right">
          <h1> DEV Akram Hossain </h1>
          <h2>Front-end Developer & Web UI/UX Designer</h2>
        </div>
        <div
          className="about-me mt-5"
          style={{ paddingTop: "250px" }}
          data-aos="fade-right"
        >
          <h1> About Akram Hossain </h1>
          <h2>
            Frontend developer who cares deeply about user experience. Serious
            passion for UI design and new technologies.
          </h2>
        </div>
        <div
          className="about-me mt-5"
          style={{ paddingTop: "250px" }}
          data-aos="fade-right"
        >
          <h1> Follow Akram Hossain </h1>
          <ul>
            <li>
              <a
                href="https://www.facebook.com/akramSakibA"
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                <FacebookIcon />
              </a>
            </li>
            <li>
              <a href="https://" target="_blank" rel="noopener noreferrer">
                {" "}
                <InstagramIcon />
              </a>
            </li>
            <li>
              <a href="https://" target="_blank" rel="noopener noreferrer">
                {" "}
                <LinkedInIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AboutManagementAboutManagement;
