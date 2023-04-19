import {
  GoogleMap,
  LoadScript, MarkerF
} from "@react-google-maps/api";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findEventsThunk} from "../services/event-thunks";
import {findDistanceMatrix} from "../services/distance-matrix-service";
import EventMapMarker from "./EventMapMarker";
import {findLatAndLng} from "../services/google-maps-service";


function SearchResults({searchLocation}) {
  const { events } = useSelector(state => state.event);
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);

  async function findDistanceMatrices() {
    if (searchLocation !== '' && events !== undefined) {
      const results = await findDistanceMatrix(searchLocation, events.map(event => event.location));
      console.log(results);
      return results;
    }
  };

  // TODO: handle bad search location
  useEffect(() => {
    findDistanceMatrices().then(matrix => {
      console.log('search location: ' + searchLocation)
      const sortedResults = matrix.rows[0].elements.sort((a, b) => a.distance.value < b.distance.value);
      setSearchResults(sortedResults);
    });;
  }, [searchLocation]);

  useEffect(() => {
    dispatch(findEventsThunk());
  }, []);

  return (
      <>
      <h5>Search Results</h5>
  {searchResults.map(result =>
      <h3>Distance from {result.origin} to {result.destination}: {result.distance.value}</h3>
  )}
      </>
  );
}
export default SearchResults;