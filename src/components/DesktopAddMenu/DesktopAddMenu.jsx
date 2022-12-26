/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const DesktopAddMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuSelected = (type) => {
    if (type != "scan") {
      window.location = window.location.protocol + `/new/${type}`;
    } else {
      window.location = window.location.protocol + `/${type}`;
    }
  };
  return (
    <>
      <Button id="basic-button" aria-controls={open ? "add-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleMenuOpen} sx={{ textTransform: "revert" }}><AddIcon />  Add New {anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</Button>
      <Menu id="add-menu" anchorEl={anchorEl} open={open} onClose={handleMenuClose} MenuListProps={{ "aria-labelledby": "basic-button" }}>
        <MenuItem onClick={() => handleMenuSelected("item")}><InventoryIcon sx={{ fontSize: "16px", padding: "2px" }} /> Item</MenuItem>
        <MenuItem onClick={() => handleMenuSelected("shop")}><StoreIcon sx={{ fontSize: "16px", padding: "2px" }} />  Shop</MenuItem>
        <MenuItem onClick={() => handleMenuSelected("location")}><LocationOnIcon sx={{ fontSize: "16px", padding: "2px" }} /> Location</MenuItem>
        <MenuItem onClick={() => handleMenuSelected("scan")}><CameraAltIcon sx={{ fontSize: "16px", padding: "2px" }} /> Scan Item</MenuItem>
      </Menu>
    </>
  );
};

export default DesktopAddMenu;
