import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./slices/loginSlice.js";
import {
  changePasswordVisibility,
  setUserName,
  setEmail,
  setPassword,
  setUser,
} from "./slices/loginSlice.js";
import { videoCallReducer } from "./slices/videoCallSlice.js";
import { setMessage } from "./slices/videoCallSlice.js";

const store = configureStore({
  reducer: {
    login: loginReducer,
    videocall: videoCallReducer,
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
export { setMessage };
export * from "./thunks/signInUser.js";
