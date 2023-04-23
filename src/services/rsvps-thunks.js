import {createAsyncThunk} from "@reduxjs/toolkit";
import * as rsvpsService from "./rsvps-service";

export const createRsvpThunk = createAsyncThunk(
    "rsvps/createRsvp", async (newRsvp) => {
      return await rsvpsService.createRsvp(newRsvp);
    }
);

export const deleteRsvpThunk = createAsyncThunk(
    "rsvps/deleteRsvp", async ({eid, uid}) => {

      return await rsvpsService.deleteRsvp(eid, uid);
    }
);