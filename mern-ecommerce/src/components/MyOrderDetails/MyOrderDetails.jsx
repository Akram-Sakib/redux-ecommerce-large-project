import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearError, myOrdersDetails } from "../../actions/orderAction";
import MetaData from "../MetaData/MetaData";
import Navbar from "../Navbar/Navbar";
import "./MyOrderDetails.css";
import Loader from "../../Loader/Loader";
import Footer from "../Footer/Footer";

const MyOrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const alert = useAlert();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(myOrdersDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
  return (
    <div>
      {/* {loading ? (
        <Loader />
      ) : ( */}
      <div>
        <div>
          <Navbar />
          <div
            className="header"
            style={{
              background: `url(https://source.unsplash.com/1200x500/?stylish)`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "50vh",
            }}
          >
            <img src={user?.avatar?.url} alt="" />
            <h4>{`${user.name}'s orders Details`}</h4>
          </div>
          <div className="orders-headers"></div>
          <MetaData title={`${user.name} - Orders Details`} />
          <h1 className="shipping text-center mb-5">shipping Information</h1>

          <div className="shipping-information">
            <div className="left-side-information">
              <label> name *</label> <br />
              <input type="text" value={order?.user?.name} readOnly />
              <label> Number *</label> <br />
              <input
                type="text"
                value={order?.shippingInfo?.phoneNo}
                readOnly
              />
              <label> country *</label> <br />
              <input
                type="text"
                value={order?.shippingInfo?.country}
                readOnly
              />
            </div>
            <div className="left-side-information">
              <label> Email *</label> <br />
              <input type="text" value={order?.user?.email} readOnly />
              <label> city *</label> <br />
              <input type="text" value={order?.shippingInfo?.city} readOnly />
              <label> state *</label> <br />
              <input type="text" value={order?.shippingInfo?.state} readOnly />
            </div>
          </div>
          <h1 className="shipping text-center mb-5">Payment Information</h1>

          <div className="shipping-information">
            <div className="left-side-information">
              <label> name *</label> <br />
              <input type="text" value={order?.user?.name} readOnly />
              <label> Payment ID *</label> <br />
              <input type="text" value={order?.paymentInfo?.id} readOnly />
              <label> Amount *</label> <br />
              <input type="text" value={`$${order?.totalPrice}`} readOnly />
            </div>
            <div className="left-side-information">
              <label>Status *</label> <br />
              <input type="text" value={order?.paymentInfo?.status} readOnly />
              <label> isPad *</label> <br />
              <input
                type="text"
                value={
                  order?.paymentInfo &&
                  order?.paymentInfo.status === "succeeded"
                    ? "PAID"
                    : "NOT PAID YET"
                }
                readOnly
              />
            </div>
          </div>
          <h1 className="shipping text-center mb-5">Order Information</h1>
          <div className="need-custom-padding">
            <div className="product-sending-parent-section">
              <div className="customization">
                {order?.orderItems?.map((data) => (
                  <>
                    <div className="user-cart" key={data.product}>
                      <img src={data.image} alt="" />
                      <h6 className="font-family">{data.name}</h6>

                      <div className="quantity-item">
                        <p className="font-family">{`${data.quantity} X ${data.price}`}</p>
                      </div>

                      <p className="font-family">
                        ${data.price * data.quantity}
                      </p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
      <Footer />
    </div>
  );
};

export default MyOrderDetails;
