/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { AppBar, Toolbar, Box, IconButton } from "@mui/material/";
import useToggleTheme from "../CustomThemeProvider/CustomThemeProvider";
import { useTheme } from "@mui/material/styles";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import SearchForm from "../SearchForm/SearchForm";
import AppIcon from "../AppIcon/AppIcon";

const Titlebar = () => {
  const [titlebarMode, setTitilebarMode] = useState("normal");
  const toggleTheme = useToggleTheme();
  const theme = useTheme();
  const toggleSearch = () => {
    if (titlebarMode == "normal") {
      setTitilebarMode("search");
    } else {
      setTitilebarMode("normal");
    }
  };
  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense" >
          {
            titlebarMode == "normal" ?
              <>
                {location.pathname !== "/" ? <AppIcon size="small" /> : ""}
                <IconButton onClick={toggleTheme} sx={{ position: "absolute", right: 0 }} >
                  {theme.palette.mode == "dark" ?
                    <WbSunnyIcon />
                    :
                    <ModeNightIcon />}
                </IconButton>
                {
                  localStorage.getItem("USER") ?
                    <IconButton onClick={toggleSearch} sx={{ position: "absolute", right: "30px" }}>
                      <SearchIcon />
                    </IconButton>
                    :
                    ""
                }
              </>
              :
              <Box display="flex">
                <SearchForm />
                <IconButton onClick={toggleSearch} sx={{ position: "absolute", right: 0 }}>
                  <CloseIcon />
                </IconButton>
              </Box>
          }

        </Toolbar>
      </AppBar>
    </Box>
  );
};


export default Titlebar;
