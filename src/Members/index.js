import NavBar from "../NavBar";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {findUsersThunk,} from "../services/user-thunks";
import MemberName from "./MemberName";
import {Divider} from "@chakra-ui/react";

function Members() {
  const [members, setMembers] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getMembers() {
      const {payload} = await dispatch(findUsersThunk());
      setMembers(payload);
    }

    getMembers();
  }, []);
  return (
      <div className="row">
        <NavBar active="members"/>
        <div className="col-8">
          <h1 className="ps-2">All Members</h1>
          <h5 className="ps-3">Click on a name to learn more.</h5>
          <Divider borderWidth={'2px'} borderColor={'#75bde0'}/>
          <ul className="navigation-list-group rounded p-0 m-0 ps-3 col-8">
            {members.sort((a, b) => a.lastName.localeCompare(b.lastName)).map(
                member => <MemberName key={member._id} member={member}/>)}
          </ul>
        </div>
      </div>
  );
}

export default Members;