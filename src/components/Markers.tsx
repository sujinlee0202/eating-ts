import Marker from "./Marker";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPlace } from "../api/firebase/firestore";
import { PlaceReview } from "../types/place";

interface Props {
  map: undefined | naver.maps.Map;
}

const Markers = ({ map }: Props) => {
  const { data } = useQuery({
    queryKey: ["place"],
    queryFn: getPlace,
    staleTime: 1000,
  });

  const navigate = useNavigate();

  const handleDetail = (place: PlaceReview) => {
    navigate(`/place/${place.id}`, { state: place });
  };

  return (
    <>
      {data?.map((place, index) => {
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
