/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Routes/Home/Home";
import Items from "./components/Routes/Items/Items";
import Shops from "./components/Routes/Shops/Shops";
import Settings from "./components/Routes/Settings/Settings";
import Locations from "./components/Routes/Locations/Locations";
import CreateForm from "./components/CreateForm/CreateForm";
import { createTheme } from "@mui/material/styles";
import Login from "./components/Routes/Login/Login";
import Register from "./components/Routes/Register/Register";
import Scan from "./components/Routes/Scan/Scan";
import Actions from "./components/Routes/Actions/Actions";
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
  },
});

// eslint-disable-next-line space-before-function-paren
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/items" element={<Items />} />
      <Route path="/shops" element={<Shops />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/actions" element={<Actions />} />
      <Route path="/new/:type" element={<CreateForm />} />
      <Route path="/edit/:type/:id" element={<CreateForm />} />
      <Route path="/scan" element={<Scan />} />
    </Routes>
  );
}

export default App;
