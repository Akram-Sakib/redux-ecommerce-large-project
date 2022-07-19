import React, { useEffect } from "react";
import "./TittleSection.css";
import "aos/dist/aos.css";
import Aos from "aos";
import FormatQuoteOutlinedIcon from "@mui/icons-material/FormatQuoteOutlined";

const TittleSection = () => {
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
  }, [0]);
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="main-title-section">
      <div className="title-section" data-aos="fade-right">
        <div className="img-section"></div>
        <div className="title-content-section">
          <div className="content-of-shop">
            <span>
              <FormatQuoteOutlinedIcon />
            </span>
            <span className="border-top"></span>
            <h1>
              sense of <br />
              sophistication
            </h1>

            <span className="border-top"></span>
            <span>
              <FormatQuoteOutlinedIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TittleSection;
