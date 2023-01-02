/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../../Navbar/Navbar";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CardItem from "../../CardItem/CardItem";
import { Box, Link, Typography } from "@mui/material";
import Titlebar from "../../Titlebar/TitleBar";
import PlusButton from "../../PlusButton/PlusButton";
import ActionCard from "../../ActionCard/ActionCard";
import useScreenSize from "../../../hooks/useScreenSize";
import { SlideUp } from "../../Animation/Animation";

const Home = () => {
  const loggedUser = JSON.parse(localStorage.getItem("USER"));
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
        <Box>
          <Typography variant="h3" textAlign="center" marginTop={!isPhoneScreen && !isTabletScreen ? 8 : 0}>Overview</Typography>
          <Box sx={!isPhoneScreen && !isTabletScreen ? { display: "flex", justifyContent: "space-evenly", marginTop: "20px" } : {}}>
            <CardItem icon={<InventoryIcon />} title="Items" sx={cardStyles} />
            <CardItem icon={<StoreIcon />} title="Shops" sx={cardStyles} />
            <CardItem icon={<LocationOnIcon />} title="Locations" sx={cardStyles} />
          </Box>
          <Typography variant="h4" textAlign="center">Last 3 actions <Link href="/actions" underline="none" color="#b8b9b9" fontSize={17}>View All</Link></Typography>
          <Box sx={!isPhoneScreen && !isTabletScreen ? { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", marginTop: "70px" } : { marginTop: "10px", overflowY: "scroll" }}>
            {loggedUser.actions.length
              ?
              loggedUser.actions.slice(-3).map((action) => {
                const userObj = JSON.parse(action.user);
                const formattedTimestampt = `${new Date(action.timestamp).toLocaleDateString()} - ${new Date(action.timestamp).toLocaleTimeString()}`;
                return <ActionCard key={action.action} action={action.action} user={userObj.username} timestamp={formattedTimestampt} />;
              })
              :
              <Typography variant="h5" color="#b8b9b9">No actions yet</Typography>
            }
          </Box>
        </Box>
      </SlideUp>
    </>
  );
};

export default Home;
