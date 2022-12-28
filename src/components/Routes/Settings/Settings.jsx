/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../../Navbar/Navbar";
import Titilebar from "../../Titlebar/TitleBar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import InventoryIcon from "@mui/icons-material/Inventory";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import { Avatar, Button, Card, CardContent, CardActions } from "@mui/material";
import { postData } from "../../../utils";
import { SlideUp } from "../../Animation/Animation";
const Settings = () => {
  const loggedUser = JSON.parse(localStorage.getItem("USER"));
  const handleLogout = () => {
    (async () => {
      const response = await postData(`http://127.0.0.1:3001/api/v1/users/logout/${loggedUser["_id"]}`, JSON.parse(localStorage.getItem("USER")));
      if (response.message == "User logged out successfully") {
        localStorage.removeItem("USER");
        location.pathname = "/";
      }
    })();
  };
  return (
    <>
      <Navbar value="settings" />
      <Titilebar />
      <SlideUp>
        <Box>
          <Card sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <Avatar src={loggedUser.profilePicture} sx={{ marginTop: "15px", height: "200px", width: "200px" }} />
            <CardContent>
              <Typography variant="h4" component="h4" textAlign="center">
                {loggedUser.displayname}
              </Typography>
              <Typography variant="body1" component="p" textAlign="center">
                <AlternateEmailIcon sx={{ fontSize: "15px" }} /> {loggedUser.username}
              </Typography>
              <Typography variant="p" component="p" textAlign="center">
                <InventoryIcon /> {loggedUser.items.length}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" variant="contained" color="secondary"><EditIcon />Edit</Button>
              <Button size="small" variant="contained" color="error"><DeleteIcon /> Delete</Button>
            </CardActions>
          </Card>
          <Button variant="contained" color="secondary" fullWidth sx={{ marginTop: "10px" }} onClick={handleLogout}><LogoutIcon /> Log out</Button>
        </Box>
      </SlideUp>
    </>
  );
};

export default Settings;
