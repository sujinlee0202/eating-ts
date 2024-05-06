import { useEffect, useState } from "react";
import MapSection from "../components/MapSection/MapSection";
import Sidebar from "../components/Sidebar/Sidebar";
import UserMenu from "../components/UserMenu/UserMenu";
import { initMap } from "../api/naver/map";
import Markers from "../components/Markers";

const Home = () => {
  const [map, setMap] = useState<naver.maps.Map | undefined>();

  useEffect(() => {
    const success = (pos: GeolocationPosition) => {
      const coords = pos.coords;
      const map = initMap(coords.latitude, coords.longitude);
      setMap(map);
    };

    const error = () => {
      alert(
        "위치 권한 설정이 되어있지 않습니다. 설정하지 않으면 기본값(서울 시청)으로 지역이 표시됩니다."
      );
      const map = initMap(37.5666103, 126.9783882);
      setMap(map);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return (
    <>
      <MapSection />
      <Markers map={map} />
      <Sidebar />
      <UserMenu />
    </>
  );
};

export default Home;
