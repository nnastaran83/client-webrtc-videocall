import React, {Fragment, useState} from "react";
import StyledMenu from "./StyledMenu.jsx";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import {IconButton} from "@mui/material";
import {signOut} from "firebase/auth";
import {auth} from "../firebase/index.jsx";

/**
 * Dropdown Menu component
 * @param handlePreSignOut
 * @returns {JSX.Element}
 * @constructor
 */
function DropdownMenu({handlePreSignOut}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSignOut = async (event) => {
        setAnchorEl(null);
        handlePreSignOut();
        await signOut(auth);
    };

    return (
        <Fragment>
            <IconButton
                id="demo-customized-button"
                aria-controls={open ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="contained"
                onClick={handleClick}
                style={{color: "#ffffff"}}
            >
                <MoreVertIcon/>
            </IconButton>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleSignOut} disableRipple>
                    <LogoutIcon/>
                    Log out
                </MenuItem>
            </StyledMenu>
        </Fragment>
    );
}

export default DropdownMenu;
