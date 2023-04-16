import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./user-reducer";

const store = configureStore({
  reducer: {
    user: usersReducer,
  },
});

export default store;