import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {findEventsThunk} from "../services/event-thunks";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay, Center,
  useDisclosure,
} from "@chakra-ui/react";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";

const localizer = momentLocalizer(moment);

function EventCalendar() {
  const { events } = useSelector(state => state.event);
  const dispatch = useDispatch();
  const cancelRef = useRef();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState({title: "",
  _id: "", description: "", startDateTime: new Date(), endDateTime: new Date()});

  useEffect(() => {
    dispatch(findEventsThunk());
  }, []);

  const selectEvent = (s) => {
    setSelectedEvent(s);
    onOpen();
    console.log(s);
  }

  const handleDetailsClick = () => {
    navigate(`/events/${selectedEvent._id}`);
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
              <AlertDialogHeader fontSize='lg' fontWeight='bold' className={"mb-0 pb-0"}>
                {selectedEvent.title}
              </AlertDialogHeader>
              <AlertDialogBody  className={"mt-0 pt-0"}>
                {selectedEvent.description}
                <br/>
                {moment(selectedEvent.startDateTime).format('h:mm a')} to {moment(selectedEvent.endDateTime).format('h:mm a')}
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
      <div>
        <div style={{ height: '500pt'}}>
          <Calendar
              events={events}
              startAccessor="startDateTime"
              endAccessor="endDateTime"
              defaultDate={moment().toDate()}
              localizer={localizer}
              popup={true}
              onSelectEvent={(s) => selectEvent(s)}
              tooltipAccessor={(e) => e.title}
          />
        </div>
      </div>
      </>
  );
}

export default EventCalendar;