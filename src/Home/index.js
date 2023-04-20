import NavBar from "../NavBar";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findEventsByUser} from "../services/rsvps-service";
import UpcomingEvent from "./UpcomingEvent";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router";

function Home() {
  const {currentUser} = useSelector((state) => state.user);
  const [upcomingEventsForUser, setUpcomingEventsForUser] = useState([]);
  const navigate = useNavigate();

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
        });
        setUpcomingEventsForUser(upcomingEvents);
      })
    }
  }, [currentUser]);

  function handleSeeAllClick() {
    navigate("/events");
  }

  return (
      <div className="row">
        <NavBar active="home"/>
        <div className="col-8">
          {currentUser &&
              <h1>
                Hi, {currentUser.firstName}!
              </h1>}
          {!currentUser &&
              <h1>
                Welcome!
              </h1>}
          {currentUser && <h2>Your upcoming events:</h2>}
          {currentUser && upcomingEventsForUser.map(e => <UpcomingEvent key={e._id} event={e}/>)}
          <Button onClick={handleSeeAllClick}>See all upcoming events</Button>
        </div>
      </div>
  );
}

export default Home;