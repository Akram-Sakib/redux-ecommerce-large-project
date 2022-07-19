/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useAlert } from "react-alert";
import * as AiIcons from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import "./DashboardSidebar.css";
import { IconContext } from "react-icons";
import { BiLogInCircle } from "react-icons/bi";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { MdDashboardCustomize } from "react-icons/md";
import { data } from "../Data/data";

function DashboardSidebar() {
  const { user } = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const logOutUser = () => {
    dispatch(logout());
    alert.success("Logout Successfully");
    history.push("/");
  };
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar custom-nav">
          {" "}
          <Link to="#" className="menu-bars" onClick={showSidebar}>
            <span className="hambar hamberger"></span>
            <span className="hambar hamberger"></span>
            <span className="hambar hamberger"></span>
          </Link>
          <h4>admin cms</h4>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars-close">
                X
              </Link>
            </li>
            <div className="user-little-beat-profile ">
              <img src={user?.avatar?.url} alt="" />
              <h6>{user?.name}</h6>
            </div>
            <div className="scroll">
              <li className="nav-text customization-for-text">
                <Link to="/">
                  <AiIcons.AiFillHome />
                  <span>Home</span>
                </Link>
              </li>

              {data.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path} className={item.cName2}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
              <li className="nav-text customization-for-text">
                <a onClick={logOutUser} style={{ cursor: "pointer" }}>
                  <BiLogInCircle />
                  <span>logout</span>
                </a>
              </li>
            </div>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default DashboardSidebar;
