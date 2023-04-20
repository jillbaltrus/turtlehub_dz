import {api, cleanseInput} from "./google-maps-service";

const DISTANCE_MATRIX_URL = `https://api.distancematrix.ai/maps/api/distancematrix/json`;
export const DISTANCE_MATRIX_KEY = "upntcairZEy0iWwlwTKG9TxJlL5LL";

export const findDistanceMatrix = async (origin, destinations) => {
  const formattedOrigin = cleanseInput(origin);
  const formattedDestinations = destinations.map(d => cleanseInput(d));
  const destinationsString = formattedDestinations.join("%7c");
  const response = await api.get(`${DISTANCE_MATRIX_URL}?origins=${formattedOrigin}&destinations=${destinationsString}&units=imperial&key=${DISTANCE_MATRIX_KEY}`);
  return await response.data;
}