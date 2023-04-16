import NavBar from "../NavBar";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {findEventsThunk} from "../services/event-thunks";
import EventCalendar from "../Calendar";

function Events() {
  const { events, loading } = useSelector(state => state.event);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findEventsThunk());
  }, []);

  return (
      <div className="row">
        <NavBar active="events"/>
        <div className="col-8">
          <h1>
            Events
          </h1>
          <EventCalendar></EventCalendar>
        </div>
      </div>
  );
}
export default Events;