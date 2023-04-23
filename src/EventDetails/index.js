import NavBar from "../NavBar";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteEventThunk, findEventsThunk} from "../services/event-thunks";
import {useNavigate, useParams} from "react-router";
import EventDetails from "./EventDetails";
import EventRsvps from "./EventRsvps";
import {Button} from "react-bootstrap";
import {Divider, useToast} from "@chakra-ui/react";
import EventPointAttributes from "./EventPointAttributes";

function EventDetailsPage() {
  const {eid} = useParams();
  const {currentUser} = useSelector((state) => state.user);
  const {events} = useSelector(state => state.event);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [event, setEvent] = useState(undefined);

  useEffect(() => {
    dispatch(findEventsThunk());
    setEvent(events.find(e => e._id === eid));

  }, [events]);

  const handleDeleteEvent = () => {
    dispatch(deleteEventThunk(event._id));
    navigate("/events");
    toast({
      position: 'top',
      title: `${event.title} has been deleted`,
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  }

  return (
      <div className="row">
        <NavBar active="events"/>
        <div className="col-8 mb-4">
          {event &&
              <>
                <EventDetails event={event}/>
                <Divider borderWidth={'2px'} borderColor={'#75bde0'}/>
                <EventPointAttributes event={event}/>
                <Divider borderWidth={'2px'} borderColor={'#75bde0'}/>
                <EventRsvps event={event}/>
                {currentUser && currentUser.admin &&
                    <div className="text-center mb-4">
                      <Button onClick={handleDeleteEvent}>Delete Event</Button>
                    </div>
                }
              </>
          }
        </div>
      </div>
  );
}

export default EventDetailsPage;