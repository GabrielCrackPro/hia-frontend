/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import Logo from "../../img/logo.png";
import "./AppIcon.css";

const AppIcon = ({ size }) => {
  let imgClass;
  if (size == "large") {
    imgClass = "logo-lg";
  } else if (size == "medium") {
    imgClass = "logo-md";
  } else if (size == "small") {
    imgClass = "logo-sm";
  }
  return (
    <img src={Logo} alt="logo" className={imgClass} />
  );
};

AppIcon.propTypes = {
  size: PropTypes.string.isRequired
};

export default AppIcon;
