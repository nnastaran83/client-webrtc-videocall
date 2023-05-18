import { Button, createTheme, styled } from "@mui/material";
import { blue } from "@mui/material/colors";

/**
 * Styled button
 */

const CustomButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(blue["A400"]),
  backgroundColor: blue["A400"],
  "&:hover": {
    backgroundColor: blue["A700"],
  },
}));

export default CustomButton;
