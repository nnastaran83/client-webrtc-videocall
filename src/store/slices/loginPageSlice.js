import {createSlice} from "@reduxjs/toolkit";


const loginPageSlice = createSlice({
    name: "loginPage",

    initialState: {
        showPassword: false
    },

    reducers: {
        /**
         * Changes the password visibility
         * @param state
         * @param action optional
         * @returns {*&{showPassword: boolean}}
         */
        changePasswordVisibility(state, action) {
            return {...state, showPassword: !state.showPassword}
        }
    }
});


export const {changePasswordVisibility} = loginPageSlice.actions;
export const loginPageReducer = loginPageSlice.reducer;