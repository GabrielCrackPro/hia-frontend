/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Card,
  Link,
  Typography,
  CardContent,
  capitalize,
  Grid,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CategoryIcon from "@mui/icons-material/Category";
import Titlebar from "../../Titlebar/TitleBar";
import Navbar from "../../Navbar/Navbar";
import { deleteOne, getData, putData } from "../../../utils";
import { Box } from "@mui/system";
import PlusButton from "../../PlusButton/PlusButton";
import useScreenSize from "../../../hooks/useScreenSize";
import { SlideUp, ZoomIn } from "../../Animation/Animation";
const Items = () => {
  const [data, setData] = useState([]);
  const loggedUser = JSON.parse(localStorage.getItem("USER"));

  const { isPhoneScreen, isTabletScreen } = useScreenSize();

  const handleDeleteItem = async (itemIndex) => {
    loggedUser.items.splice(itemIndex, 1);
    localStorage.setItem("USER", JSON.stringify(loggedUser));
    const items = await getData("items");
    await deleteOne("items", items[itemIndex]["_id"]);
    // await putData(`users/${loggedUser["_id"]}`, loggedUser);
    location.pathname = "/home";
  };

  useEffect(() => {
    (async () => {
      setData(loggedUser.items);
    })();
  }, []);
  return (
    <>
      <Titlebar />
      <Navbar value="items" />
      {isPhoneScreen || isTabletScreen ? <PlusButton /> : ""}
      <Navbar value="items" />
      <ZoomIn>
        <Typography variant="h3" textAlign="center" marginTop="5px">
          Items
        </Typography>
      </ZoomIn>
      <SlideUp>
        <Grid
          alignItems="center"
          container={!isPhoneScreen}
          spacing={2}
          sx={{ marginTop: isPhoneScreen ? "0px" : "20px" }}
        >
          {data.length ? (
            data.map((entry) => {
              return (
                <Card variant="outlined" key={entry["created_at"]}>
                  <CardContent>
                    <Typography variant="p">
                      <InventoryIcon /> {"Name: " + capitalize(entry.name)}
                    </Typography>{" "}
                    <br />
                    <Typography variant="p">
                      <CategoryIcon /> {"Type: " + capitalize(entry.type)}
                    </Typography>{" "}
                    <br />
                    <Typography variant="p">
                      <CalendarTodayIcon />{" "}
                      {"Created At : " +
                        new Date(entry.created_at).toLocaleString()}
                    </Typography>{" "}
                    <br />
                    <Typography variant="p">
                      <EventRepeatIcon />{" "}
                      {"Updated At: " +
                        new Date(entry.updated_at).toLocaleString()}
                    </Typography>{" "}
                    <br />
                    <Box component="div" sx={{ mt: "5px" }}>
                      <Link
                        href={`edit/item/${entry["_id"]}`}
                        sx={{
                          mr: "10px",
                          border: "1px solid currentcolor",
                          padding: "3px",
                        }}
                        underline="none"
                        component="a"
                        variant="button"
                      >
                        <EditIcon sx={{ fontSize: "15px", ml: "5px" }} />
                        Edit Item
                      </Link>
                      <Link
                        onClick={() => handleDeleteItem(data.indexOf(entry))}
                        sx={{
                          border: "1px solid currentcolor",
                          padding: "3px",
                        }}
                        underline="none"
                        component="a"
                        variant="button"
                        color="error"
                      >
                        <DeleteIcon sx={{ fontSize: "15px", ml: "5px" }} />
                        Delete Item
                      </Link>
                    </Box>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Box
              sx={{
                width: "100vw",
                height: "87vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#b8b8b8",
              }}
            >
              <InventoryIcon sx={{ fontSize: "75px" }} />
              <Typography sx={{ fontSize: "35px", fontWeight: "bold" }}>
                No items yet
              </Typography>
            </Box>
          )}
        </Grid>
      </SlideUp>
    </>
  );
};

export default Items;
