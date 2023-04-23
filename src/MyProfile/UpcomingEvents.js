import {useEffect, useState} from "react";
import {findEventsByUser} from "../services/rsvps-service";
import UpcomingEvent from "../Home/UpcomingEvent";

function UpcomingEvents({user}) {
  const [upcomingEventsForUser, setUpcomingEventsForUser] = useState([]);

  async function findUpcomingEventsByUserId(userId) {
    const events = await findEventsByUser(userId);
    return events;
  }

  useEffect(() => {
    if (user) {
      findUpcomingEventsByUserId(user._id).then(events => {
        const upcomingEvents = events.filter(event => {
          const eventDate = new Date(event.startDateTime);
          const currentDate = new Date();
          return eventDate > currentDate;
        });
        setUpcomingEventsForUser(upcomingEvents.sort((a, b) => {
          return new Date(a.startDateTime) - new Date(b.startDateTime);
        }));
      })
    }
  }, [user]);

  return (
      user &&
      <div className={"m-3"}>
        <h3 className={"mb-3"}>{user.firstName}'s upcoming events:</h3>
        {(upcomingEventsForUser.length === 0) && <h4>No events.</h4>}
        {upcomingEventsForUser.map(e => <UpcomingEvent key={e._id} event={e}/>)}
      </div>
  );
}

export default UpcomingEvents;