import {createSlice} from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name: "login",
    initialState: {
        useName: "",
        email: "",
        password: "",
        logedIn: false
    },
    extraReducers(builder) {

    }
});