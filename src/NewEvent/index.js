import NavBar from "../NavBar";

function NewEvent() {
  return (
      <div className="row">
        <NavBar active="newEvent"/>
        <div className="col-8">
          <h1>
            Create a New Event
          </h1>
          <div className="form-group">
            <label htmlFor="name-input" className="form-label w-100">
              Event name:
            </label>
            <input className="form-control" id="name-input"
                   placeholder="My new event!" title="Enter event name"
                   type="text"/>
          </div>

          <div className="form-group">
            <label htmlFor="description-input">Description:</label>
            <textarea className="form-control" id="description-input" rows="3" title="Enter event description">
            Describe your event</textarea>
          </div>

        </div>
      </div>
  );
}
export default NewEvent;