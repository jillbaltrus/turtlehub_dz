import { createAsyncThunk } from "@reduxjs/toolkit";
import * as eventService from "./event-service";

export const createEventThunk = createAsyncThunk(
    "events/createEvent", async (newEvent) => {
      return await eventService.createEvent(newEvent);
    }
);

export const findEventsThunk = createAsyncThunk(
    "events/findEvents", async () => {
      return await eventService.findEvents();
    }
);