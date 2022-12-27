/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Card, Link, Typography, CardContent, Grid } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import BedIcon from "@mui/icons-material/Bed";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Titlebar from "../../Titlebar/TitleBar";
import Navbar from "../../Navbar/Navbar";
import { putData, deleteOne, capitalize } from "../../../utils";
import { Box } from "@mui/system";
import PlusButton from "../../PlusButton/PlusButton";
import useScreenSize from "../../../hooks/useScreenSize";

const Locations = () => {
  const [data, setData] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("USER"));
  useEffect(() => {
    (async () => {
      setData(loggedUser.locations);
    })();
  }, []);

  const { isPhoneScreen, isTabletScreen } = useScreenSize();
  return (
    <>
      <Titlebar />
      <Navbar value="locations" />
      {isPhoneScreen && isTabletScreen ? <PlusButton /> : ""}
      <Typography variant="h3" textAlign="center">Locations</Typography>
      <Grid alignItems="center" container={!isPhoneScreen} spacing={2} sx={{ marginTop: isPhoneScreen ? "0px" : "20px" }}>
        {
          data.length ?
            data.map((entry) => {
              return (
                <Card variant="outlined" key={entry["created_at"]}>
                  <CardContent>
                    <Typography variant="p"><LocationOnIcon /> {"Name: " + capitalize(entry.name)}</Typography> <br />
                    <Typography variant="p"><BedIcon /> {"Room: " + capitalize(entry.room)}</Typography> <br />
                    <Typography variant="p"><InventoryIcon /> {entry.items ? "Items: " + entry.items : "Items: No items yet"}</Typography> <br />
                    <Typography variant="p"><CalendarTodayIcon /> {"Created At: " + new Date(entry.created_at).toDateString()}</Typography> <br />
                    <Typography variant="p"><EventRepeatIcon /> {"Updated At: " + new Date(entry.updated_at).toDateString()}</Typography> <br />
                    <Box component="div" sx={{ mt: "5px" }}>
                      <Link href={`location/${entry["_id"]}`} sx={{ mr: "10px", border: "1px solid currentcolor", padding: "3px" }} underline="none" component="a" variant="button"><EditIcon sx={{ fontSize: "15px", ml: "5px" }} />Edit Location</Link>
                      <Link onClick={() => {
                        deleteOne("locations", entry["_id"]);
                        loggedUser.locations.pop();
                        localStorage.setItem("USER", JSON.stringify(loggedUser));
                        putData(`http://127.0.0.1:3001/api/v1/users/${loggedUser["_id"]}`, loggedUser);
                        // TODO: Remove a specific element
                      }}
                      sx={{ border: "1px solid currentcolor", padding: "3px" }} underline="none" component="a" variant="button" color="error"><DeleteIcon sx={{ fontSize: "15px", ml: "5px" }} />Delete Location</Link>
                    </Box>
                  </CardContent>
                </Card>
              );
            })
            :
            <Box sx={{
              width: "100vw",
              height: "87vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#b8b8b8"
            }}>
              <LocationOnIcon sx={{ fontSize: "75px" }} />
              <Typography sx={{ fontSize: "35px", fontWeight: "bold" }}>No locations yet</Typography>
            </Box>


        }
      </Grid>
    </>
  );
};

export default Locations;
