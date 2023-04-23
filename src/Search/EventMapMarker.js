import {MarkerF} from "@react-google-maps/api";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Center,
  useDisclosure
} from "@chakra-ui/react";
import moment from "moment/moment";
import {Button} from "react-bootstrap";
import {getCoordinates} from "./Map";

function EventMapMarker({event}) {
  const [location, setLocation] = useState({lat: 0, lng: 0});
  const {isOpen, onOpen, onClose} = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    getCoordinates(event.location).then(
        coordinates => setLocation(coordinates));
  }, [event]);

  const handleMarkerClick = () => {
    onOpen();
  };

  const handleDetailsClick = () => {
    navigate(`/details/${event._id}`);
  }

  if (new Date(event.startDateTime) < new Date()) {
    return;
  }

  return (
      <>
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'
                                 className={"mb-0 pb-0"}>
                {event.title}
              </AlertDialogHeader>
              <AlertDialogBody className={"mt-0 pt-0"}>
                {event.description}
                <br/>
                {moment(event.startDateTime).format('h:mm a')} - {moment(
                  event.endDateTime).format('h:mm a')}
                <br/>
                {moment(event.startDateTime).format('MM/DD/yy')}
              </AlertDialogBody>
              <Center>
                <AlertDialogFooter className={"mt-0 pt-0"}>
                  <Button size={"sm"} ref={cancelRef} onClick={onClose}>
                    Close
                  </Button>
                  <Button size={"sm"} onClick={handleDetailsClick} ml={3}>
                    Details
                  </Button>
                </AlertDialogFooter>
              </Center>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <MarkerF key={event._id}
                 position={location} name={event.title}
                 onClick={handleMarkerClick}>
        </MarkerF>
      </>
  );
}

export default EventMapMarker;