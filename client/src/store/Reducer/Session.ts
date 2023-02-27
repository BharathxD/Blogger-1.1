import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface ISessionState {
  username: string;
  userId: string;
  isLoggedIn: boolean;
}

interface ISessionAction {
  userId: string;
  username: string;
}

const initialSessionState: ISessionState = {
  username: "",
  userId: "",
  isLoggedIn: false,
};

export const Session = createSlice({
  name: "Session",
  initialState: initialSessionState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    setUsername(state, action: PayloadAction<ISessionAction>) {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    },
  },
});
