import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {findEventsThunk} from "../services/event-thunks";
import {findDistanceMatrix} from "../services/distance-matrix-service";
import {useNavigate} from "react-router";
import {Text} from "@chakra-ui/react";
import SearchResultEvent from "./SearchResultEvent";

function SearchResults({searchLocation}) {
  const {events} = useSelector(state => state.event);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);

  async function findDistanceMatrices() {
    if (searchLocation !== '' && upcomingEvents !== []) {
      const results = await findDistanceMatrix(searchLocation,
          upcomingEvents.map(event => event.location));
      return results;
    }
  }

  function assignDistancesToEvents(distanceMatrixResults) {
    const eventsWithDistances = upcomingEvents.map(event => {
      const resultForEvent = distanceMatrixResults.find(dmr =>
          dmr.destination === event.location);
      if (resultForEvent && resultForEvent.distance) {
        return {...event, distance: resultForEvent.distance.value};
      } else {
        return {...event, distance: Infinity}
      }
    });
    const sortedEventsWithDistances = eventsWithDistances.sort(
        (a, b) => a.distance - b.distance);
    setSearchResults(sortedEventsWithDistances);
  }

  useEffect(() => {
    findDistanceMatrices().then(matrix => {
      if (matrix && matrix.rows[0]) {
        assignDistancesToEvents(matrix.rows[0].elements);
      }
    });
  }, [searchLocation]);

  useEffect(() => {
    dispatch(findEventsThunk());
    const futureEvents = events.filter(event => {
      const eventDate = new Date(event.startDateTime);
      const currentDate = new Date();
      return eventDate > currentDate;
    });
    setUpcomingEvents(futureEvents);
    findDistanceMatrices().then(matrix => {
      if (matrix && matrix.rows[0]) {
        assignDistancesToEvents(matrix.rows[0].elements);
      }
    });
  }, []);

  return (
      <>
        <Text fontWeight={'bold'} fontSize={'3xl'}>Upcoming events near
          you:</Text>
        <div className={"m-3 mb-4"}>
          {(searchResults.length === 0) &&
              <Text fontSize={"2xl"}>No search results.</Text>}
          <ul className="navigation-list-group rounded p-0 m-3">
            {searchResults.map(
                result => <SearchResultEvent key={result._id}
                                             result={result}/>)}
          </ul>
        </div>
      </>
  );
}

export default SearchResults;