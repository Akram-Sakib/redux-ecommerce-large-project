/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useAlert } from "react-alert";
import * as AiIcons from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Sidebar.css";
import { IconContext } from "react-icons";
import { BiLogInCircle } from "react-icons/bi";
import { logout } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import DashboardIcon from "@material-ui/icons/Dashboard";

function Sidebar() {
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
        <div className="navbar">
          <Link to="#" className="menu-bars" onClick={showSidebar}>
            <span className="hambar"></span>
            <span className="hambar"></span>
            <span className="hambar"></span>
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars-close">
                X
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/">
                <AiIcons.AiFillHome />
                <span>Home</span>
              </Link>
            </li>
            {user?.role === "admin" && (
              <li className="nav-text">
                <Link to="/dashboard">
                  <DashboardIcon />
                  <span>dashboard</span>
                </Link>
              </li>
            )}
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path} className={item.cName2}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li className="nav-text">
              <a onClick={logOutUser} style={{ cursor: "pointer" }}>
                <BiLogInCircle />
                <span>logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;
