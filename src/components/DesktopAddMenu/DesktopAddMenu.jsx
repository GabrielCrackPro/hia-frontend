/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

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
      <Button id="basic-button" aria-controls={open ? "add-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleMenuOpen} sx={{ textTransform: "revert" }}><AddIcon /> Add New</Button>
      <Menu id="add-menu" anchorEl={anchorEl} open={open} onClose={handleMenuClose} MenuListProps={{ "aria-labelledby": "basic-button" }}>
        <MenuItem onClick={() => handleMenuSelected("item")}>Item</MenuItem>
        <MenuItem onClick={() => handleMenuSelected("shop")}>Shop</MenuItem>
        <MenuItem onClick={() => handleMenuSelected("location")}>Location</MenuItem>
        <MenuItem onClick={() => handleMenuSelected("scan")}>Scan Item</MenuItem>
      </Menu>
    </>
  );
};

export default DesktopAddMenu;
