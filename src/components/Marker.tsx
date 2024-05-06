import { useEffect } from "react";
import { geocoder } from "../api/naver/map";

interface Props {
  map: undefined | naver.maps.Map;
  lat: string;
  lon: string;
}

const Marker = ({ map, lat, lon }: Props) => {
  useEffect(() => {
    const marker: naver.maps.Marker = new naver.maps.Marker({
      map: map,
      position: new naver.maps.LatLng(
        geocoder(lat, lon).x,
        geocoder(lat, lon).y
      ),
    });

    return () => {
      marker.setMap(null);
    };
  }, [lat, lon, map]);

  return null;
};
export default Marker;
