import {configureStore} from "@reduxjs/toolkit";
import {loginPageReducer} from "./slices/loginPageSlice.js";
import {changePasswordVisibility, setUserName, setEmail, setPassword} from "./slices/loginPageSlice.js";

const store = configureStore({
        reducer: {
            loginPage: loginPageReducer
        }
    }
);


export {store};
export {changePasswordVisibility, setUserName, setEmail, setPassword};
export * from './thunks/signInUser.js';