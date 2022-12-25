/* eslint-disable no-unused-vars */
import React, { useContext, useState, useMemo } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const CustomThemeContext = React.createContext();

const darkTheme = {
  palette: {
    mode: "dark",
    primary: {
      main: "#fff"
    },
    secondary: {
      main: "#bbb"
    }
  }
};
const lightTheme = {
  palette: {
    mode: "light",
    primary: {
      main: "#56d"
    },
    secondary: {
      main: "#60d"
    }
  }
};

export function CustomThemeProvider ({ children }) {
  const [actualTheme, setActualTheme] = useState(localStorage.getItem("THEME"));
  function toggleTheme () {
    if (actualTheme == "light") {
      setActualTheme("dark");
      localStorage.setItem("THEME", "dark");
    } else {
      setActualTheme("light");
      localStorage.setItem("THEME", "light");
    }
  }

  const theme = useMemo(() => {
    if (actualTheme == "dark") {
      return createTheme(darkTheme);
    } else {
      return createTheme(lightTheme);
    }
  },
  [actualTheme],
  );

  return (
    <CustomThemeContext.Provider value={toggleTheme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CustomThemeContext.Provider>
  );
}

export default function useToggleTheme () {
  const context = useContext(CustomThemeContext);
  if (context === undefined) {
    throw new Error("useCustomThemeContext must be used within an CustomThemeProvider");
  }
  return context;
}
