import React, {useState} from 'react';
import Button from "@mui/material/Button";
import {styled} from "@mui/material";

/**
 * Styled Join Call Button
 * @type {StyledComponent<PropsOf<((props: ({href: string} & OverrideProps<ExtendButtonBaseTypeMap<ExtendButtonBaseTypeMap<{props: {children?: React.ReactNode, classes?: Partial<ButtonClasses>, color?: OverridableStringUnion<"inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning", ButtonPropsColorOverrides>, disabled?: boolean, disableElevation?: boolean, disableFocusRipple?: boolean, endIcon?: React.ReactNode, fullWidth?: boolean, href?: string, size?: OverridableStringUnion<"small" | "medium" | "large", ButtonPropsSizeOverrides>, startIcon?: React.ReactNode, sx?: SxProps<Theme>, variant?: OverridableStringUnion<"text" | "outlined" | "contained", ButtonPropsVariantOverrides>}, defaultComponent: "button"}>>, "a">)) => JSX.Element) & OverridableComponent<ExtendButtonBaseTypeMap<ExtendButtonBaseTypeMap<{props: {children?: React.ReactNode, classes?: Partial<ButtonClasses>, color?: OverridableStringUnion<"inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning", ButtonPropsColorOverrides>, disabled?: boolean, disableElevation?: boolean, disableFocusRipple?: boolean, endIcon?: React.ReactNode, fullWidth?: boolean, href?: string, size?: OverridableStringUnion<"small" | "medium" | "large", ButtonPropsSizeOverrides>, startIcon?: React.ReactNode, sx?: SxProps<Theme>, variant?: OverridableStringUnion<"text" | "outlined" | "contained", ButtonPropsVariantOverrides>}, defaultComponent: "button"}>>>> & MUIStyledCommonProps<Theme>, {}, {}>}
 */
const JoinButton = styled(Button)(({theme, bgcolor, hovercolor}) => ({
    backgroundColor: bgcolor,
    width: "50px",
    height: "50px",
    borderRadius: "40px",
    "&:hover": {
        backgroundColor: hovercolor,
    },
}));


export default JoinButton;