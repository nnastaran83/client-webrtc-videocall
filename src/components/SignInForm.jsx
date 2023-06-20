import React from "react";
import {Box, Grid, TextField} from "@mui/material";
import PasswordInput from "./PasswordInput.jsx";
import BlueButton from "./buttons/BlueButton.jsx";

/**
 * Sign In Form component
 * @param handleSignIn
 * @param fullNameError
 * @param fullNameRef
 * @param emailRef
 * @param handleClickShowPassword
 * @param handlePasswordInputChange
 * @param showPassword
 * @returns {JSX.Element}
 * @constructor
 */
const SignInForm = ({
                        handleSignIn,
                        fullNameError,
                        fullNameRef,
                        emailRef,
                        handleClickShowPassword,
                        handlePasswordInputChange,
                        showPassword
                    }) => {

    return (
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

            <BlueButton
                variant="contained"
                style={{width: "100%", marginTop: "2rem"}}
                type={"submit"}
            >
                Sign in
            </BlueButton>
        </Box>
    );
};

export default SignInForm;