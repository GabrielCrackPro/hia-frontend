/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import Logo from "../../img/logo.png";
import LogoLight from "../../img/logo-light.png";
import "./AppIcon.css";
import { useTheme } from "@emotion/react";

const AppIcon = ({ size }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  let imgClass;
  if (size == "large") {
    imgClass = "logo-lg";
  } else if (size == "medium") {
    imgClass = "logo-md";
  } else if (size == "small") {
    imgClass = "logo-sm";
  }
  return (
    <img src={isDarkMode ? Logo : LogoLight} alt="logo" className={imgClass} />
  );
};

AppIcon.propTypes = {
  size: PropTypes.string.isRequired,
};

export default AppIcon;
