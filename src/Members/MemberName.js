import {Link} from "react-router-dom";
import React from "react";

function MemberName({member}) {
  return (
      <Link to={`/profile/${member.username}`}
            className='list-group-item list-group-item-action'>
        {member.firstName + ' ' + member.lastName}
      </Link>
  );
}

export default MemberName;