import NavBar from "../NavBar";
import NewEventForm from "./NewEventForm";

function NewEvent() {
  return (
      <div className="row">
        <NavBar active="newEvent"/>
        <div className="col-7">
          <h1>
            Create a New Event
          </h1>
          <NewEventForm/>
        </div>
      </div>
  );
}

export default NewEvent;