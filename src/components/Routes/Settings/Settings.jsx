/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../../Navbar/Navbar";
import Titilebar from "../../Titlebar/TitleBar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import InventoryIcon from "@mui/icons-material/Inventory";
import useScreenSize from "../../../hooks/useScreenSize";
import { Box } from "@mui/system";
import { Avatar, Button, Card, CardContent, CardActions } from "@mui/material";
import { getData, postData, putData } from "../../../utils";
import { SlideUp } from "../../Animation/Animation";
const Settings = () => {
  const loggedUser = JSON.parse(localStorage.getItem("USER"));
  const { isPhoneScreen, isTabletScreen } = useScreenSize();

  const handleLogout = () => {
    (async () => {
      const response = await postData(
        `users/logout/${loggedUser["_id"]}`,
        JSON.parse(localStorage.getItem("USER"))
      );
      if (response.message == "User logged out successfully") {
        localStorage.removeItem("USER");
        location.pathname = "/";
      }
    })();
  };
  return (
    <>
      <Navbar value="settings" />
      {isPhoneScreen || isTabletScreen ? <Titilebar /> : ""}
      <SlideUp>
        <Box
          sx={!isPhoneScreen || !isTabletScreen ? { marginTop: "55px" } : {}}
        >
          <Card
            sx={
              !isPhoneScreen && !isTabletScreen
                ? {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }
                : {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }
            }
          >
            <Avatar
              src={loggedUser.profilePicture}
              sx={{ marginTop: "15px", height: "200px", width: "200px" }}
            />
            <CardContent>
              <Typography variant="h4" component="h4" textAlign="center">
                {loggedUser.displayname}
              </Typography>
              <Typography variant="body1" component="p" textAlign="center">
                <AlternateEmailIcon sx={{ fontSize: "15px" }} />{" "}
                {loggedUser.username}
              </Typography>
              <Typography variant="p" component="p" textAlign="center">
                <InventoryIcon /> {loggedUser.items.length}
              </Typography>
            </CardContent>
            <CardActions>
              {!isPhoneScreen || !isTabletScreen ? (
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  onClick={handleLogout}
                >
                  <LogoutIcon /> Log Out
                </Button>
              ) : (
                ""
              )}
            </CardActions>
          </Card>
        </Box>
      </SlideUp>
    </>
  );
};

export default Settings;
