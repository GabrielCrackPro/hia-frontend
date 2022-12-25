/* eslint-disable no-unused-vars */
import { useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";

const useScreenSize = () => {
  
  // TODO: Fix screen sizes

  const [isPhoneScreen, setIsPhoneScreen] = useState(false);
  const [isTabletScreen, setIsTabletScreen] = useState(false);
  const [isDesktopScreen, setIsDesktopScreen] = useState(false);
  const [isLargeDesktopScreen, setIsLargeDesktopScreen] = useState(false);

  const phoneScreenQuery = useMediaQuery("(min-width:481px) and (max-width:768px)");
  const tabletScreenQuery = useMediaQuery("(min-width:769px) and (max-width:1024px)");
  const desktopScreenQuery = useMediaQuery("(min-width:1025px) and (max-width:1440px)");
  const largeDesktopScreenQuery = useMediaQuery("(min-width:1441px)");

  useEffect(() => {
    setIsPhoneScreen(phoneScreenQuery);
    setIsTabletScreen(tabletScreenQuery);
    setIsDesktopScreen(desktopScreenQuery);
    setIsLargeDesktopScreen(largeDesktopScreenQuery);
  }, [phoneScreenQuery, tabletScreenQuery, desktopScreenQuery, largeDesktopScreenQuery]);

  return {
    isPhoneScreen,
    isTabletScreen,
    isDesktopScreen,
    isLargeDesktopScreen,
  };
};
export default useScreenSize;
