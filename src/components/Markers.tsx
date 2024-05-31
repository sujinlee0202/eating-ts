import Marker from "./Marker";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPlace } from "../api/firebase/firestore";

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

  const handleDetail = (id: string) => {
    navigate(`/place/${id}`);
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
            onClick={() => handleDetail(place.id)}
          ></Marker>
        );
      })}
    </>
  );
};

export default Markers;
