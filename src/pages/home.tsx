import { useCallback, useEffect, useState } from "react";
import MapSection from "../components/MapSection/MapSection";
import Sidebar from "../components/Sidebar/Sidebar";
import UserMenu from "../components/UserMenu/UserMenu";
import Markers from "../components/Markers";
import { geoLocation } from "../utils/location";
import { useQuery } from "@tanstack/react-query";
import { getPlace } from "../api/firebase/firestore";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { data: place } = useQuery({
    queryKey: ["place"],
    queryFn: getPlace,
    staleTime: 1000,
  });

  const [map, setMap] = useState<naver.maps.Map>();
  const [center, setCenter] = useState<naver.maps.Coord>();

  const location = useLocation();

  useEffect(() => {
    geoLocation(setMap);
  }, [location.state]);

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
      {place && <Markers map={map} place={place} />}
      {center && map && place && (
        <Sidebar map={map} center={center} place={place} />
      )}
      <UserMenu />
    </>
  );
};

export default Home;
