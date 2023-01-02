/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../../Navbar/Navbar";
import { Box, Link, Typography } from "@mui/material";
import Titlebar from "../../Titlebar/TitleBar";
import PlusButton from "../../PlusButton/PlusButton";
import ActionCard from "../../ActionCard/ActionCard";
import useScreenSize from "../../../hooks/useScreenSize";
import { SlideUp } from "../../Animation/Animation";

const Actions = () => {
  const loggedUser = JSON.parse(localStorage.getItem("USER"));
  const { isPhoneScreen, isTabletScreen } = useScreenSize();
  return (
    <>
      {isPhoneScreen || isTabletScreen ? <Titlebar /> : ""}
      <Navbar value="" />
      {isPhoneScreen || isTabletScreen ? <PlusButton /> : ""}
      <SlideUp>
        <Box>
          {loggedUser.actions.length ? <Typography variant="h4" textAlign="center" marginTop={!isPhoneScreen && !isTabletScreen ? 8 : 0}>Actions</Typography> : ""}
          <Box sx={!isPhoneScreen && !isTabletScreen ? { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", marginTop: "70px" } : {}}>
            {
              loggedUser.actions.length
                ?
                loggedUser.actions.map((action) => {
                  const userObj = JSON.parse(action.user);
                  const formattedTimestamp = `${new Date(action.timestamp).toLocaleDateString()} - ${new Date(action.timestamp).toLocaleTimeString()}`;
                  return <ActionCard key={action.action} action={action.action} user={userObj.username} timestamp={formattedTimestamp} />;
                })
                :
                ""
            }
          </Box>
        </Box>
      </SlideUp>
    </>
  );
};

export default Actions;
