/* eslint-disable no-unused-vars */
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { postData } from "../../../utils";
import Titlebar from "../../Titlebar/TitleBar";
import LoginIcon from "@mui/icons-material/Login";
import AddIcon from "@mui/icons-material/Add";
import AppIcon from "../../AppIcon/AppIcon";
import { ZoomIn } from "../../Animation/Animation";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameLabel, setUsernameLabel] = useState("Username");
  const [passwordLabel, setPasswordLabel] = useState("Password");
  const [userInputError, setUserInputError] = useState(false);
  const [passwordInputError, setPasswordInputError] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUserInputError(false);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordInputError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      username,
      password
    };
    (
      async () => {
        const response = await postData("http://127.0.0.1:3001/api/v1/users/login", user);
        if (response.message == "User logged in successfully") {
          const userDB = response.user;
          localStorage.setItem("USER", JSON.stringify(userDB));
          location.pathname = "/home";
        } else if (username == "") {
          setUserInputError(true);
          setUsernameLabel("Incorrect Username");
          setTimeout(() => {
            setUserInputError(false);
            setUsernameLabel("Username");
          }, 1500);
        } if (password == "") {
          setPasswordInputError(true);
          setPasswordLabel("Incorrect Password");
          setTimeout(() => {
            setPasswordInputError(false);
            setPasswordLabel("Password");
          }, 1500);
        } if (username == "" && password == "") {
          setUserInputError(true);
          setPasswordInputError(true);

          setUsernameLabel("Incorrect Username");
          setPasswordLabel("Incorrect Password");

          setTimeout(() => {
            setUserInputError(false);
            setPasswordInputError(false);

            setUsernameLabel("Username");
            setPasswordLabel("Password");
          }, 1500);
        } if (response.message == "User does not exists") {
          setUserInputError(true);
          setPasswordInputError(true);
          setUsernameLabel("Incorrect Username");
          setPasswordLabel("Incorrect Password");
          setTimeout(() => {
            setUserInputError(false);
            setPasswordInputError(false);
            setUsernameLabel("Username");
            setPasswordLabel("Password");
          }, 1500);
        }
      })();
  };

  return (
    <>
      <Titlebar />
      <ZoomIn>
        <Box display="flex" flexDirection="column" marginTop="20px" alignItems="center" justifyContent="center">
          <AppIcon size="large" />
          <Typography variant="h5">Login</Typography>
          <form onSubmit={handleSubmit}>
            <TextField variant="filled" label={usernameLabel} fullWidth onChange={handleUsernameChange} error={userInputError} />
            <TextField variant="filled" label={passwordLabel} type="password" sx={{ marginTop: "15px" }} fullWidth onChange={handlePasswordChange} error={passwordInputError} />
            <Button variant="contained" type="submit" fullWidth sx={{ marginTop: "15px" }}><LoginIcon /> Login</Button>
            <Button type="button" href="/register" variant="outlined" fullWidth sx={{ marginTop: "10px" }}><AddIcon /> Create Account</Button>
          </form>
        </Box>
      </ZoomIn>
    </>
  );
};

export default Login;
