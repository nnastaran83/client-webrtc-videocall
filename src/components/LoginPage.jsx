import React from "react";
import {Box, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, TextField} from "@mui/material";
import Logo from "../assets/circular_logo.svg";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import ColorButton from './ColorButton.jsx';
import {useDispatch, useSelector} from "react-redux";
import {changePasswordVisibility} from "../store";


/**
 * Login Page
 * @returns {JSX.Element}
 * @constructor
 */
const LoginPage = () => {
    const dispatch = useDispatch();
    const showPassword = useSelector(state => state.loginPage.showPassword);


    const handleClickShowPassword = () => {
        //dispatch the action to the store
        dispatch(changePasswordVisibility());
    }


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <Box>
            <Grid container rowSpacing={1}>
                <Grid item xs={8}>
                    <h4 style={{color: "#3a3939"}}>
                        W&nbsp;e&nbsp;l&nbsp;c&nbsp;o&nbsp;m&nbsp;e&emsp;t&nbsp;o&emsp;<span
                        style={{
                            color: "#FF00B8",
                            fontSize: "20px"
                        }}>S</span>&nbsp;m&nbsp;a&nbsp;r&nbsp;t&nbsp;&nbsp;&nbsp;<span
                        style={{
                            color: "#11AA7C",
                            fontSize: "20px"
                        }}>C</span>&nbsp;a&nbsp;l&nbsp;l&nbsp;e&nbsp;e&nbsp;
                    </h4>
                </Grid>

                <Grid item xs={4} sx={{textAlign: "end"}}>
                    <img src={Logo} alt="Logo"/>
                </Grid>

            </Grid>

            <Grid container rowSpacing={3} sx={{marginTop: "5dvh", marginBottom: "10dvh"}}>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="standard-required"
                        label="Full name"
                        variant="standard"
                        style={{width: '100%'}}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        required
                        id="standard-required"
                        label="Phone Number"
                        variant="standard"
                        style={{width: '100%'}}
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControl sx={{width: '100%'}} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
            </Grid>

            <ColorButton variant="contained" style={{width: "100%"}}>Sign
                in</ColorButton>
        </Box>
    );
};

export default LoginPage;