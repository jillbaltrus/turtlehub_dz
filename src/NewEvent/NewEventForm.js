import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {createEventThunk} from "../services/event-thunks";
import {CREATE_EVENT_FAILURE} from "../reducers/event-reducer";
import {useNavigate} from "react-router";
import {useToast} from "@chakra-ui/react";

function NewEventForm() {
  const {currentUser} = useSelector((state) => state.user);
  const {error} = useSelector((state) => state.event);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [enableCommunityServiceHours, setEnableCommunityServiceHours] = useState(
      false);
  const [enableMaxParticipants, setEnableMaxParticipants] = useState(false);
  const [enableButton, setEnableButton] = useState(true);
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState();
  const [startTime, setStartTime] = useState();
  const [endDate, setEndDate] = useState();
  const [endTime, setEndTime] = useState();
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState([]);
  const [communityServiceHours, setCommunityServiceHours] = useState(0);
  const [maxParticipants, setMaxParticipants] = useState();
  const [mandatory, setMandatory] = useState(false);

  const handlePointClicked = (point) => {
    if (points.includes(point)) {
      setPoints(points.filter(p => p !== point));
    } else {
      setPoints(points.concat(point));
    }
  }

  const handleCsSwitched = () => {
    setEnableCommunityServiceHours(!enableCommunityServiceHours);
    handlePointClicked("CS");
  }

  const doToast = () => {
    if (error === CREATE_EVENT_FAILURE) {
      toast({
        position: 'top',
        title: 'Something went wrong',
        description: 'Sorry, this event cannot be created.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else {
      navigate('/events');
      toast({
        position: 'top',
        title: 'Event successfully created',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async () => {
    const event = {
      "title": title,
      "startDateTime": moment(startDate + ' ' + startTime, "YYYY-MM-DD HH:mm"),
      "endDateTime": moment(endDate + ' ' + endTime, "YYYY-MM-DD HH:mm"),
      "location": location,
      "description": description,
      "mandatory": mandatory,
      "points": points,
      "limitSignUps": enableMaxParticipants,
      "maxParticipants": maxParticipants,
      "communityServiceHours": communityServiceHours,
      "createdBy": currentUser._id,
    }
    await dispatch(createEventThunk(event));
    doToast();
  };

  useEffect(() => {
    setEnableButton(title.length > 0 && startDate !== null
        && endDate !== null);
  }, [title, startDate, endDate]);

  return (
      <>
        <div className="form-group mb-1">
          <label htmlFor="title-input" className="form-label">
            Title:
          </label>
          <input className="form-control" id="title-input"
                 placeholder="My new event!" title="Enter event title"
                 type="text"
                 onChange={(event) => setTitle(event.target.value)}/>
        </div>

        <div className="form-group mb-1">
          <label htmlFor="start-date-input" className="form-label">
            Start Date:
          </label>
          <input type="date" className="form-control"
                 onChange={(event) => setStartDate(event.target.value)}
                 id="start-date-input"/>
        </div>

        <div className="form-group mb-1">
          <label htmlFor="start-time-input" className="form-label">
            Start Time:
          </label>
          <input type="time" className="form-control"
                 id="start-time-input"
                 onChange={(event) => setStartTime(event.target.value)}/>
        </div>

        <div className="form-group mb-1">
          <label htmlFor="end-date-input" className="form-label">
            End Date:
          </label>
          <input type="date" className="form-control"
                 id="end-date-input"
                 onChange={(event) => setEndDate(event.target.value)}/>
        </div>

        <div className="form-group mb-1">
          <label htmlFor="end-time-input" className="form-label">
            End Time:
          </label>
          <input type="time" className="form-control"
                 id="end-time-input"
                 onChange={(event) => setEndTime(event.target.value)}/>
        </div>

        <div className="form-group mb-1">
          <label htmlFor="location-input" className="form-label">
            Location:
          </label>
          <input className="form-control" id="location-input"
                 placeholder="123 Huntington ave, Boston, MA"
                 title="Enter location"
                 type="text"
                 onChange={(event) => setLocation(event.target.value)}/>
        </div>

        <div className="form-check form-switch form-control-lg pb-0">
          <input className="form-check-input custom-switches" type="checkbox"
                 role="switch"
                 id="mandatory-switch"
                 onChange={() => setMandatory(!mandatory)}/>
          <label className="form-check-label" htmlFor="mandatory-switch">
            Is attendance mandatory?
          </label>
        </div>

        <div className="form-group mb-1">
          <label htmlFor="description-input"
                 className="form-label">Description:</label>
          <textarea className="form-control" id="description-input" rows="3"
                    title="Enter event description"
                    onChange={(event) => setDescription(
                        event.target.value)}></textarea>
        </div>

        <div className="form-check">
          <input className="form-check-input custom-check-boxes" type="checkbox"
                 value="ACADEMIC"
                 onChange={(event) => handlePointClicked(event.target.value)}
                 id="academic-point-checkbox"/>
          <label className="form-check-label" htmlFor="academic-point-checkbox">
            Academic Point
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input custom-check-boxes" type="checkbox"
                 value="DEI"
                 onChange={(event) => handlePointClicked(event.target.value)}
                 id="dei-point-checkbox"/>
          <label className="form-check-label" htmlFor="dei-point-checkbox">
            Diversity & Inclusion Point
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input custom-check-boxes" type="checkbox"
                 value="GREEK"
                 onChange={(event) => handlePointClicked(event.target.value)}
                 id="greek-point-checkbox"/>
          <label className="form-check-label" htmlFor="greek-point-checkbox">
            Greek Point
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input custom-check-boxes" type="checkbox"
                 value="RISK"
                 onChange={(event) => handlePointClicked(event.target.value)}
                 id="risk-point-checkbox"/>
          <label className="form-check-label" htmlFor="risk-point-checkbox">
            Risk Point
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input custom-check-boxes" type="checkbox"
                 value="SISTERHOOD"
                 onChange={(event) => handlePointClicked(event.target.value)}
                 id="sisterhood-point-checkbox"/>
          <label className="form-check-label"
                 htmlFor="sisterhood-point-checkbox">
            Sisterhood Point
          </label>
        </div>

        <div className="form-check form-switch form-control-lg pb-0">
          <input className="form-check-input custom-switches" type="checkbox"
                 role="switch"
                 id="cs-switch" onChange={handleCsSwitched}/>
          <label className="form-check-label" htmlFor="cs-switch">
            Community service event?
          </label>
        </div>
        <div className="form-group mb-0 mt-0  ms-3">
          <label htmlFor="cs-hours-input" className="form-label">
            Number of community service hours:
          </label>
          <input className="form-control" id="cs-hours-input" type="number"
                 defaultValue={0} onChange={(event) => setCommunityServiceHours(
              event.target.value)}
                 disabled={(!enableCommunityServiceHours)}/>
        </div>

        <div className="form-check form-switch form-control-lg pb-0">
          <input className="form-check-input custom-switches" type="checkbox"
                 role="switch"
                 id="max-participants-switch"
                 onChange={() => setEnableMaxParticipants(
                     !enableMaxParticipants)}/>
          <label className="form-check-label" htmlFor="max-participants-switch">
            Limited availability?
          </label>
        </div>
        <div className="form-group mb-0 mt-0 ms-3">
          <label htmlFor="max-participants-input"
                 className="form-label inactive">
            Maximum number of participants:
          </label>
          <input className="form-control"
                 onChange={(event) => setMaxParticipants(event.target.value)}
                 disabled={(!enableMaxParticipants)}
                 id="max-participants-input" type="number"/>
        </div>
        <div className="text-center m-3">
          <Button disabled={!enableButton} onClick={handleSubmit}>Create
            Event!</Button>
        </div>
      </>
  );
}

export default NewEventForm;