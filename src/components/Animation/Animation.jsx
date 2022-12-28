/* eslint-disable no-unused-vars */
import React from "react";
import { Alert, Slide, Zoom } from "@mui/material";

const SlideUp = ({ children }) => {
  return (
    <Slide direction="up" in mountOnEnter unmountOnExit timeout={500}>
      {children}
    </Slide>
  );
};

const ZoomIn = ({ children }) => {
  return (
    <Zoom in mountOnEnter unmountOnExit timeout={500}>
      {children}
    </Zoom>
  );
};
;

export { SlideUp, ZoomIn };
