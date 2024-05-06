import { useEffect, useState } from "react";
import { getPlace } from "../api/firebase/firestore";
import { PlaceReview } from "../types/place";
import Marker from "./Marker";

interface Props {
  map: undefined | naver.maps.Map;
}

const Markers = ({ map }: Props) => {
  const [place, setPlace] = useState<PlaceReview[]>();

  // place 불러오기
  useEffect(() => {
    getPlace().then((data) => setPlace(data));
  }, []);

  if (!place) return null;

  return (
    <>
      {place.map((place, index) => {
        return (
          <Marker
            key={index}
            map={map}
            lat={place.mapx}
            lon={place.mapy}
          ></Marker>
        );
      })}
    </>
  );
};

export default Markers;
