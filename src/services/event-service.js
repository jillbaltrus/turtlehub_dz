import axios from "axios";
import {deleteRsvpsForEvent} from "./rsvps-service";

const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const EVENTS_URL = `${SERVER_API_URL}/events`;

const api = axios.create({withCredentials: true});

export const createEvent = async (newEvent) => {
  const response = await api.post(`${EVENTS_URL}`, (newEvent));
  const event = response.data;
  return event;
};

export const findEventById = async (eid) => {
  const response = await api.get(`${EVENTS_URL}/${eid}`);
  const event = response.data;
  return event;
};

export const findEvents = async () => {
  const response = await api.get(`${EVENTS_URL}`);
  const events = response.data;
  return events;
};

export const deleteEvent = async (eid) => {
  const response = await api.delete(`${EVENTS_URL}/${eid}`);
  await deleteRsvpsForEvent(eid);
  return response.data;
};