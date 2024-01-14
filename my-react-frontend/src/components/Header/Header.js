import React from "react";
import "./Header.css";
import UserProfile from "./UserProfile";
import Cart from "../Cart/Cart";
import { CartProvider } from "../Cart/CartContext";

const Header = () => {
  return (
    <div className="header">
      <div className="header-logo">
        <a href="/">
          <img
            href="/"
            className="logo"
            src="https://techinplay.edu.vn/assets/desktop/images/logo.png"
          />
        </a>
      </div>
      <div className="abc">
        <div className="shopping"></div>
        <div className="user-profile">
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default Header;
