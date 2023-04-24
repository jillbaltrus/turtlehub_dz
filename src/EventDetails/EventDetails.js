import {Divider, HStack, Text} from "@chakra-ui/react";
import {
  Calendar,
  Clock,
  GeoAlt,
  InfoCircle,
  People,
  Person
} from "react-bootstrap-icons";
import React, {useEffect, useState} from "react";
import {findUserById} from "../services/user-service";
import {Link} from "react-router-dom";

function EventDetails({event}) {
  const [createdBy, setCreatedBy] = useState(undefined);

  async function findCreatedByUserForEvent() {
    if (event) {
      return await findUserById(event.createdBy);
    }
  }

  useEffect(() => {
    if (event) {
      findCreatedByUserForEvent().then(user => setCreatedBy(user));
    }
  }, [event]);

  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const timeOptions = {timeZone: "EST", hour: 'numeric', minute: '2-digit'};

  return (
      <>
        <Text fontSize='5xl' className={"mb-0"}>Event Details</Text>
        <Divider borderWidth={'2px'} borderColor={'#75bde0'}/>
        <Text fontSize='4xl' fontWeight={'bold'}
              className={"mb-0"}>{event.title}</Text>
        <Text className={"ps-2"} fontSize='xl'>{event.description}</Text>
        <HStack className={"mt-0 mb-1 ms-1"}>
          <Calendar className="mb-1 mt-0" size={35}></Calendar>
          <Text fontSize='xl'>{new Date(
              event.startDateTime).toLocaleDateString("en-US",
              dateOptions)}</Text>
        </HStack>
        <HStack className="m-1">
          <Clock className="mb-1" size={35}></Clock>
          <Text fontSize='xl'>{new Date(
              event.startDateTime).toLocaleTimeString("en-US",
              timeOptions)} to {new Date(
              event.endDateTime).toLocaleTimeString("en-US",
              timeOptions)}</Text>
        </HStack>
        <HStack className={"m-1"}>
          <GeoAlt className="mb-1" size={35}></GeoAlt>
          <Text fontSize='xl'>{event.location}</Text>
        </HStack>
        <HStack className={"m-1"}>
          <People className="mb-1" size={35}></People>
          <Text fontSize='xl'>{event.limitSignUps
              ? `Maximum of ${event.maxParticipants} attendees`
              : "No maximum attendees"}</Text>
        </HStack>
        <HStack className={"m-1"}>
          <InfoCircle className="mb-1" size={35}></InfoCircle>
          <Text fontSize='xl'>{event.mandatory ? "Mandatory"
              : "Not mandatory"}</Text>
        </HStack>
        {createdBy &&
            <Link to={`/profile/${createdBy._id}`}>
              <HStack className={"m-1"}>
                <Person className="mb-1" size={35}></Person>
                <Text fontSize='xl'>Created
                  by {createdBy.firstName} {createdBy.lastName}</Text>
              </HStack>
            </Link>
        }
      </>
  );
}

export default EventDetails;