import React, {useEffect, useState} from "react";
import {findUsersByEvent} from "../services/rsvps-service";
import MemberName from "../Members/MemberName";
import {useDispatch, useSelector} from "react-redux";
import {createRsvpThunk, deleteRsvpThunk} from "../services/rsvps-thunks";
import {Text, useToast} from "@chakra-ui/react";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";

function EventRsvps({event}) {
  const {currentUser} = useSelector((state) => state.user);
  const [rsvps, setRsvps] = useState([]);
  const [currentUserRsvped, setCurrentUserRsvped] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  async function getRsvps() {
    if (event) {
      return await findUsersByEvent(event._id).then(users => setRsvps(users));
    }
  }

  function rsvp() {
    dispatch(createRsvpThunk({user: currentUser._id, event: event._id}));
    toast({
      position: 'top',
      title: `RSVPed to ${event.title}`,
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    getRsvps();
  }

  function unrsvp() {
    dispatch(deleteRsvpThunk({eid: event._id, uid: currentUser._id}));
    toast({
      position: 'top',
      title: `RSVP removed for ${event.title}`,
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    getRsvps();
  }

  function goToLogin() {
    navigate('/login')
  }

  useEffect(() => {
    if (currentUser) {
      setCurrentUserRsvped(
          rsvps.map(rsvp => rsvp._id).includes(currentUser._id));
    }
  }, [currentUser, rsvps]);

  useEffect(() => {
    if (event) {
      getRsvps();
    }
  }, [event]);

  const rsvpButtons = () => {
    const eventDate = new Date(event.startDateTime);
    const currentDate = new Date();
    const futureEvent = eventDate > currentDate;
    if (!currentUser && futureEvent) {
      return (
          <div className="text-center mt-3">
            <Button onClick={goToLogin}>Log in to RSVP</Button>
          </div>);
    } else if (currentUser && currentUserRsvped && futureEvent) {
      return (
          <div className="text-center mt-3">
            <Button onClick={unrsvp}>Remove RSVP</Button>
          </div>
      );
    } else if (currentUser && !currentUserRsvped && futureEvent) {
      if (event.limitSignUps && rsvps.length >= event.maxParticipants) {
        return (
            <div className="text-center mt-3">
              <Text fontSize='xl' className="text-center mb-3">This event is at
                maximum capacity.</Text>
            </div>
        );
      }
      return (
          <div className="text-center mt-3">
            <Button onClick={rsvp}>RSVP</Button>
          </div>
      );

    }
  }

  return (
      <>
        <Text fontSize='4xl' className={"mb-0"}>Attendees:</Text>
        {rsvps && rsvps.length == 0 &&
            <Text fontSize='xl' className={"ms-3 mb-0"}>There are no RSVPs for
              this event.</Text>
        }
        <ul className="navigation-list-group rounded">
          {rsvps.sort((a, b) => a.lastName.localeCompare(b.lastName)).map(
              member => <MemberName key={member._id} member={member}/>)}
        </ul>
        {rsvpButtons()}
      </>
  );
}

export default EventRsvps;