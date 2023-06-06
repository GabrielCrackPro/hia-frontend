/* eslint-disable no-unused-vars */
import React from "react";
import { AppBar, Toolbar, Box, IconButton } from "@mui/material/";
import useToggleTheme from "../CustomThemeProvider/CustomThemeProvider";
import { useTheme } from "@mui/material/styles";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import AppIcon from "../AppIcon/AppIcon";

const Titlebar = () => {
  const toggleTheme = useToggleTheme();
  const theme = useTheme();
  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense">
          {location.pathname !== "/" ? <AppIcon size="small" /> : ""}
          <IconButton
            disableRipple
            onClick={toggleTheme}
            sx={{ position: "absolute", right: 0 }}
          >
            {theme.palette.mode == "dark" ? <WbSunnyIcon /> : <ModeNightIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Titlebar;
