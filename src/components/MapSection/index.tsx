import styles from "./index.module.css";
import { useEffect, useRef } from "react";

import useMaps, { INITIAL_CENTER, INITIAL_ZOOM } from "@hooks/useMaps";
import { Coordinates, NaverMap } from "@type/naver-map";
import { getMapCetner } from "@api/naver/map";
import { locationPermissionError } from "@messages/alertMessages";
import Sidebar from "@components/Sidebar";
import Markers from "./Markers";

const MapSection = () => {
  const mapRef = useRef<NaverMap | null>(null);
  const { initializeMap } = useMaps();

  useEffect(() => {
    const onLoadMap = (map: NaverMap) => {
      initializeMap(map);
    };

    const loadMap = (initialCenter: Coordinates) => {
      if (mapRef.current) return null;

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
        if (currentPosition.x < 0 || currentPosition.y < 0) {
          loadMap(INITIAL_CENTER);
        } else {
          loadMap([currentPosition.y, currentPosition.x]);
        }
      };

      const error = () => {
        alert(locationPermissionError);
        loadMap(INITIAL_CENTER);
      };

      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      });
    };

    currentGeoLocation();
  }, [initializeMap]);

  return (
    <>
      <div id='map' className={styles.container} />
      <Markers />
      <Sidebar />
    </>
  );
};

export default MapSection;
