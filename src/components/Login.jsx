import React, { useEffect, useRef } from "react";
import { Box, Grid, TextField } from "@mui/material";
import Logo from "../assets/circular_logo.svg";
import ColorButton from "./themed_components/ColorButton.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  changePasswordVisibility,
  setEmail,
  setPassword,
  setUserName,
  signInUser,
  store,
} from "../store";
import PasswordInput from "./PasswordInput.jsx";
import { getMessagingToken } from "../firebase/index.jsx";

/**
 * Login Page
 * @returns {JSX.Element}
 * @component
 */
const Login = () => {
  const dispatch = useDispatch();
  const showPassword = useSelector((state) => state.login.showPassword);
  const { email, password, user } = useSelector((state) => state.login);
  const userNameRef = useRef();

  const handleEmailInputChange = (event) => {
    dispatch(setEmail(event.target.value));
  };

  const handlePasswordInputChange = (event) => {
    dispatch(setPassword(event.target.value));
  };

  const handleClickShowPassword = () => {
    //dispatch the action to the store
    dispatch(changePasswordVisibility());
  };

  //const onSignIn = (event) => {
  //  event.preventDefault();
  //  dispatch(signInUser({ email, password }));
  //  getMessagingToken();
  //};

  const handleSignIn = (event) => {
    event.preventDefault();
    dispatch(setUserName(userNameRef.current.value));
    dispatch(signInUser({ email, password }));
    getMessagingToken();
    console.log(store.getState());
  };

  return (
    <Box>
      {/*Welcome top bar*/}
      <Grid container rowSpacing={1}>
        <Grid item xs={6} md={6}>
          <h4 style={{ color: "#3a3939" }}>
            W&nbsp;e&nbsp;l&nbsp;c&nbsp;o&nbsp;m&nbsp;e&emsp;t&nbsp;o&emsp;
            <span
              style={{
                color: "#FF00B8",
                fontSize: "20px",
              }}
            >
              S
            </span>
            &nbsp;m&nbsp;a&nbsp;r&nbsp;t&nbsp;&nbsp;&nbsp;
            <span
              style={{
                color: "#11AA7C",
                fontSize: "20px",
              }}
            >
              C
            </span>
            &nbsp;a&nbsp;l&nbsp;l&nbsp;e&nbsp;e&nbsp;
          </h4>
        </Grid>
        <Grid item xs={6} md={6} sx={{ textAlign: "end" }}>
          <img src={Logo} alt="Logo" />
        </Grid>
      </Grid>

      {/* Sign in section*/}
      <form onSubmit={handleSignIn}>
        <Grid
          container
          rowSpacing={3}
          sx={{ marginTop: "5dvh", marginBottom: "10dvh" }}
        >
          {/*Name input*/}
          <Grid item xs={12}>
            <TextField
              required
              autoComplete={"name"}
              label="Full name"
              variant="standard"
              inputRef={userNameRef}
              style={{ width: "100%" }}
            />
          </Grid>

          {/*Email input*/}
          <Grid item xs={12}>
            <TextField
              required
              autoComplete="email"
              id="standard-required"
              label="Email"
              variant="standard"
              style={{ width: "100%" }}
              onChange={handleEmailInputChange}
              type="email"
            />
          </Grid>

          <Grid item xs={12}>
            <PasswordInput
              showPassword={showPassword}
              handleClickShowPassword={handleClickShowPassword}
              handlePasswordInputChange={handlePasswordInputChange}
            />
          </Grid>
        </Grid>

        {/*Sign in button*/}
        <ColorButton
          variant="contained"
          style={{ width: "100%" }}
          type={"submit"}
        >
          Sign in
        </ColorButton>
      </form>
    </Box>
  );
};

export default Login;
