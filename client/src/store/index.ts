import {
  PayloadAction,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";

interface ISessionState {
  username: string;
  isLoggedIn: boolean;
}

interface ISessionAction {
  username: string;
}

const initialSessionState: ISessionState = {
  username: "",
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
    setUsername(state, action: PayloadAction<ISessionAction>) {
      return { ...state, username: action.payload.username };
    },
  },
});

const store = configureStore({
  reducer: {
    Session: Session.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
export const { login, logout, setUsername } = Session.actions;
