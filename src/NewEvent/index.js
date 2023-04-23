import NavBar from "../NavBar";
import NewEventForm from "./NewEventForm";
import {useSelector} from "react-redux";
import {Divider, useToast} from "@chakra-ui/react";
import {useNavigate} from "react-router";
import React, {useEffect} from "react";

function NewEvent() {
  const {currentUser} = useSelector((state) => state.user);
  const {events, error} = useSelector((state) => state.event);
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
          <Divider borderWidth={'2px'} borderColor={'#75bde0'}/>
          <NewEventForm/>
        </div>
      </div>
  );
}

export default NewEvent;