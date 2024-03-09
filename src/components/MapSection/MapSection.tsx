import { useEffect } from "react";
import { initMap } from "../../api/naver/map";
import styles from "./MapSection.module.css";

const MapSection = () => {
  useEffect(() => {
    const success = (pos: GeolocationPosition) => {
      const coords = pos.coords;
      initMap(coords.latitude, coords.longitude);
    };

    const error = () => {
      alert(
        "위치 권한 설정이 되어있지 않습니다. 설정하지 않으면 기본값(서울 시청)으로 지역이 표시됩니다."
      );
      initMap(37.5666103, 126.9783882);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return <div id='map' className={styles.container}></div>;
};

export default MapSection;
