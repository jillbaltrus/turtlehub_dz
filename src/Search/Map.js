import {GoogleMap, MarkerF, useLoadScript} from "@react-google-maps/api";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findLatAndLng} from "../services/google-maps-service";
import EventMapMarker from "./EventMapMarker";

export async function getCoordinates(location) {
  const coordinates = await findLatAndLng(location);
  return coordinates;
}

function Map({searchLocation}) {
  const defaultCenter = {
    lat: 42.3367,
    lng: -71.0875
  };
  const {events} = useSelector(state => state.event);
  const [searchLocationCoordinates, setSearchLocationCoordinates] = useState(
      null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_KEY
  })

  // TODO: handle bad search location
  useEffect(() => {
    if (searchLocation !== '') {
      getCoordinates(searchLocation).then(coordinates => {
        setSearchLocationCoordinates(coordinates);
        setMapCenter(coordinates);
      });
    }
  }, [searchLocation]);

  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  const renderMap = () => {
    return <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={13}>
      {events.map(e => <EventMapMarker key={e._id} event={e}/>)}
      {(searchLocationCoordinates !== null) &&
          <MarkerF
              position={searchLocationCoordinates} name={'Your Location'}>
          </MarkerF>
      }
    </GoogleMap>
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : "";
}

export default Map;