/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Titlebar from "../../Titlebar/TitleBar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, Link, Typography } from "@mui/material";
import { postData } from "../../../utils";
import AppIcon from "../../AppIcon/AppIcon";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [displayname, setDisplayname] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("../../../img/default-profile-picture.png");

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleDisplaynameChange = (event) => {
    setDisplayname(event.target.value);
  };
  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newUser = {
      username,
      displayname,
      password,
      profilePicture,
      // eslint-disable-next-line camelcase
      created_at: new Date(),
      // eslint-disable-next-line camelcase
      updated_at: new Date()
    };
    (async () => {
      const response = await postData("http://127.0.0.1:3001/api/v1/users", newUser);
      if (response.message == "User created successfully") {
        location.pathname = "/";
      }
    })();

  };
  return (
    <>
      <Titlebar />
      <Box sx={{ marginTop: "10px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", }}>
        <AppIcon size="large" />
        <Typography variant="h4">Register</Typography>
        <form onSubmit={handleSubmit}>
          <TextField variant="filled" label="Username" fullWidth value={username} onChange={handleUsernameChange} sx={{ marginBottom: "10px" }} />
          <TextField variant="filled" label="Display Name" fullWidth value={displayname} onChange={handleDisplaynameChange} sx={{ marginBottom: "10px" }} />
          <FormControl variant="filled" fullWidth>
            <TextField
              label="Password"
              fullWidth
              value={password}
              onChange={handlePasswordChange}
              type={passwordVisible ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={handlePasswordVisibility}>{passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}</Button>
                  </InputAdornment>
                ),
              }}
              variant="filled"
            />
          </FormControl>
          <Button type="submit" variant="contained" fullWidth sx={{ marginTop: "10px" }}>Register</Button>
        </form>
        <Link href="/login" component="a" textAlign="center" underline="none" sx={{ padding: "3px", textTransform: "uppercase", marginTop: "15px", border: "1px solid currentcolor", width: "100%" }}>Login</Link>
      </Box>
    </>
  );
};
export default Register;
