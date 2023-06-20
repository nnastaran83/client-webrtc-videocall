import React from "react";
import {Grid} from "@mui/material";
import Logo from "../assets/circular_logo.svg";

/**
 * Header Logo
 * @returns {JSX.Element}
 * @constructor
 */
const HeaderLogo = () => {
    return (
        <Grid container rowSpacing={1}>
            <Grid item xs={8} sm={6} md={6} lg={6}>
                <h3 style={{color: "#3a3939"}}>
                    W&nbsp;e&nbsp;l&nbsp;c&nbsp;o&nbsp;m&nbsp;e&nbsp;&nbsp;&nbsp;t&nbsp;o&emsp;
                    <span style={{color: "#FF00B8", fontSize: "25px"}}>S</span>
                    &nbsp;m&nbsp;a&nbsp;r&nbsp;t&nbsp;&nbsp;&nbsp;
                    <span style={{color: "#11AA7C", fontSize: "25px"}}>C</span>
                    &nbsp;a&nbsp;l&nbsp;l&nbsp;e&nbsp;e&nbsp;
                </h3>
            </Grid>
            <Grid item xs={4} sm={6} md={6} lg={6}
                  sx={{justifyContent: "center", textAlign: "end"}}>
                <img src={Logo} alt="Logo" style={{maxWidth: "100%"}}/>
            </Grid>
        </Grid>
    );
};

export default HeaderLogo;