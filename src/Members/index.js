import NavBar from "../NavBar";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {findUsersThunk,} from "../services/user-thunks";
import MemberName from "./MemberName";

function Members() {
  const [members, setMembers] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    async function getMembers() {
      const {payload} = await dispatch(findUsersThunk());
      setMembers(payload);
      console.log(payload);
    }

    getMembers();
  }, []);
  return (
      <div className="row">
        <NavBar active="members"/>
        <div className="col-8">
          <h1>Members</h1>
          <ul className="navigation-list-group rounded">
            {members.sort((a, b) => a.lastName.localeCompare(b.lastName)).map(
                member => <MemberName key={member._id} member={member}/>)}
          </ul>
        </div>
      </div>
  );
}

export default Members;