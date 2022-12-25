/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../../Navbar/Navbar";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CardItem from "../../CardItem/CardItem";
import { Box } from "@mui/material";
import Titlebar from "../../Titlebar/TitleBar";
import PlusButton from "../../PlusButton/PlusButton";

const Home = () => {
  return (
    <>
      <Titlebar />
      <Navbar value="home" />
      <PlusButton />
      <Box>
        <CardItem icon={<InventoryIcon />} title="Items" />
        <CardItem icon={<StoreIcon />} title="Shops" />
        <CardItem icon={<LocationOnIcon />} title="Locations" />
      </Box>
    </>
  );
};

export default Home;
