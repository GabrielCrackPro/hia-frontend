/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../../Navbar/Navbar";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HistoryIcon from "@mui/icons-material/History";
import CardItem from "../../CardItem/CardItem";
import { Box, Typography } from "@mui/material";
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
          <Box sx={!isPhoneScreen && !isTabletScreen ? { display: "flex", justifyContent: "space-evenly", marginTop: "70px" } : {}}>
            <CardItem icon={<InventoryIcon />} title="Items" sx={cardStyles} />
            <CardItem icon={<StoreIcon />} title="Shops" sx={cardStyles} />
            <CardItem icon={<LocationOnIcon />} title="Locations" sx={cardStyles} />
          </Box>

          <Typography variant="h4" textAlign="center"><HistoryIcon /> Actions</Typography>
          <Box sx={!isPhoneScreen && !isTabletScreen ? { display: "flex", justifyContent: "space-evenly", marginTop: "70px" } : {}}>
            {loggedUser.actions.length
              ?
              loggedUser.actions.map((action) => {
                const userObj = JSON.parse(action.user);
                return <ActionCard key={action.action} action={action.action} user={userObj.username} />;
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
