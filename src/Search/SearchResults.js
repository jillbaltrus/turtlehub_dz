import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findEventsThunk} from "../services/event-thunks";
import {findDistanceMatrix} from "../services/distance-matrix-service";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";

function SearchResults({searchLocation}) {
  const {events} = useSelector(state => state.event);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);

  async function findDistanceMatrices() {
    if (searchLocation !== '' && events !== undefined) {
      const results = await findDistanceMatrix(searchLocation,
          events.map(event => event.location));
      return results;
    }
  }

  function assignDistancesToEvents(distanceMatrixResults) {
    const eventsWithDistances = events.map(event => {
      const resultForEvent = distanceMatrixResults.find(dmr =>
          dmr.destination === event.location);
      if (resultForEvent) {
        return {...event, distance: resultForEvent.distance.value};
      } else {
        return {...event, distance: Infinity}
      }
    });
    const sortedEventsWithDistances = eventsWithDistances.sort((a, b) => a.distance - b.distance);
    setSearchResults(sortedEventsWithDistances);
  }

  function feetToMiles(ft) {
    return parseFloat((ft / 5280).toFixed(3));
  }

  function handleOnClick(eventId) {
    navigate(`/events/${eventId}`);
  }

  // TODO: handle bad search location
  useEffect(() => {
    findDistanceMatrices().then(matrix => {
      if (matrix) {
        assignDistancesToEvents(matrix.rows[0].elements);
      }
    });
  }, [searchLocation]);

  useEffect(() => {
    dispatch(findEventsThunk());
  }, []);

  return (
      <>
        <h5>Search Results</h5>
        {(searchResults.length === 0) &&
            <h6>No search results.</h6>}
        {searchResults.map(result =>
            <div key={result._id}>
              <h3>{result.title}</h3>
              <h4>{feetToMiles(result.distance)} miles away</h4>
              <Button onClick={() => handleOnClick(result._id)}>See
                Details</Button>
              </div>
        )}
      </>
  );
}

export default SearchResults;