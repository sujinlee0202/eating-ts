import { Dispatch, SetStateAction } from "react";
import { initMap } from "../api/naver/map";
import { locationPermissionError } from "../components/messages/alertMessages";

type SetMapFunction = Dispatch<SetStateAction<naver.maps.Map | undefined>>;

const DEFAULT_COORD = {
  latitude: 37.5666103,
  longitude: 126.9783882,
};

const setDefaultMapLocation = (
  setMap: SetMapFunction,
  lat: number,
  lon: number
) => {
  const map = initMap(lat, lon);
  setMap(map);
};

export const geoLocation = (setMap: SetMapFunction) => {
  const { latitude, longitude } = DEFAULT_COORD;

  const success = (pos: GeolocationPosition) => {
    const coords = pos.coords;
    setDefaultMapLocation(setMap, coords.latitude, coords.longitude);
  };

  const error = () => {
    alert(locationPermissionError);
    setDefaultMapLocation(setMap, latitude, longitude);
  };

  navigator.geolocation.getCurrentPosition(success, error);
};
