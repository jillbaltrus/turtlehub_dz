import {HStack, Text} from "@chakra-ui/react";
import {
  EmojiSmile,
  HandThumbsUp,
  Heart,
  Pencil,
  Puzzle,
  Shield
} from "react-bootstrap-icons";
import React from "react";

function EventPointAttributes({event}) {
  return (
      <>
        <Text fontSize='4xl' className={"mb-0"}>Points for this event:</Text>
        {event.points.length === 0 &&
            <Text fontSize='xl' className={"ms-3 mb-0"}>No points for this
              event.</Text>
        }
        {event.points.includes('ACADEMIC') &&
            <HStack className={"m-1"}>
              <Pencil className="mb-1" size={35}></Pencil>
              <Text fontSize='xl'>Academic</Text>
            </HStack>
        }
        {event.points.includes('CS') &&
            <HStack className={"m-1"}>
              <HandThumbsUp className="mb-1" size={35}></HandThumbsUp>
              <Text fontSize='xl'>Community Service
                ({event.communityServiceHours} hours)</Text>
            </HStack>
        }
        {event.points.includes('DEI') &&
            <HStack className={"m-1"}>
              <Puzzle className="mb-1" size={35}></Puzzle>
              <Text fontSize='xl'>Diversity & Inclusion</Text>
            </HStack>
        }
        {event.points.includes('GREEK') &&
            <HStack className={"m-1"}>
              <EmojiSmile className="mb-1" size={35}></EmojiSmile>
              <Text fontSize='xl'>Greek</Text>
            </HStack>
        }
        {event.points.includes('RISK') &&
            <HStack className={"m-1"}>
              <Shield className="mb-1" size={35}></Shield>
              <Text fontSize='xl'>Risk</Text>
            </HStack>
        }
        {event.points.includes('SISTERHOOD') &&
            <HStack className={"m-1"}>
              <Heart className="mb-1" size={35}></Heart>
              <Text fontSize='xl'>Sisterhood</Text>
            </HStack>
        }
      </>
  );
}

export default EventPointAttributes;