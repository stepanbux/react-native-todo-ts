/* eslint-disable indent */
import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: "main",
  initialState: {
    color: "#3949ab",
    todos: [],
    email: "",
    id: "",
  },
  reducers: {
    setColor(state, action) {
      state.color = action.payload;
    },
    setTodos(state, action) {
      state.todos = action.payload;
    },
    deleteTodos(state, action) {
      state.todos = action.payload;
    },
    setUser(state, action) {
      state.id = action.payload;
    },
  },
});

export const { setColor, setTodos, deleteTodos, setUser } = mainSlice.actions;
export default mainSlice.reducer;
