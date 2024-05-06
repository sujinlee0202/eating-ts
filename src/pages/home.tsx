import { useCallback, useEffect, useState } from "react";
import MapSection from "../components/MapSection/MapSection";
import Sidebar from "../components/Sidebar/Sidebar";
import UserMenu from "../components/UserMenu/UserMenu";
import { initMap } from "../api/naver/map";
import Markers from "../components/Markers";

const Home = () => {
  const [map, setMap] = useState<naver.maps.Map>();
  const [center, setCenter] = useState<naver.maps.Coord>();

  useEffect(() => {
    const success = (pos: GeolocationPosition) => {
      const coords = pos.coords;
      const map = initMap(coords.latitude, coords.longitude);
      setMap(map);
      setCenter(map.getCenter());
    };

    const error = () => {
      alert(
        "위치 권한 설정이 되어있지 않습니다. 설정하지 않으면 기본값(서울 시청)으로 지역이 표시됩니다."
      );
      const map = initMap(37.5666103, 126.9783882);
      setMap(map);
      setCenter(map.getCenter());
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  const handleIdleMap = useCallback(() => {
    if (map) {
      setCenter(map.getCenter());
    }
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
