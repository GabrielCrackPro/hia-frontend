/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Card, Link, Typography, CardContent, Grid } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import NotesIcon from "@mui/icons-material/Notes";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ScheduleIcon from "@mui/icons-material/Schedule";
import BusinessIcon from "@mui/icons-material/Business";
import LanguageIcon from "@mui/icons-material/Language";
import Titlebar from "../../Titlebar/TitleBar";
import Navbar from "../../Navbar/Navbar";
import { putData, deleteOne } from "../../../utils";
import { Box } from "@mui/system";
import { capitalize } from "../../../utils";
import PlusButton from "../../PlusButton/PlusButton";
import useScreenSize from "../../../hooks/useScreenSize";
import { SlideUp, ZoomIn } from "../../Animation/Animation";

const Shops = () => {
  const loggedUser = JSON.parse(localStorage.getItem("USER"));
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      setData(loggedUser.shops);
    })();
  }, []);

  const { isPhoneScreen, isTabletScreen } = useScreenSize();
  return (
    <>
      <Titlebar />
      <Navbar value="shops" />
      {isPhoneScreen && isTabletScreen ? <PlusButton /> : ""}
      <ZoomIn>
        <Typography variant="h3" textAlign="center">Shops</Typography>
      </ZoomIn>
      <SlideUp>
        <Grid alignItems="center" container={!isPhoneScreen} spacing={2} sx={{ marginTop: isPhoneScreen ? "0px" : "20px" }}>
          {
            data.length ?
              data.map((entry) => {
                return (
                  <Card variant="outlined" key={entry["created_at"]}>
                    <CardContent>
                      <Typography variant="p"><StoreIcon /> {"Name: " + capitalize(entry.name)}</Typography> <br />
                      <Typography variant="p"><NotesIcon /> {"Description: " + capitalize(entry.description)}</Typography> <br />
                      <Typography variant="p"><ShoppingCartIcon /> {"Type: " + capitalize(entry.type)}</Typography> <br />
                      <Typography variant="p"> {entry.address.includes("www.") ? <><LanguageIcon /> <Link href={`http://${entry.address}`} target="_blank">{entry.address}</Link></> : <><BusinessIcon /> {capitalize(entry.address)}</>} </Typography> <br />
                      <Typography variant="p"><ScheduleIcon /> {"Schedule: " + capitalize(entry.schedule)}</Typography> <br />
                      <Typography variant="p"><CalendarTodayIcon /> {"Created At: " + new Date(entry.created_at).toDateString()}</Typography> <br />
                      <Typography variant="p"><EventRepeatIcon /> {"Updated At: " + new Date(entry.updated_at).toDateString()}</Typography> <br />
                      <Box component="div" sx={{ mt: "5px" }}>
                        <Link href={`shop/${entry["_id"]}`} sx={{ mr: "10px", border: "1px solid currentcolor", padding: "3px" }} underline="none" component="a" variant="button"><EditIcon sx={{ fontSize: "15px", ml: "5px" }} />Edit Shop</Link>
                        <Link onClick={() => {
                          deleteOne("shops", entry["_id"]);
                          loggedUser.shops.pop();
                          localStorage.setItem("USER", JSON.stringify(loggedUser));
                          putData(`http://127.0.0.1:3001/api/v1/users/${loggedUser["_id"]}`, loggedUser);
                          // TODO: Remove a specific element
                        }}
                        sx={{ border: "1px solid currentcolor", padding: "3px" }} underline="none" component="a" variant="button" color="error"><DeleteIcon sx={{ fontSize: "15px", ml: "5px" }} />Delete Shop</Link>
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
                <StoreIcon sx={{ fontSize: "75px" }} />
                <Typography sx={{ fontSize: "35px", fontWeight: "bold" }}>No shops yet</Typography>
              </Box>
          }
        </Grid>
      </SlideUp>
    </>
  );
};

export default Shops;
