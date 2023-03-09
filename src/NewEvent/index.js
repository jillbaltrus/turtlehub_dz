import NavBar from "../NavBar";
import NewEventForm from "./NewEventForm";

function NewEvent() {
  return (
      <div className="row">
        <NavBar active="newEvent"/>
        <div className="col-8">
          <h1>
            Create a New Event
          </h1>
          <NewEventForm/>

        {/*  <div className="form-group mb-1">*/}
        {/*    <label htmlFor="name-input" className="form-label">*/}
        {/*      Event name:*/}
        {/*    </label>*/}
        {/*    <input className="form-control" id="name-input"*/}
        {/*           placeholder="My new event!" title="Enter event name"*/}
        {/*           type="text"/>*/}
        {/*  </div>*/}

        {/*  <div className="form-group mb-1">*/}
        {/*    <label htmlFor="date-input" className="form-label">*/}
        {/*      Event date:*/}
        {/*    </label>*/}
        {/*    <input type="date" className="form-control"*/}
        {/*           id="date-input"/>*/}
        {/*  </div>*/}

        {/*  <div className="form-group mb-1">*/}
        {/*    <label htmlFor="time-input" className="form-label">*/}
        {/*      Event time:*/}
        {/*    </label>*/}
        {/*    <input type="time" className="form-control"*/}
        {/*           id="time-input"/>*/}
        {/*  </div>*/}

        {/*  <div className="form-group mb-1">*/}
        {/*    <label htmlFor="location-input" className="form-label">*/}
        {/*      Event location:*/}
        {/*    </label>*/}
        {/*    <input className="form-control" id="location-input"*/}
        {/*           placeholder="123 Huntington ave, Boston MA" title="Enter location"*/}
        {/*           type="text"/>*/}
        {/*  </div>*/}

        {/*  <div className="form-group mb-1">*/}
        {/*    <label htmlFor="description-input" className="form-label">Description:</label>*/}
        {/*    <textarea className="form-control" id="description-input" rows="3" title="Enter event description"></textarea>*/}
        {/*  </div>*/}

        {/*  <div className="form-check">*/}
        {/*    <input className="form-check-input" type="checkbox" value="ACADEMIC"*/}
        {/*           id="academic-point-checkbox"/>*/}
        {/*      <label className="form-check-label" htmlFor="academic-point-checkbox">*/}
        {/*        Academic Point*/}
        {/*      </label>*/}
        {/*  </div>*/}
        {/*  <div className="form-check">*/}
        {/*    <input className="form-check-input" type="checkbox" value="DEI"*/}
        {/*           id="dei-point-checkbox"/>*/}
        {/*    <label className="form-check-label" htmlFor="dei-point-checkbox">*/}
        {/*      Diversity & Inclusion Point*/}
        {/*    </label>*/}
        {/*  </div>*/}
        {/*  <div className="form-check">*/}
        {/*    <input className="form-check-input" type="checkbox" value="GREEK"*/}
        {/*           id="greek-point-checkbox"/>*/}
        {/*    <label className="form-check-label" htmlFor="greek-point-checkbox">*/}
        {/*      Greek Point*/}
        {/*    </label>*/}
        {/*  </div>*/}
        {/*  <div className="form-check">*/}
        {/*    <input className="form-check-input" type="checkbox" value="RISK"*/}
        {/*           id="risk-point-checkbox"/>*/}
        {/*    <label className="form-check-label" htmlFor="risk-point-checkbox">*/}
        {/*      Risk Point*/}
        {/*    </label>*/}
        {/*  </div>*/}
        {/*  <div className="form-check">*/}
        {/*    <input className="form-check-input" type="checkbox" value="SISTERHOOD"*/}
        {/*           id="sisterhood-point-checkbox"/>*/}
        {/*    <label className="form-check-label" htmlFor="sisterhood-point-checkbox">*/}
        {/*      Sisterhood Point*/}
        {/*    </label>*/}
        {/*  </div>*/}

        {/*  <div className="form-check">*/}
        {/*    <input className="form-check-input" type="checkbox" value="COMMUNITY_SERVICE"*/}
        {/*           id="cs-point-checkbox"/>*/}
        {/*    <label className="form-check-label" htmlFor="cs-point-checkbox">*/}
        {/*      Community Service Hours*/}
        {/*    </label>*/}
        {/*  </div>*/}

        {/*  <div className="form-check form-switch">*/}
        {/*    <input className="form-check-input" type="checkbox" role="switch"*/}
        {/*           id="max-participants-switch"/>*/}
        {/*      <label className="form-check-label" htmlFor="max-participants-switch">*/}
        {/*        Maximum number of participants?*/}
        {/*      </label>*/}
        {/*  </div>*/}

        </div>
      </div>
  );
}
export default NewEvent;