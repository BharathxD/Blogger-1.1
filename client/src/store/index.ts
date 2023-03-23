import { configureStore } from "@reduxjs/toolkit";
import Session from "./Reducer/Session";

const store = configureStore({
  reducer: {
    Session: Session.reducer,
  },
});

export const { login, logout, setUser } = Session.actions;
export type RootState = ReturnType<typeof store.getState>;
export default store;
