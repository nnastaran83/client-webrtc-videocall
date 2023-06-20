import React, {Fragment, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    changePasswordVisibility,
    setPassword,
    setUserName,
    signInUser,
    store,
} from "../store";

import {getMessagingToken} from "../firebase/index.jsx";
import HeaderLogo from "./HeaderLogo.jsx";
import SignInForm from "./SignInForm.jsx";

/**
 * Login Page
 * @returns {JSX.Element}
 * @component
 */
const Login = () => {
    const dispatch = useDispatch();
    const showPassword = useSelector((state) => state.login.showPassword);
    const {password} = useSelector((state) => state.login);
    const fullNameRef = useRef();

    const emailRef = useRef();

    const handlePasswordInputChange = (event) => {
        dispatch(setPassword(event.target.value));
    };


    const handleClickShowPassword = () => {
        //dispatch the action to the store
        dispatch(changePasswordVisibility());
    };

    /**
     * Sign in the user + get the messaging token
     * @param event
     */
    const handleSignIn = (event) => {
        event.preventDefault();
        dispatch(setUserName(fullNameRef.current.value));
        dispatch(signInUser({email: emailRef.current.value, password: password}));
        getMessagingToken();

    };

    return (
        <Fragment>
            <HeaderLogo/>
            <SignInForm
                handleSignIn={handleSignIn}
                fullNameRef={fullNameRef}
                emailRef={emailRef}
                handleClickShowPassword={handleClickShowPassword}
                handlePasswordInputChange={handlePasswordInputChange}
                showPassword={showPassword}/>

        </Fragment>
    );
};

export default Login;
