import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./slices/loginSlice.js";
import {
  changePasswordVisibility,
  setUserName,
  setEmail,
  setPassword,
  setUser,
} from "./slices/loginSlice.js";

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export { store };
export {
  changePasswordVisibility,
  setUserName,
  setEmail,
  setPassword,
  setUser,
};
export * from "./thunks/signInUser.js";
