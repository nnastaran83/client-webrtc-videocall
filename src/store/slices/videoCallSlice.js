import { createSlice } from "@reduxjs/toolkit";

const videoCallSlice = createSlice({
  name: "videocall",

  initialState: {
    message: "",
  },

  reducers: {
    setMessage: (state, action) => {
      return { ...state, message: action.payload };
    },
  },
});

export const { setMessage } = videoCallSlice.actions;
export const videoCallReducer = videoCallSlice.reducer;
