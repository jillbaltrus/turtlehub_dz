import NavBar from "../NavBar";
import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {findEventsThunk} from "../services/event-thunks";
import {useParams} from "react-router";

function EventDetails() {
  const { eid } = useParams();
  const { events, loading } = useSelector(state => state.event);
  const dispatch = useDispatch();
  const event = events.find(e => e._id === eid);

  useEffect(() => {
    dispatch(findEventsThunk());
  }, []);

  return (
      <div className="row">
        <NavBar active="events"/>
        <div className="col-8">
          {!loading &&
              <h1>
                {event.title}
              </h1>
          }
        </div>
      </div>
  );
}
export default EventDetails;