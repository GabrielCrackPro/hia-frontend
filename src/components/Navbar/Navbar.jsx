/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Avatar, BottomNavigation, BottomNavigationAction, Button, Link, Paper } from "@mui/material/";
import DesktopAddMenu from "../DesktopAddMenu/DesktopAddMenu";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AppIcon from "../AppIcon/AppIcon";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import useScreenSize from "../../hooks/useScreenSize";
import useToggleTheme from "../CustomThemeProvider/CustomThemeProvider";
import { useTheme } from "@emotion/react";

const Navbar = ({ value }) => {
  const [showHomeLabel, setShowHomeLabel] = useState(false);
  const [showItemsLabel, setShowItemsLabel] = useState(false);
  const [showShopsLabel, setShowShopsLabel] = useState(false);
  const [showLocationsLabel, setShowLocationsLabel] = useState(false);
  const [showSettingsLabel, setShowSettingsLabel] = useState(false);


  const { profilePicture } = JSON.parse(localStorage.getItem("USER"));
  const theme = useTheme();
  const toggleTheme = useToggleTheme();

  const { isPhoneScreen, isTabletScreen } = useScreenSize();

  if (isPhoneScreen || isTabletScreen) {
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
  } else {
    return (
      <Paper sx={{ position: "fixed", top: 0, left: 0, right: 0, display: "flex", alignItems: "center", gap: 5, fontSize: "20px" }} elevation={5}>
        <Link href={localStorage.getItem("USER") ? "/home" : "/"} sx={{ textDecoration: "none" }}><AppIcon size="small" /></Link>
        <Link href="/items" sx={{ textDecoration: "none" }}><InventoryIcon sx={{ fontSize: "18px" }} /> Items</Link>
        <Link href="/shops" sx={{ textDecoration: "none" }}><StoreIcon sx={{ fontSize: "18px" }} /> Shops</Link>
        <Link href="/locations" sx={{ textDecoration: "none" }}><LocationOnIcon sx={{ fontSize: "18px" }} /> Locations</Link>
        <DesktopAddMenu />
        <Link href="/settings" sx={{ textDecoration: "none", position: "absolute", right: 0 }}><Avatar src={profilePicture} /></Link>
        <Button variant="text" onClick={toggleTheme} sx={{ position: "absolute", right: 35 }}>{theme.palette.mode == "light" ? <ModeNightIcon /> : <WbSunnyIcon />}</Button>
      </Paper>
    );
  }
};
export default Navbar;
