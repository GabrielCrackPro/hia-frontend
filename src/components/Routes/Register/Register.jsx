/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Titlebar from "../../Titlebar/TitleBar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AddIcon from "@mui/icons-material/Add";
import LoginIcon from "@mui/icons-material/Login";
import AppIcon from "../../AppIcon/AppIcon";
import { Button, Typography, Box } from "@mui/material";
import { postData } from "../../../utils";
import { ZoomIn } from "../../Animation/Animation";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [displayname, setDisplayname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [profilePicture, setProfilePicture] = useState(
    "../../../img/default-profile-picture.png"
  );

  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handlePasswordConfirmVisibility = () => {
    setPasswordConfirmVisible(!passwordConfirmVisible);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  };
  const handleDisplaynameChange = (event) => {
    setDisplayname(event.target.value);
  };
  const handleProfilePictureChange = (event) => {
    setProfilePicture(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== passwordConfirm) {
      return;
    }
    const newUser = {
      username,
      displayname,
      password,
      profilePicture,
      // eslint-disable-next-line camelcase
      created_at: new Date(),
      // eslint-disable-next-line camelcase
      updated_at: new Date(),
    };
    (async () => {
      const response = await postData("users", newUser);
      if (response.message == "User created successfully") {
        location.pathname = "/";
      }
    })();
  };
  return (
    <>
      <Titlebar />
      <ZoomIn>
        <Box
          sx={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppIcon size="large" />
          <Typography variant="h4">Create Account</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              variant="filled"
              label="Username"
              fullWidth
              value={username}
              onChange={handleUsernameChange}
              sx={{ marginBottom: "10px" }}
            />
            <TextField
              variant="filled"
              label="Display Name"
              fullWidth
              value={displayname}
              onChange={handleDisplaynameChange}
              sx={{ marginBottom: "10px" }}
            />
            <FormControl variant="filled" fullWidth>
              <TextField
                label="Password"
                fullWidth
                value={password}
                onChange={handlePasswordChange}
                type={passwordVisible ? "text" : "password"}
                sx={{ marginBottom: "10px" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button onClick={handlePasswordVisibility}>
                        {passwordVisible ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </Button>
                    </InputAdornment>
                  ),
                }}
                variant="filled"
              />
              <TextField
                label="Confirm password"
                fullWidth
                value={passwordConfirm}
                onChange={handlePasswordConfirmChange}
                type={passwordConfirmVisible ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button onClick={handlePasswordConfirmVisibility}>
                        {passwordConfirmVisible ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </Button>
                    </InputAdornment>
                  ),
                }}
                variant="filled"
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: "10px" }}
            >
              <AddIcon /> Create Account
            </Button>
            <Button
              type="button"
              href="/"
              variant="outlined"
              fullWidth
              sx={{ marginTop: "10px" }}
            >
              <LoginIcon /> Login
            </Button>
          </form>
        </Box>
      </ZoomIn>
    </>
  );
};
export default Register;
