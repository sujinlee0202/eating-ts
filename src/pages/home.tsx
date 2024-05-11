import { useCallback, useEffect, useState } from "react";
import MapSection from "../components/MapSection/MapSection";
import Sidebar from "../components/Sidebar/Sidebar";
import UserMenu from "../components/UserMenu/UserMenu";
import Markers from "../components/Markers";
import { geoLocation } from "../utils/location";

const Home = () => {
  const [map, setMap] = useState<naver.maps.Map>();
  const [center, setCenter] = useState<naver.maps.Coord>();

  useEffect(() => {
    geoLocation(setMap);
  }, []);

  useEffect(() => {
    setCenter(map?.getCenter());
  }, [map]);

  const handleIdleMap = useCallback(() => {
    setCenter(map?.getCenter());
  }, [map]);

  useEffect(() => {
    if (map) {
      map.addListener("idle", handleIdleMap);
    }
  }, [handleIdleMap, map]);

  return (
    <>
      <MapSection />
      <Markers map={map} />
      {center && map && <Sidebar map={map} center={center} />}
      <UserMenu />
    </>
  );
};

export default Home;
