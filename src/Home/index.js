import NavBar from "../NavBar";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {findEventsByUser} from "../services/rsvps-service";
import UpcomingEvent from "./UpcomingEvent";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";
import {findEventsThunk} from "../services/event-thunks";
import {Divider} from "@chakra-ui/react";

function Home() {
  const {currentUser} = useSelector((state) => state.user);
  const {events} = useSelector(state => state.event);
  const [upcomingEventsForUser, setUpcomingEventsForUser] = useState([]);
  const [nextThreeEvents, setNextThreeEvents] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findEventsThunk());
    const sortedEvents = [...events].filter(
        e => new Date(e.startDateTime) > new Date()).sort((a, b) => {
      return new Date(a.startDateTime) - new Date(b.startDateTime);
    });
    setNextThreeEvents(sortedEvents.slice(0, 3));
  }, [events]);

  async function findUpcomingEventsByUserId(userId) {
    const events = await findEventsByUser(userId);
    return events;
  }

  useEffect(() => {
    if (currentUser) {
      findUpcomingEventsByUserId(currentUser._id).then(events => {
        const upcomingEvents = events.filter(event => {
          const eventDate = new Date(event.startDateTime);
          const currentDate = new Date();
          return eventDate > currentDate;
        }).sort((a, b) => {
          return new Date(a.startDateTime) - new Date(b.startDateTime);
        });

        setUpcomingEventsForUser(upcomingEvents);
      })
    }
  }, [currentUser]);

  function handleSeeAllClick() {
    navigate("/events");
  }

  const anonymousWelcomeMessage = "Discover upcoming events for your organization with Turtle Hub!"
      + " Check out the events calendar to see what's coming up, or search for a location to find events near you."
      + " Find other club members and see who's attending what on the members page."
      + " Create an account to RSVP and become an admin to create and manage events.";

  const memberWelcomeMessage = "Welcome back to Turtle Hub! See all your upcoming events below."
      + " Check out the events calendar or search page to discover more events and see who"
      + " else is going.";

  return (
      <div className="row mb-3">
        <NavBar active="home"/>
        <div className=" col-8 mb-2">
          {currentUser &&
              <>
                <h1>
                  Hi, {currentUser.firstName}!
                </h1>
                <h5 className={"p-2"}>
                  {memberWelcomeMessage}
                </h5>
              </>}
          {!currentUser &&
              <>
                <h1>
                  Welcome to Turtle Hub!
                </h1>
                <h5 className={"p-2"}>
                  {anonymousWelcomeMessage}
                </h5>
              </>}
          <Divider borderWidth={'2px'} borderColor={'#75bde0'}/>
          {currentUser && <h2>Your upcoming events:</h2>}
          {currentUser && (upcomingEventsForUser.length === 0) && <h4>You have
            no upcoming events.</h4>}
          {currentUser &&
              <ul className="navigation-list-group rounded p-0 m-3  col-lg-8">
                {upcomingEventsForUser.map(
                    e => <UpcomingEvent key={e._id} event={e}/>)}
              </ul>
          }
          <h2 className={"ms-2"}>All upcoming events:</h2>
          <ul className="navigation-list-group rounded p-0 m-3 mb-1 col-lg-8">
            {nextThreeEvents.map(e => <UpcomingEvent key={e._id} event={e}/>)}
          </ul>
          <div className="text-center  col-lg-8 pt-1 mt-1">
            <Button onClick={handleSeeAllClick}>See All Events</Button>
          </div>
        </div>
      </div>
  );
}

export default Home;