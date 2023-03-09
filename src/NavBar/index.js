import React from "react";
import {Link} from "react-router-dom";
import { HouseFill, PersonCircle, PeopleFill, CalendarPlusFill, CalendarWeekFill, Search } from "react-bootstrap-icons";

const NavBar = (props) => {
  return (
      <div className="list-group col-4 border-3">
        <Link to="/" className={`list-group-item list-group-item-action nav-bar-text ${props.active === 'home' ? 'active':''}`}>
          <HouseFill className="me-3 mb-1" size={25}></HouseFill>
          Home
        </Link>
        <Link to="/events" className={`list-group-item list-group-item-action nav-bar-text ${props.active === 'events' ? 'active':''}`}>
          <CalendarWeekFill className="me-3 mb-1" size={25}></CalendarWeekFill>
          Events
        </Link>
        <Link to="/members" className={`list-group-item list-group-item-action nav-bar-text ${props.active === 'members' ? 'active':''}`}>
          <PeopleFill className="me-3 mb-1" size={25}></PeopleFill>
          Members
        </Link>
        <Link to="/search" className={`list-group-item list-group-item-action nav-bar-text ${props.active === 'search' ? 'active':''}`}>
          <Search className="me-3 mb-1" size={25}></Search>
          Search
        </Link>
        <Link to="/profile" className={`list-group-item list-group-item-action nav-bar-text ${props.active === 'profile' ? 'active':''}`}>
          <PersonCircle className="me-3 mb-1" size={25}></PersonCircle>
          Profile
        </Link>
        <Link to="/newEvent" className={`list-group-item list-group-item-action nav-bar-text ${props.active === 'newEvent' ? 'active':''}`}>
          <CalendarPlusFill className="me-3 mb-1" size={25}></CalendarPlusFill>
          New Event
        </Link>
      </div>
  );
};

export default NavBar;