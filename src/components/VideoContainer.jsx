import React from "react";
import {Box, styled} from "@mui/material";

const VideoContainer = styled(Box)(({theme}) => ({
    width: "100%",
    textAlign: "center",

    [theme.breakpoints.up("md")]: {
        height: "100%",
        maxHeight: "100%",
    },
    [theme.breakpoints.down("md")]: {
        height: "49vh",
        maxHeight: "49vh",
    },
}));

export default VideoContainer;