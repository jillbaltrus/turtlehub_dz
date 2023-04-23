import {configureStore} from "@reduxjs/toolkit";
import usersReducer from "./user-reducer";
import eventsReducer from "./event-reducer";

const store = configureStore({
  reducer: {
    user: usersReducer,
    event: eventsReducer
  },
});

export default store;