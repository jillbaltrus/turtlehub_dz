import NavBar from "../NavBar";
import Map from "./Map";
import React, {useState} from "react";
import {Button} from "react-bootstrap";
import SearchResults from "./SearchResults";
import {useParams} from "react-router";
import {Divider, HStack} from "@chakra-ui/react";

function Search() {
  const [searchLocation, setSearchLocation] = useState("");
  const {search} = useParams();
  // const [searchTerm, setSearchTerm] = useState(search ? search : "");
  const [searchTerm, setSearchTerm] = useState("");
  // const navigate = useNavigate();

  const handleButtonClick = () => {
    // navigate(`/search/${searchTerm}`)
    setSearchLocation(searchTerm);
  }

  return (
      <div className="row">
        <NavBar active="search"/>
        <div className="col-8">
          <h1>Search</h1>
          <div className="form-group mb-1">
            <label htmlFor="search-input" className="form-label">
              Enter a location below to find upcoming events near you.
            </label>
            <HStack className={"m-4 mb-0 mt-0"}>
              <input size="50" className="form-control" id="search-input"
                     placeholder="Your address" title="Enter location here"
                     type="text"
                     onChange={(event) => setSearchTerm(event.target.value)}/>
              <Button width="100" onClick={handleButtonClick}>Search</Button>
            </HStack>
            <Divider borderWidth={'2px'} borderColor={'#75bde0'}/>
          </div>
          <Map searchLocation={searchLocation}/>
          <Divider borderWidth={'2px'} borderColor={'#75bde0'}/>
          <SearchResults searchLocation={searchLocation}/>
        </div>
      </div>
  );
}

export default Search;