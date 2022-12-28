/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../../Navbar/Navbar";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CardItem from "../../CardItem/CardItem";
import { Box, Slide } from "@mui/material";
import Titlebar from "../../Titlebar/TitleBar";
import PlusButton from "../../PlusButton/PlusButton";
import useScreenSize from "../../../hooks/useScreenSize";
import { SlideUp } from "../../Animation/Animation";

const Home = () => {
  const { isPhoneScreen, isTabletScreen } = useScreenSize();
  const cardStyles = {
    width: "100%"
  };
  return (
    <>
      {isPhoneScreen || isTabletScreen ? <Titlebar /> : ""}
      <Navbar value="home" />
      {isPhoneScreen || isTabletScreen ? <PlusButton /> : ""}
      <SlideUp>
        <Box sx={!isPhoneScreen && !isTabletScreen ? { display: "flex", justifyContent: "space-evenly", marginTop: "70px" } : {}}>
          <CardItem icon={<InventoryIcon />} title="Items" sx={cardStyles} />
          <CardItem icon={<StoreIcon />} title="Shops" sx={cardStyles} />
          <CardItem icon={<LocationOnIcon />} title="Locations" sx={cardStyles} />
        </Box>
      </SlideUp>
    </>
  );
};

export default Home;
