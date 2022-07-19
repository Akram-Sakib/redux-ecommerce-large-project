import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Cart",
    path: "/Cart",
    icon: <AiIcons.AiOutlineShopping />,
    cName: "nav-text",
    cName2: "",
  },
  {
    title: "Search",
    path: "/Search",
    icon: <AiIcons.AiOutlineSearch />,
    cName: "nav-text",
    cName2: "",
  },
  {
    title: "Edit Profile",
    path: "/me/update",
    icon: <AiIcons.AiOutlineProfile />,
    cName: "nav-text",
    cName2: "",
  },
  {
    title: "Change Password",
    path: "/password/update",
    icon: <AiIcons.AiOutlineEdit />,
    cName: "nav-text",
    cName2: "",
  },
  {
    title: "Forgot Password",
    path: "/password/forgot",
    icon: <AiIcons.AiOutlineEyeInvisible />,
    cName: "nav-text",
    cName2: "",
  },
  {
    title: "Orders",
    path: "/orders",
    icon: <AiIcons.AiOutlineUnorderedList />,
    cName: "nav-text",
    cName2: "",
  },
  {
    title: "Contact",
    path: "/contact",
    icon: <AiIcons.AiOutlinePhone />,
    cName: "nav-text",
    cName2: "",
  },
];
