import NavBar from "../NavBar";
import Map from "./Map";
import React, {useState} from "react";
import {Button} from "react-bootstrap";
import SearchResults from "./SearchResults";

function Search() {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleButtonClick = () => {
    setSearchLocation(searchTerm);
  }

  // on click, add marker to map. use SearchLocation as prop to map
  return (
      <div className="row">
        <NavBar active="search"/>
        <div className="col-8">
          <h1>Search</h1>
          <div className="form-group mb-1">
            <label htmlFor="search-input" className="form-label">
              Search for a location:
            </label>
            <input className="form-control" id="search-input"
                   placeholder="My new event!" title="Enter event title"
                   type="text" onChange={(event) => setSearchTerm(event.target.value)}/>
          </div>
          <Button onClick={handleButtonClick}>Search</Button>
          <Map searchLocation={searchLocation}/>
          <SearchResults searchLocation={searchLocation}/>
        </div>
      </div>
  );
}
export default Search;