import axios from "axios";
import {findEventById} from "./event-service";
import {findUserById} from "./user-service";

const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const RSVPS_URL = `${SERVER_API_URL}/rsvps`;

const api = axios.create({withCredentials: true});

export const createRsvp = async (rsvp) => {
  const response = await api.post(`${RSVPS_URL}`, rsvp);
  const newRsvp = response.data;
  return newRsvp;
};

export const findUsersByEvent = async (eventId) => {
  const response = await api.get(`${RSVPS_URL}/users/${eventId}`);
  const userIds = response.data.map(rsvp => rsvp.user);
  const users = await Promise.all(
      userIds.map(async uid => await findUserById(uid)));
  return users;
};

export const findEventsByUser = async (userId) => {
  const response = await api.get(`${RSVPS_URL}/events/${userId}`);
  const eventIds = response.data.map(rsvp => rsvp.event);
  const events = await Promise.all(
      eventIds.map(async eid => await findEventById(eid)));
  return events;
};

export const deleteRsvp = async (eid, uid) => {
  const response = await api.delete(`${RSVPS_URL}/${eid}/${uid}`);
  return response.data;
};

export const deleteRsvpsForEvent = async (eid) => {
  const response = await api.delete(`${RSVPS_URL}/${eid}`);
  return response.data;
};