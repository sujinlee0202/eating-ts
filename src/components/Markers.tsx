import { useEffect, useState } from "react";
import { getPlace } from "../api/firebase/firestore";
import { PlaceReview } from "../types/place";
import Marker from "./Marker";
import { useNavigate } from "react-router-dom";

interface Props {
  map: undefined | naver.maps.Map;
}

const Markers = ({ map }: Props) => {
  const [place, setPlace] = useState<PlaceReview[]>();

  const navigate = useNavigate();

  // place 불러오기
  useEffect(() => {
    getPlace().then((data) => setPlace(data));
  }, []);

  if (!place) return null;

  const handleDetail = (id: string) => {
    navigate(`/place/${id}`);
  };

  return (
    <>
      {place.map((place, index) => {
        return (
          <Marker
            key={index}
            map={map}
            lat={place.mapx}
            lon={place.mapy}
            onClick={() => handleDetail(place.id)}
          ></Marker>
        );
      })}
    </>
  );
};

export default Markers;
