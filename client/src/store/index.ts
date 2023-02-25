import { configureStore } from "@reduxjs/toolkit";
import { Session } from "./Reducer/Session";

const store = configureStore({
  reducer: {
    Session: Session.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
export const { login, logout, setUsername } = Session.actions;
