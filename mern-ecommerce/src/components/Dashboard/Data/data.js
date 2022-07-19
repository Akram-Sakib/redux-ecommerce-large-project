import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { RiProductHuntLine } from "react-icons/ri";
import { MdRateReview } from "react-icons/md";

export const data = [
  {
    title: "Products",
    path: "/admin/products",
    icon: <RiProductHuntLine />,
    cName: "nav-text customization-for-text",
    cName2: "",
  },
  {
    title: "Create Product",
    path: "/admin/create-product",
    icon: <IoIcons.IoMdCreate />,
    cName: "nav-text customization-for-text",
    cName2: "",
  },
  {
    title: "all orders",
    path: "/admin/orders",
    icon: <AiIcons.AiTwotoneShopping />,
    cName: "nav-text customization-for-text",
    cName2: "",
  },
  {
    title: "users",
    path: "/admin/users",
    icon: <FaIcons.FaUserFriends />,
    cName: "nav-text customization-for-text",
    cName2: "",
  },
  {
    title: "products reviews",
    path: "/admin/reviews",
    icon: <MdRateReview />,
    cName: "nav-text customization-for-text",
    cName2: "",
  },
  {
    title: "website reviews",
    path: "/admin/webReviews",
    icon: <AiIcons.AiOutlineMessage />,
    cName: "nav-text customization-for-text",
    cName2: "",
  },
];
