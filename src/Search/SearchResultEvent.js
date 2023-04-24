import React from "react";
import {Center, Grid, GridItem, Text, VStack} from "@chakra-ui/react";
import {Geo} from "react-bootstrap-icons";
import {useNavigate} from "react-router";
import {Button} from "react-bootstrap";

function SearchResultEvent({result}) {

  const navigate = useNavigate();

  function feetToMiles(ft) {
    return parseFloat((ft / 5280).toFixed(3));
  }

  function handleOnClick(eventId) {
    navigate(`/details/${eventId}`);
  }

  return (
      <div className="list-group-item sand-border width-100p m-0 p-3">
        <Grid templateColumns='repeat(3, 1fr)' spacing={"10"}
              className={"mb-0 pb-0"}>
          <GridItem w='100%' h='16'>
            <Text className="pt-3 ps-2" fontWeight={"bold"}
                  fontSize='22px'>{result.title}</Text>
          </GridItem>
          <GridItem w='100%' h='16'>
            <Center>
              <VStack>
                <Geo size={30}/>
                <Text>{feetToMiles(result.distance)} miles away</Text>
              </VStack>
            </Center>
          </GridItem>
          <GridItem w='100%' h='16'>
            <Center>
              <Button onClick={() => handleOnClick(result._id)}>See
                Details</Button>
            </Center>
          </GridItem>
        </Grid>
      </div>
  );
}

export default SearchResultEvent;