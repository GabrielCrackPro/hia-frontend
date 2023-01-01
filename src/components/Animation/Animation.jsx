/* eslint-disable no-unused-vars */
import React from "react";
import { Slide, Zoom } from "@mui/material";

const animationTime = 200;

const SlideUp = ({ children }) => {
  return (
    <Slide direction="up" in mountOnEnter unmountOnExit timeout={animationTime}>
      {children}
    </Slide>
  );
};

const ZoomIn = ({ children }) => {
  return (
    <Zoom in mountOnEnter unmountOnExit timeout={animationTime}>
      {children}
    </Zoom>
  );
};
;

export { SlideUp, ZoomIn };
