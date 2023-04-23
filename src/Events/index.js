import NavBar from "../NavBar";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {findEventsThunk} from "../services/event-thunks";
import EventCalendar from "../Calendar";
import {Divider} from "@chakra-ui/react";

function Events() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findEventsThunk());
  }, []);

  return (
      <div className="row">
        <NavBar active="events"/>
        <div className="col-8">
          <h1 className={"ps-2"}>
            All Events
          </h1>
          <Divider borderWidth={'2px'} borderColor={'#75bde0'}/>
          <EventCalendar></EventCalendar>
        </div>
      </div>
  );
}

export default Events;