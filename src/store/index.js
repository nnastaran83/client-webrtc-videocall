import {configureStore} from "@reduxjs/toolkit";
import {loginPageReducer} from "./slices/loginPageSlice.js";
import {changePasswordVisibility} from "./slices/loginPageSlice.js";

const store = configureStore({
        reducer: {
            loginPage: loginPageReducer
        }
    }
);


export {store};
export {changePasswordVisibility};