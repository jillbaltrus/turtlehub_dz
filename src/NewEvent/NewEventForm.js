import {useState} from "react";
import {Button} from "react-bootstrap";

function NewEventForm() {
  const [enableCommunityServiceHours, setEnableCommunityServiceHours] = useState(
      false);
  const [enableMaxParticipants, setEnableMaxParticipants] = useState(false);
  return (
      <>
        <div className="form-group mb-1">
          <label htmlFor="title-input" className="form-label">
            Title:
          </label>
          <input className="form-control" id="title-input"
                 placeholder="My new event!" title="Enter event title"
                 type="text"/>
        </div>

        <div className="form-group mb-1">
          <label htmlFor="date-input" className="form-label">
            Date:
          </label>
          <input type="date" className="form-control"
                 id="date-input"/>
        </div>

        <div className="form-group mb-1">
          <label htmlFor="time-input" className="form-label">
            Time:
          </label>
          <input type="time" className="form-control"
                 id="time-input"/>
        </div>

        <div className="form-group mb-1">
          <label htmlFor="location-input" className="form-label">
            Location:
          </label>
          <input className="form-control" id="location-input"
                 placeholder="123 Huntington ave, Boston, MA"
                 title="Enter location"
                 type="text"/>
        </div>

        <div className="form-group mb-1">
          <label htmlFor="description-input"
                 className="form-label">Description:</label>
          <textarea className="form-control" id="description-input" rows="3"
                    title="Enter event description"></textarea>
        </div>

        <div className="form-check">
          <input className="form-check-input custom-check-boxes" type="checkbox"
                 value="ACADEMIC"
                 id="academic-point-checkbox"/>
          <label className="form-check-label" htmlFor="academic-point-checkbox">
            Academic Point
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input custom-check-boxes" type="checkbox"
                 value="DEI"
                 id="dei-point-checkbox"/>
          <label className="form-check-label" htmlFor="dei-point-checkbox">
            Diversity & Inclusion Point
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input custom-check-boxes" type="checkbox"
                 value="GREEK"
                 id="greek-point-checkbox"/>
          <label className="form-check-label" htmlFor="greek-point-checkbox">
            Greek Point
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input custom-check-boxes" type="checkbox"
                 value="RISK"
                 id="risk-point-checkbox"/>
          <label className="form-check-label" htmlFor="risk-point-checkbox">
            Risk Point
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input custom-check-boxes" type="checkbox"
                 value="SISTERHOOD"
                 id="sisterhood-point-checkbox"/>
          <label className="form-check-label"
                 htmlFor="sisterhood-point-checkbox">
            Sisterhood Point
          </label>
        </div>

        <div className="form-check form-switch form-control-lg pb-0">
          <input className="form-check-input custom-switches" type="checkbox"
                 role="switch"
                 id="cs-switch" onChange={() => setEnableCommunityServiceHours(
              !enableCommunityServiceHours)}/>
          <label className="form-check-label" htmlFor="cs-switch">
            Community service event?
          </label>
        </div>
        <div className="form-group mb-0 mt-0  ms-3">
          <label htmlFor="cs-hours-input" className="form-label">
            Number of community service hours:
          </label>
          <input className="form-control" id="cs-hours-input" type="number"
                 defaultValue={0}
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
                 disabled={(!enableMaxParticipants)}
                 id="max-participants-input" type="number"/>
        </div>
        <div className="text-center m-3">
          <Button>Create Event!</Button>
        </div>
      </>
  );
}

export default NewEventForm;