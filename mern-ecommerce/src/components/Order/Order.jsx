/* eslint-disable no-dupe-keys */
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import LaunchIcon from "@material-ui/icons/Launch";
import { clearError, myOrders } from "../../actions/orderAction";
import MetaData from "../MetaData/MetaData";
import Loader from "../../Loader/Loader";
import { DataGrid } from "@material-ui/data-grid";
import "./Order.css";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const Order = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 200, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(
          params.id,
          "status" === "Delivered" ? "#DDD" : "black"
        );
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      minWidth: 300,
      flex: 1,
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 300,
      flex: 1,
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];
  ///
  orders &&
    orders.forEach((item, index) => {
      rows.push({
        quantity: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  ///
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(myOrders());
  }, [dispatch, alert, error]);
  return (
    <div>
      <Navbar />
      <div
        className="header"
        style={{
          background: `url(https://source.unsplash.com/1600x500/?orders)`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "50vh",
        }}
      >
        <img src={user?.avatar?.url} alt="" />
        <h4>{user.name}</h4>
      </div>
      <div className="orders-headers">
        <h1>{`${user.name}'s orders`}</h1>
      </div>
      <MetaData title={`${user.name} - Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <div className="order-of-user mb-5 pb-5">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="my-order-table"
            autoHeight
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Order;
