/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Navbar from "../Navbar/Navbar";
import MetaData from "../MetaData/MetaData";
import CheckoutStep from "../CheckoutStep/CheckoutStep";
import axios from "axios";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { clearError, createOrder } from "../../actions/orderAction";
import "./Payment.css";
import Footer from "../Footer/Footer";
import { useHistory } from "react-router-dom";

const Payment = () => {
  let history = useHistory();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          history.push("/success");
        } else {
          alert.error("There's some issue while processing payment");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error, alert]);

  return (
    <>
      <Navbar />
      <MetaData title="Payment Order" />
      <div className="shop-container-shipping-caption" data-aos="fade-up">
        <p>Home / Payment Order</p>
        <h3>Payment Order</h3>
      </div>
      <div className="mb-5 pb-5" data-aos="fade-up">
        <CheckoutStep activeStep={2} />
      </div>
      <div className="payment_success_item" data-aos="fade-right">
        <h1>Payment Order</h1>
      </div>
      <div className="paymentContainer" data-aos="fade-right">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <button type="submit" ref={payBtn} className="paymentFormBtn">
            {`Pay - $ ${orderInfo && orderInfo.totalPrice}`}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
