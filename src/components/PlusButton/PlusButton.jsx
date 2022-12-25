/* eslint-disable no-unused-vars */
import React from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const PlusButton = () => {
  const actions = [
    { icon: <InventoryIcon />, name: "Item" },
    { icon: <StoreIcon />, name: "Shop" },
    { icon: <LocationOnIcon />, name: "Location" },
    { icon: <CameraAltIcon />, name: "Scan Barcode" }
  ];

  const handleClick = (event) => {
    if (event.currentTarget.id == "CreateSpeedDial-action-0") {
      // Create Item
      window.location = window.location.protocol + "/new/item";
    } else if (event.currentTarget.id == "CreateSpeedDial-action-1") {
      // Create Shop
      window.location = window.location.protocol + "/new/shop";
    } else if (event.currentTarget.id == "CreateSpeedDial-action-2") {
      // Create Location
      window.location = window.location.protocol + "/new/location";
    }else if(event.currentTarget.id == "CreateSpeedDial-action-3"){
      // Scan Item
      window.location = window.location.protocol + "/scan";
    }
  };

  return (
    <SpeedDial transitionDuration={500} ariaLabel="Create SpeedDial" sx={{ position: "absolute", bottom: 100, right: 16 }} icon={<SpeedDialIcon sx={{ fontSize: "20px" }} />} openIcon={<CloseIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction key={action.name} id={action.name} icon={action.icon} tooltipTitle={action.name} onClick={handleClick} tooltipOpen />
      ))}
    </SpeedDial>
  );
};

export default PlusButton;
