import React from "react";
import {Box, styled} from "@mui/material";

const VideoItem = styled(Box)(({theme}) => ({
    objectFit: "cover",
    borderRadius: 5,
    width: "100%",
    height: "100vh",
    maxHeight: "100%",
    maxWidth: "100%",
    backgroundColor: "#0A0A0A",
}));

export default VideoItem;