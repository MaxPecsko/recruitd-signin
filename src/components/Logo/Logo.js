import React from "react";
import logo from "./recruitd_MainLogo_Green.png";
import "./logo.css";

const Logo = () => {
  return (
    <div className="Logo" style={{}}>
      <div className="corners-shared top-left" />
      <img className="logo-img" src={logo} alt="logo" />
      <div className="corners-shared bottom-right" />
    </div>
  );
};

export default Logo;
