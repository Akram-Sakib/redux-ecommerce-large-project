import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../MetaData/MetaData";
import { Country, State } from "country-state-city";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./Shipping.css";
import CheckoutStep from "../CheckoutStep/CheckoutStep";
import { saveShippingInfo } from "../../actions/cartAction";

const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  ///shipping___submit

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 11 || phoneNo.length > 11) {
      alert.error("Phone number should be 10 digits long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    history.push("/order/confirm");
  };

  return (
    <>
      <Navbar />
      <MetaData title="Shipping Details" />
      <div className="shipping-container">
        <div className="shop-container-shipping-caption">
          <p>Home / Checkout</p>
          <h3>Checkout</h3>
        </div>
        <div className="checkout-step mb-5 pb-1">
          <CheckoutStep activeStep={0} />
        </div>
        <h1>BILLING DETAILS</h1>
        <div className="shipping-box">
          <form encType="multipart/form-data" onSubmit={shippingSubmit}>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Address"
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              placeholder="City"
            />
            <input
              type="number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              required
              placeholder="number"
            />
            <input
              type="text"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              required
              placeholder="pincode"
            />

            <select
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Country</option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
            {country && (
              <select
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">State</option>
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            )}
            <button type="submit" disabled={state ? false : true}>
              Proceed Order
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Shipping;
