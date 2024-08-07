import { useQuery } from "@tanstack/react-query";
import Marker from "./Marker";
import { useNavigate } from "react-router-dom";
import { NaverMap } from "@/types/naver-map";
import { MAP_KEY } from "@/hooks/useMaps";
import { STORE_KEY } from "@/hooks/useStore";
import { PlaceReview } from "@/types/place";

const Markers = () => {
  const { data: map } = useQuery<NaverMap>({
    queryKey: [MAP_KEY],
  });
  const { data: stores } = useQuery<PlaceReview[]>({
    queryKey: [STORE_KEY],
  });

  const navigate = useNavigate();

  const handleDetail = (place: PlaceReview) => {
    navigate(`/place/${place.id}`, { state: place });
  };

  return (
    <>
      {stores?.map((place, index) => {
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
