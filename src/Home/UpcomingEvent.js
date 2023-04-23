import React from "react";
import {HStack, Text} from "@chakra-ui/react";
import {Calendar, Clock, GeoAlt} from "react-bootstrap-icons";
import {Link} from "react-router-dom";

function UpcomingEvent({event}) {
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const timeOptions = {timeZone: "EST", hour: 'numeric', minute: '2-digit'};

  return (
      <Link to={`/details/${event._id}`}
            className="list-group-item sand-border width-100p m-0">
        <HStack className="list-group-item width-100p m-0 p-3">
          <div>
            <HStack className={"mb-0 pb-0"}>
              <Text fontWeight={"bold"} fontSize='22px'>{event.title}</Text>
            </HStack>
            <HStack className={"mt-0 mb-1"}>
              <Calendar className="mb-1 mt-0" size={25}></Calendar>
              <Text fontSize='18px'>{new Date(
                  event.startDateTime).toLocaleDateString("en-US",
                  dateOptions)}</Text>
            </HStack>
            <HStack className="mb-1">
              <Clock className="mb-1" size={25}></Clock>
              <Text fontSize='18px'>{new Date(
                  event.startDateTime).toLocaleTimeString("en-US",
                  timeOptions)} to {new Date(
                  event.endDateTime).toLocaleTimeString("en-US",
                  timeOptions)}</Text>
            </HStack>
            <HStack className={"mb-1"}>
              <GeoAlt className="mb-1" size={25}></GeoAlt>
              <Text fontSize='18px'>{event.location}</Text>
            </HStack>
          </div>
        </HStack>
      </Link>
  )
}

export default UpcomingEvent;