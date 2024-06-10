import useMaps from "../../hooks/useMaps";
import { NaverMap } from "../../types/naver-map";
import Sidebar from "../Sidebar/Sidebar";
import Map from "./Map";
import Markers from "./Markers";

const MapSection = () => {
  const { initializeMap } = useMaps();

  const onLoadMap = (map: NaverMap) => {
    initializeMap(map);
  };

  return (
    <>
      <Map onLoadMap={onLoadMap} />
      <Markers />
      <Sidebar />
    </>
  );
};

export default MapSection;
