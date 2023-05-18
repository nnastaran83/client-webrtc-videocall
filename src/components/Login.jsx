import React, {useEffect, useRef, useState} from "react";
import {Box, Button, Grid, TextField, ThemeProvider} from "@mui/material";
import Logo from "../assets/circular_logo.svg";
import CustomButton from "./themed_components/CustomButton.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
    changePasswordVisibility,
    setEmail,
    setPassword,
    setUserName,
    signInUser,
    store,
} from "../store";
import PasswordInput from "./PasswordInput.jsx";
import {getMessagingToken} from "../firebase/index.jsx";
import {blue} from "@mui/material/colors";

/**
 * Login Page
 * @returns {JSX.Element}
 * @component
 */
const Login = () => {
    const dispatch = useDispatch();
    const showPassword = useSelector((state) => state.login.showPassword);
    const {password} = useSelector((state) => state.login);
    const fullNameRef = useRef();
    const [fullNameError, setFullNameError] = useState(false);
    const emailRef = useRef();

    const handlePasswordInputChange = (event) => {
        dispatch(setPassword(event.target.value));
    };

    const handleClickShowPassword = () => {
        //dispatch the action to the store
        dispatch(changePasswordVisibility());
    };

    /**
     * Sign in the user + get the messaging token
     * @param event
     */
    const handleSignIn = (event) => {
        event.preventDefault();
        dispatch(setUserName(fullNameRef.current.value));
        dispatch(signInUser({email: emailRef.current.value, password: password}));
        getMessagingToken();
        console.log(store.getState());
    };

    return (
        <Box>
            {/*Welcome top bar*/}
            <Grid container rowSpacing={1}>
                <Grid item xs={6} sm={6} md={6} lg={6}>
                    <div style={{maxWidth: "100%"}}>
                        <h2 style={{color: "#3a3939"}}>
                            W&nbsp;e&nbsp;l&nbsp;c&nbsp;o&nbsp;m&nbsp;e&emsp;t&nbsp;o&emsp;
                            <span style={{color: "#FF00B8", fontSize: "25px"}}>S</span>
                            &nbsp;m&nbsp;a&nbsp;r&nbsp;t&nbsp;&nbsp;&nbsp;
                            <span style={{color: "#11AA7C", fontSize: "25px"}}>C</span>
                            &nbsp;a&nbsp;l&nbsp;l&nbsp;e&nbsp;e&nbsp;
                        </h2>
                    </div>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} sx={{textAlign: "end"}}>
                    <img src={Logo} alt="Logo" style={{maxWidth: "100%"}}/>
                </Grid>
            </Grid>

            {/* Sign in section*/}
            <Box component={"form"} onSubmit={handleSignIn}>
                <Grid
                    container
                    rowSpacing={3}
                    sx={{marginTop: "5dvh", marginBottom: "10dvh"}}
                >
                    {/*Name input*/}
                    <Grid item xs={12}>
                        <TextField
                            error={fullNameError}
                            required
                            autoComplete={"name"}
                            label="Full name"
                            variant="standard"
                            inputRef={fullNameRef}
                            style={{width: "100%"}}
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
                            style={{width: "100%"}}
                            inputRef={emailRef}
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

                <CustomButton
                    variant="contained"
                    style={{width: "100%"}}
                    type={"submit"}
                >
                    Sign in
                </CustomButton>
            </Box>
        </Box>
    );
};

export default Login;
