import {createSlice} from "@reduxjs/toolkit";
import {
  createEventThunk, findEventsThunk,
} from "../services/event-thunks";

export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';
export const FIND_EVENTS_FAILURE = 'FIND_EVENTS_FAILURE';

const eventSlice = createSlice({
  name: "event",
  initialState: { events: [], error: null, loading: false },
  reducers: {},
  extraReducers: {
    [createEventThunk.fulfilled]: (state, {payload}) => {
      state.loading = false;
      state.error = null;
      state.events.push(payload);
    },
    [createEventThunk.rejected]: (state) => {
      state.loading = false;
      state.error = CREATE_EVENT_FAILURE;
    },
    [findEventsThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.events = payload;
      state.error = null;
    },
    [findEventsThunk.rejected]: (state) => {
      state.error = FIND_EVENTS_FAILURE;
      state.loading = false;
    },
    [findEventsThunk.pending]: (state) => {
      state.loading = true;
      state.error = null;
    }
  },
});

export default eventSlice.reducer;