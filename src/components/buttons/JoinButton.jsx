import React, {useState} from 'react';
import Button from "@mui/material/Button";
import {styled} from "@mui/material";

const JoinButton = styled(Button)(({theme, bgcolor, hovercolor}) => ({
    backgroundColor: bgcolor,
    width: "50px",
    height: "50px",
    borderRadius: "40px",
    "&:hover": {
        backgroundColor: hovercolor,
    },
}));

const RedGreenButton = () => {
    const [isGreen, setIsGreen] = useState(false);

    const toggleColor = () => {
        setIsGreen(!isGreen);

    }

    return (
        <JoinButton
            bgcolor={isGreen ? "#00FF00" : "#FF0000"}
            hovercolor={isGreen ? "#009900" : "#930000"}
            onClick={toggleColor}
        />
    );
}

export default JoinButton;