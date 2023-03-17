/* eslint-disable indent */
import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./slice";

const store = configureStore({
  reducer: {
    mainReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
