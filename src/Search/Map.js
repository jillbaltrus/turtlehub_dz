import {
  GoogleMap,
  LoadScript, MarkerF
} from "@react-google-maps/api";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {findEventsThunk} from "../services/event-thunks";
import {findLatAndLng, GOOGLE_MAPS_KEY} from "../services/google-maps-service";
import EventMapMarker from "./EventMapMarker";

export async function getCoordinates(location) {
  const coordinates = await findLatAndLng(location);
  return coordinates;
};

function Map({searchLocation}) {
  const defaultCenter = {
    lat: 42.3367,
    lng: -71.0875
  };
  const { events } = useSelector(state => state.event);
  const dispatch = useDispatch();
  const [searchLocationCoordinates, setSearchLocationCoordinates] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  // TODO: handle bad search location
  useEffect(() => {
    if (searchLocation !== '') {
      getCoordinates(searchLocation).then(coordinates => {
        setSearchLocationCoordinates(coordinates);
        setMapCenter(coordinates);
      });
    }
  }, [searchLocation]);

  useEffect(() => {
    dispatch(findEventsThunk());
  }, []);

  const containerStyle = {
    width: '700px',
    height: '400px'
  };

  return (
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_KEY}>
        <GoogleMap
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
      </LoadScript>
  );
}
export default Map;