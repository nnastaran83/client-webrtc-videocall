import {styled} from "@mui/material";
import {blue} from "@mui/material/colors";
import Button from "@mui/material/Button";

/**
 * Styled Blue Button
 * @type {StyledComponent<PropsOf<((props: ({href: string} & OverrideProps<ExtendButtonBaseTypeMap<ExtendButtonBaseTypeMap<{props: {children?: React.ReactNode, classes?: Partial<ButtonClasses>, color?: OverridableStringUnion<"inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning", ButtonPropsColorOverrides>, disabled?: boolean, disableElevation?: boolean, disableFocusRipple?: boolean, endIcon?: React.ReactNode, fullWidth?: boolean, href?: string, size?: OverridableStringUnion<"small" | "medium" | "large", ButtonPropsSizeOverrides>, startIcon?: React.ReactNode, sx?: SxProps<Theme>, variant?: OverridableStringUnion<"text" | "outlined" | "contained", ButtonPropsVariantOverrides>}, defaultComponent: "button"}>>, "a">)) => JSX.Element) & OverridableComponent<ExtendButtonBaseTypeMap<ExtendButtonBaseTypeMap<{props: {children?: React.ReactNode, classes?: Partial<ButtonClasses>, color?: OverridableStringUnion<"inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning", ButtonPropsColorOverrides>, disabled?: boolean, disableElevation?: boolean, disableFocusRipple?: boolean, endIcon?: React.ReactNode, fullWidth?: boolean, href?: string, size?: OverridableStringUnion<"small" | "medium" | "large", ButtonPropsSizeOverrides>, startIcon?: React.ReactNode, sx?: SxProps<Theme>, variant?: OverridableStringUnion<"text" | "outlined" | "contained", ButtonPropsVariantOverrides>}, defaultComponent: "button"}>>>> & MUIStyledCommonProps<Theme>, {}, {}>}
 */
const BlueButton = styled(Button)(({theme}) => ({
    color: theme.palette.getContrastText(blue["A400"]),
    backgroundColor: blue["A400"],
    "&:hover": {
        backgroundColor: blue["A700"],
    },
}));

export default BlueButton;
