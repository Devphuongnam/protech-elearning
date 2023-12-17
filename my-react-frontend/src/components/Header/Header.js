import React from "react";
import "./Header.css";
import SearchBar from "./SearchBar";
import UserProfile from "./UserProfile";

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
      <div className="search-bar">
        <SearchBar />
      </div>
      <UserProfile />
    </div>
  );
};

export default Header;
