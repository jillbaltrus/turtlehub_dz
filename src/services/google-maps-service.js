import axios from "axios";

const GOOGLE_API_URL = "https://maps.googleapis.com/maps/api";
const GEOCODE_URL = `${GOOGLE_API_URL}/geocode/json`;
export const GOOGLE_MAPS_KEY = "AIzaSyD4LosoXY1tPdu2HT5oPs_wvE8WkKi6ErY";

export const api = axios.create();

export const cleanseInput = (input) => {
  return input.replace(" ", "%20").replace(",", "%2c").replace("\"", "%22").replace("#", "%23");
}

export const findLatAndLng = async (location) => {
  const formattedLocation = cleanseInput(location);
  const response = await api.get(
      `${GEOCODE_URL}?address=${formattedLocation}&key=${GOOGLE_MAPS_KEY}`
  );
  const json = await response.data;
  return json.results[0].geometry.location;
};