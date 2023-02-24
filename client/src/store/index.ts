import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface ISessionState {
  isLoggedIn: boolean;
}

const initialSessionState: ISessionState = {
  isLoggedIn: false,
};

const Session = createSlice({
  name: "Session",
  initialState: initialSessionState,
  reducers: {
    login(state) {
      return { ...state, isLoggedIn: true };
    },
    logout(state) {
      return { ...state, isLoggedIn: false };
    },
  },
});

const store = configureStore({
  reducer: {
    Session: Session.reducer,
  },
});

export default store;
export const { login, logout } = Session.actions;
