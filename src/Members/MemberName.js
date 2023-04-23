import {Link} from "react-router-dom";
import React from "react";
import {HStack, Text} from "@chakra-ui/react";
import {PersonBoundingBox} from "react-bootstrap-icons";

function MemberName({member}) {
  return (
      <Link to={`/profile/${member._id}`}
            className='list-group-item width-100p m-0 p-2 ps-4 medium-border list-group-item-action'>
        <HStack className={"mt-0 mb-0"}>
          <PersonBoundingBox className="m-1 mt-0" size={35}></PersonBoundingBox>
          <Text className={"ms-2 mb-1"} fontWeight={""}
                fontSize='2xl'>{member.firstName + ' ' + member.lastName}</Text>
        </HStack>
      </Link>
  );
}

export default MemberName;