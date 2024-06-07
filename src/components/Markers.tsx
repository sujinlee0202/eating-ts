import Marker from "./Marker";
import { useNavigate } from "react-router-dom";
import { PlaceReview } from "../types/place";

interface Props {
  map: undefined | naver.maps.Map;
  place: PlaceReview[];
}

const Markers = ({ map, place }: Props) => {
  const navigate = useNavigate();

  const handleDetail = (place: PlaceReview) => {
    navigate(`/place/${place.id}`, { state: place });
  };

  return (
    <>
      {place?.map((place, index) => {
        return (
          <Marker
            key={index}
            map={map}
            lat={place.mapx}
            lon={place.mapy}
            onClick={() => handleDetail(place)}
          ></Marker>
        );
      })}
    </>
  );
};

export default Markers;
