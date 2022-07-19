import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import {
  clearError,
  myOrdersDetails,
  updateOrder,
} from "../../actions/orderAction";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstant";
import DashboardSidebar from "../Dashboard/DashboardSidebar/DashboardSidebar";
import MetaData from "../MetaData/MetaData";

const OrderStatus = () => {
  const alert = useAlert();
  const history = useHistory();
  const match = useRouteMatch();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();

  const updateStatusOfOrder = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(match.params.id, myForm));
  };
  ///
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("order updated successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(myOrdersDetails(match.params.id));
  }, [
    dispatch,
    error,
    updateError,
    alert,
    match.params.id,
    isUpdated,
    history,
  ]);

  return (
    <>
      <MetaData title="ORDER STATUS CHANGE" />
      <DashboardSidebar />

      <div className="pt-4"></div>
      {order?.orderStatus === "Delivered" ? (
        <div className="add-product need-padding-for-uploading-product">
          <div className="pt-4"></div>
          <h1 className="pt-5 text-center">Update Order Completed</h1>
          <Link to="/admin/orders">
            <button>BACK ORDER LIST</button>
          </Link>
        </div>
      ) : (
        <div className="add-product need-padding-for-uploading-product">
          <form encType="multipart/form-data" onSubmit={updateStatusOfOrder}>
            {" "}
            <h1 className="pt-5">Update Order</h1>
            <div className="admin-make">
              <select
                onChange={(e) => setStatus(e.target.value)}
                className="mt-3"
              >
                <option value="">Select status</option>
                {order?.orderStatus === "Processing" && (
                  <option value="Shipped">Shipped</option>
                )}
                {order?.orderStatus === "Shipped" && (
                  <option value="Delivered">Delivered</option>
                )}
              </select>
            </div>
            <button
              type="submit"
              disabled={loading ? true : false || status === "" ? true : false}
            >
              {" "}
              {order?.orderStatus === "Shipped"
                ? "ORDER DELIVERED"
                : "UPDATE STATUS"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default OrderStatus;
