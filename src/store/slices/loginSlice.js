import { createSlice } from "@reduxjs/toolkit";
import { signInUser } from "../thunks/signInUser.js";

const loginSlice = createSlice({
  name: "login",

  initialState: {
    userName: "",
    email: "",
    password: "",
    showPassword: false,
    isLoading: false,
    error: null,
    user: null,
  },

  reducers: {
    setUserName: (state, action) => {
      return { ...state, userName: action.payload };
    },

    setEmail: (state, action) => {
      return { ...state, email: action.payload };
    },

    setPassword: (state, action) => {
      return { ...state, password: action.payload };
    },

    changePasswordVisibility: (state) => {
      return { ...state, showPassword: !state.showPassword };
    },

    setUser(state, action) {
      return { ...state, user: action.payload };
    },
  },

  extraReducers(builder) {
    builder.addCase(signInUser.pending, (state, action) => {
      return { ...state, isLoading: true };
    });

    builder.addCase(signInUser.fulfilled, (state, action) => {
      return { ...state, isLoading: false, user: action.payload };
    });

    builder.addCase(signInUser.rejected, (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    });
  },
});

export const {
  changePasswordVisibility,
  setUserName,
  setEmail,
  setPassword,
  setUser,
} = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
