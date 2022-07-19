/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect } from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PublicIcon from "@mui/icons-material/Public";
import EditLocationOutlinedIcon from "@mui/icons-material/EditLocationOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getAllSubscribe } from "../../actions/subscribeAction";
const Footer = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, subscribe } = useSelector(
    (state) => state.getSubscribe
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getAllSubscribe());
  }, [dispatch, error, alert]);
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="about-site">
          <h4>About The Store</h4>
          <p>
            We are design and product obsessed. Uncompromising in the style,
            quality and performance of every product we create.
          </p>
          <p>
            This is a demonstration of the Symmetry theme for UI/UX. Essentials,
            Outerwear & Activewear kindly donated by Varley
          </p>
        </div>

        <div className="customer-service-n-social-icon">
          <h4>Customer Support</h4>
          <ul>
            <li>
              <Link to="/services">Customer Service</Link>
            </li>
            <li>
              <Link to="/products">product</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/login">Email Signup</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="customer-service-n-social-icon">
          <div className="about-site">
            <h4>Address</h4>
            <ul>
              <li>
                <Link to="/">
                  <EditLocationOutlinedIcon />
                  Dhaka Bangladesh
                </Link>
              </li>
              <li>
                <a
                  href="https://goo.gl/maps/65dDBsL52BM2CpEE9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapOutlinedIcon />
                  map
                </a>
              </li>
              <li>
                <a
                  href="https://it-z-Akram Hossain-site.web.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <PublicIcon /> website
                </a>
              </li>
            </ul>
            <div className="social-div">
              <p>
                Follow me on <ArrowRightAltOutlinedIcon />
              </p>
              <ul>
                <li>
                  <a
                    href="https://www.facebook.com/akramSakibA/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon />
                  </a>
                </li>
                <li>
                  <a href="" target="_blank" rel="noopener noreferrer">
                    <InstagramIcon />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/akram-sakib-a7742a214/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LinkedInIcon />
                  </a>
                </li>
                <li>
                  <a
                    href="https://akram-sakib.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PublicIcon />
                  </a>
                </li>
              </ul>
            </div>
            <div className="social-div">
              <p>
                Subscribe <ArrowRightAltOutlinedIcon />
              </p>
              <ul>
                <li>
                  <a>There are {subscribe?.length} people subscribed.</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center footer-last-caption">
        <p>
          @all right reserved{" "}
          <a
            href="https://akram-sakib.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Akram Hossain
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
