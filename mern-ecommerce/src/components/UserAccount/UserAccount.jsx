import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import "./UserAccount.css";
import Footer from "../Footer/Footer";
import UserOptions from "../UserOptions/UserOptions";
import CameraswitchRoundedIcon from "@mui/icons-material/CameraswitchRounded";
import ArrowDownwardRoundedIcon from "@mui/icons-material/ArrowDownwardRounded";
import { Link, useHistory } from "react-router-dom";
import Loader from "../../Loader/Loader";

const UserAccount = () => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const history = useHistory();
  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);

  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div
            className="User-profile"
            style={{
              background: `url(https://source.unsplash.com/1040x500/?shopping,girl)`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "60vh",
            }}
          >
            <div className="user-images">
              <img src={user?.avatar?.url} alt="" />
            </div>
          </div>
          <div className="extra-customize-for-grid">
            <h3>
              {user?.name} {`(${user?.role})`}
            </h3>
            <Link to="/me/update">
              <CameraswitchRoundedIcon /> <span>Edit Profile Picture </span>
            </Link>
          </div>
          <h1 className="shipping text-center mb-5 mt-3">user Information</h1>

          <div className="shipping-information pb-5 mb-5">
            <div className="left-side-information">
              <label> _ID *</label> <br />
              <input type="text" value={user?._id} readOnly />
              <label> Email*</label> <br />
              <input type="text" value={user?.email} readOnly />
              <label> Date*</label> <br />
              <input
                type="text"
                value={user?.createdAt?.slice(0, 10)}
                readOnly
              />
            </div>
            <div className="left-side-information">
              <label> Name*</label> <br />
              <input type="text" value={user?.name} readOnly />
              <label> Role*</label> <br />
              <input type="text" value={user?.role} readOnly />
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default UserAccount;
