import {FormControl, IconButton, Input, InputAdornment, InputLabel} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import React from "react";

/**
 * Password Input component
 * @param showPassword
 * @param handleClickShowPassword
 * @param handlePasswordInputChange
 * @returns {JSX.Element}
 * @constructor
 */
const PasswordInput = ({showPassword, handleClickShowPassword, handlePasswordInputChange}) => {

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <FormControl sx={{width: '100%'}} variant="standard" required>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
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
                onChange={handlePasswordInputChange}
            />

        </FormControl>
    );
};

export default PasswordInput;