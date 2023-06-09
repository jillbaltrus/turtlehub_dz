import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {
  CalendarPlusFill,
  CalendarWeekFill,
  HouseFill,
  PeopleFill,
  PersonCircle,
  PersonFillLock,
  Search
} from "react-bootstrap-icons";
import {HStack, Text} from "@chakra-ui/react";

const NavBar = ({active}) => {
  const {currentUser} = useSelector((state) => state.user);
  return (
      <div className="list-group col-4 border-3 mt-0 pt-0">
        <Link to="/"
              className={`list-group-item list-group-item-action nav-bar-text ${active
              === 'home' ? 'active' : ''}`}>
          <HStack>
            <HouseFill className="me-3 mb-1" size={25}></HouseFill>
            <Text fontWeight={"bold"} fontSize='2xl'>Home</Text>
          </HStack>
        </Link>
        <Link to="/events"
              className={`list-group-item list-group-item-action nav-bar-text ${active
              === 'events' ? 'active' : ''}`}>
          <HStack>
            <CalendarWeekFill className="me-3 mb-1"
                              size={25}></CalendarWeekFill>
            <Text fontWeight={"bold"} fontSize='2xl'>Events</Text>
          </HStack>
        </Link>
        <Link to="/members"
              className={`list-group-item list-group-item-action nav-bar-text ${active
              === 'members' ? 'active' : ''}`}>
          <HStack>
            <PeopleFill className="me-3 mb-1" size={25}></PeopleFill>
            <Text fontWeight={"bold"} fontSize='2xl'>Members</Text>
          </HStack>
        </Link>
        <Link to="/search"
              className={`list-group-item list-group-item-action nav-bar-text ${active
              === 'search' ? 'active' : ''}`}>
          <HStack>
            <Search className="me-3 mb-1" size={25}></Search>
            <Text fontWeight={"bold"} fontSize='2xl'>Search</Text>
          </HStack>
        </Link>

        {currentUser &&
            <Link to="/profile"
                  className={`list-group-item list-group-item-action nav-bar-text ${active
                  === 'profile' ? 'active' : ''}`}>
              <HStack>
                <PersonCircle className="me-3 mb-1" size={25}></PersonCircle>
                <Text fontWeight={"bold"} fontSize='2xl'>My Profile</Text>
              </HStack>
            </Link>}
        {!currentUser && <Link to="/login"
                               className={`list-group-item list-group-item-action nav-bar-text ${active
                               === 'login' ? 'active' : ''}`}>
          <HStack>
            <PersonFillLock className="me-3 mb-1" size={25}></PersonFillLock>
            <Text fontWeight={"bold"} fontSize='2xl'>Login</Text>
          </HStack>
        </Link>}
        {currentUser && currentUser.admin && <Link to="/newEvent"
                                                   className={`list-group-item list-group-item-action nav-bar-text ${active
                                                   === 'newEvent' ? 'active'
                                                       : ''}`}>
          <HStack>
            <CalendarPlusFill className="me-3 mb-1"
                              size={25}></CalendarPlusFill>
            <Text fontWeight={"bold"} fontSize='2xl'>New Event</Text>
          </HStack>
        </Link>}
      </div>
  );
};

export default NavBar;