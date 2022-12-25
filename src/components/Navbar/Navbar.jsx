/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Avatar, BottomNavigation, BottomNavigationAction, Paper } from "@mui/material/";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import useScreenSize from "../../hooks/useScreenSize";

const Navbar = ({ value }) => {
  const [showHomeLabel, setShowHomeLabel] = useState(false);
  const [showItemsLabel, setShowItemsLabel] = useState(false);
  const [showShopsLabel, setShowShopsLabel] = useState(false);
  const [showLocationsLabel, setShowLocationsLabel] = useState(false);
  const [showSettingsLabel, setShowSettingsLabel] = useState(false);
  const { profilePicture } = JSON.parse(localStorage.getItem("USER"));

  const screen = useScreenSize();
  console.log(screen);
  return (
    <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={5}>
      <BottomNavigation value={value}>
        <BottomNavigationAction label="Home" value="home" href="/home" icon={<HomeIcon />} showLabel={showHomeLabel} onMouseEnter={() => setShowHomeLabel(true)} onMouseLeave={() => { setShowHomeLabel(false); }} />
        <BottomNavigationAction label="Items" value="items" href="/items" icon={<InventoryIcon />} showLabel={showItemsLabel} onMouseEnter={() => setShowItemsLabel(true)} onMouseLeave={() => setShowItemsLabel(false)} />
        <BottomNavigationAction label="Shops" value="shops" href="/shops" icon={<StoreIcon />} showLabel={showShopsLabel} onMouseEnter={() => setShowShopsLabel(true)} onMouseLeave={() => setShowShopsLabel(false)} />
        <BottomNavigationAction label="Locations" value="locations" href="/locations" icon={<LocationOnIcon />} showLabel={showLocationsLabel} onMouseEnter={() => setShowLocationsLabel(true)} onMouseLeave={() => setShowLocationsLabel(false)} />
        <BottomNavigationAction label="Me" value="settings" href="/settings" icon={<Avatar src={profilePicture} />} showLabel={showSettingsLabel} onMouseEnter={() => setShowSettingsLabel(true)} onMouseLeave={() => setShowSettingsLabel(false)} />
      </BottomNavigation >
    </Paper>
  );
};
export default Navbar;
