import {styled} from "@mui/material";

/**
 * Styled Frame component.
 * Changes the padding respectively to the screen size.
 */
const Frame = styled('div')(({theme}) => ({
    [theme.breakpoints.down('md')]: {
        padding: "1rem",
    },
    [theme.breakpoints.up('md')]: {
        padding: "2rem",
    },

}));


export default Frame;