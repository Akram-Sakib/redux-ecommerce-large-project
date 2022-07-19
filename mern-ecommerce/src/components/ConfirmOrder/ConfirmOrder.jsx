import React from "react";
import { useSelector } from "react-redux";
import CheckoutStep from "../CheckoutStep/CheckoutStep";
import Footer from "../Footer/Footer";
import MetaData from "../MetaData/MetaData";
import Navbar from "../Navbar/Navbar";
import "./ConfirmOrder.css";

const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharge = subTotal > 1000 ? 0 : 200;
  const tax = subTotal * 0.18;
  const totalPrice = subTotal + tax + shippingCharge;

  const proceedPayment = () => {
    const proceedData = {
      subTotal,
      shippingCharge,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(proceedData));
    history.push("/process/payment");
  };

  return (
    <>
      <Navbar />
      <MetaData title="Confirm Order" />
      <div className="shop-container-shipping-caption">
        <p>Home / Confirm Order</p>
        <h3>Confirm Order</h3>
      </div>
      <div className="mb-5 pb-5">
        <CheckoutStep activeStep={1} />
      </div>

      <div className="confirm__order">
        <div className="user__information mb-5 pb-5">
          <div data-aos="fade-right">
            <h1>User Information</h1>
            <label>Name</label> <br />
            <input type="text" value={user.name} readOnly /> <br />
            <label>Email</label> <br />
            <input type="text" value={user.email} readOnly /> <br />
            <label>Number</label> <br />
            <input type="text" value={shippingInfo.phoneNo} readOnly /> <br />
            <label>Address</label> <br />
            <input type="text" value={shippingInfo.address} readOnly /> <br />
            <label>City</label> <br />
            <input type="text" value={shippingInfo.city} readOnly /> <br />
            <label>State</label> <br />
            <input type="text" value={shippingInfo.state} readOnly /> <br />
            <label>Pin Code</label> <br />
            <input type="text" value={shippingInfo.pinCode} readOnly /> <br />
          </div>
        </div>
        <div className="user_order_proceed" data-aos="fade-right">
          <div className="user__information mb-5 pb-3">
            <h1>Your Cart Items</h1>
            <div className="product-sending-parent-section">
              <div className="customization">
                {cartItems.map((data) => (
                  <>
                    <div className="user-cart" key={data.product}>
                      <img src={data.image} alt="" />
                      <h6>{data.name}</h6>

                      <div className="quantity-item">
                        <p>{`${data.quantity} X ${data.price}`}</p>
                      </div>

                      <p>${data.price * data.quantity}</p>
                    </div>
                  </>
                ))}
              </div>
              <div className="proceed-checkout">
                <h1 className="mt-5 pt-3 need-border-bottom"> ORDER SUMMERY</h1>
                <div className="need-border-bottom">
                  <div className="order-summary">
                    <h5>Subtotal </h5>
                    <h5>${subTotal}</h5>
                  </div>
                  <div className="order-summary">
                    <h5>Shipping Charges </h5>
                    <h5>${shippingCharge}</h5>
                  </div>
                  <div className="order-summary">
                    <h5>Tax </h5>
                    <h5>${tax}</h5>
                  </div>
                  <div className="order-summary">
                    <h5>Total Price </h5>
                    <h5>${totalPrice}</h5>
                  </div>
                </div>
                <div className="proceed_order_success">
                  <button onClick={proceedPayment}>Proceed to payment</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConfirmOrder;
