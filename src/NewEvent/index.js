import NavBar from "../NavBar";
import NewEventForm from "./NewEventForm";
import {useSelector} from "react-redux";
import {useToast} from "@chakra-ui/react";
import {useNavigate} from "react-router";
import {useEffect} from "react";

function NewEvent() {
  const { currentUser } = useSelector((state) => state.user);
  const { events, error } = useSelector((state) => state.event);
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || !currentUser.admin) {
      navigate("/login");
    }
  }, []);

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