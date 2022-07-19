import React, { useEffect } from "react";
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar";
import "./ViewManagement.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "../../../actions/productAction";
import { getAllUser } from "../../../actions/userAction";
import { getAllOrders } from "../../../actions/orderAction";
import { Link } from "react-router-dom";

const data = [
  {
    name: "Saturday",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Sunday",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Monday",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Tuesday",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Wednesday",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Thursday",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Friday",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const ViewManagement = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUser());
  }, [dispatch]);
  ///greeting

  return (
    <>
      <>
        <DashboardSidebar />
      </>
      <div className="user-greeting">
        <h3>
          hey <span className="user"> {user?.name}</span>, welcome
        </h3>
      </div>
      <div className="main-dashboard-management py-5 ">
        <div className="total-product dashboard-customization">
          <h2>products </h2>
          <h2>{products?.length}</h2>
        </div>
        <div className="total-orders dashboard-customization">
          <h2>order</h2>
          <h2>{orders?.length}</h2>
        </div>
        <div className="total-user dashboard-customization">
          <h2>users</h2>
          <h2>{users?.length}</h2>
        </div>
      </div>
      <div className="weekend__sales">
        <h3>
          Weekend <span className="seven-six">Sales</span>{" "}
        </h3>
      </div>
      <div style={{ width: "100%", height: 300 }} className="rechart">
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis className="custom-font-and-style" />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#767676" fill="black" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="user-order-list-container">
        <div className="user-title-ds ds-space">
          <h3>
            Recent <span className="seven-six"> Order's</span>{" "}
          </h3>
          <div className="user-order-show">
            {orders?.map((order) => (
              <>
                <div
                  className="user-cart need-customization-more"
                  key={order?._id}
                >
                  <h6>{order?._id.slice(0, 17)}</h6>
                  <h6>{order?.shippingInfo?.address}</h6>
                  <h6>{order?.shippingInfo?.phoneNo}</h6>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="user-title-ds">
          <h3>
            total <span className="seven-six">User</span>{" "}
          </h3>
          <div className="user-showing">
            {users.map((user) => (
              <>
                <div
                  className="user-cart need-customization-more"
                  key={user?._id}
                >
                  <img
                    className="user-img-of-ds"
                    src={user?.avatar?.url}
                    alt=""
                  />
                  <h6>{user.name}</h6>
                  <h6>Join on {user?.createdAt?.slice(0, 10)}</h6>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewManagement;
