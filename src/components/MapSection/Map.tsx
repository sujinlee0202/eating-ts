import { useEffect, useRef } from "react";
import styles from "./MapSection.module.css";
import { INITIAL_CENTER, INITIAL_ZOOM } from "../../hooks/useMaps";
import { Coordinates, NaverMap } from "../../types/naver-map";
import { locationPermissionError } from "../../messages/alertMessages";
import { getMapCetner } from "../../api/naver/map";

interface Props {
  onLoadMap?: (map: NaverMap) => void;
}

const Map = ({ onLoadMap }: Props) => {
  const mapRef = useRef<NaverMap | null>(null);

  useEffect(() => {
    const loadMap = (initialCenter: Coordinates) => {
      const mapOptions = {
        center: getMapCetner(initialCenter),
        zoom: INITIAL_ZOOM,
        minZoom: 9,
        scaleControl: false,
        mapDataControl: false,
        logoControlOptions: {
          position: naver.maps.Position.BOTTOM_LEFT,
        },
      };

      const map = new naver.maps.Map("map", mapOptions);
      mapRef.current = map;

      if (onLoadMap) {
        onLoadMap(map);
      }
    };

    const currentGeoLocation = () => {
      const success = (pos: GeolocationPosition) => {
        const { latitude, longitude } = pos.coords;
        const currentPosition = new window.naver.maps.LatLng(
          latitude,
          longitude
        );
        loadMap([currentPosition.y, currentPosition.x]);
      };

      const error = () => {
        alert(locationPermissionError);
        loadMap(INITIAL_CENTER);
      };

      navigator.geolocation.getCurrentPosition(success, error);
    };

    currentGeoLocation();
  }, [onLoadMap]);

  // map 컴포넌트가 unmount됬을 때 해당 map instance를 모두 파괴
  useEffect(() => {
    return () => {
      mapRef.current?.destroy();
    };
  }, []);

  return <div id='map' className={styles.container} />;
};

export default Map;
