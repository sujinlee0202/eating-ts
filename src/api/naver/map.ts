export const initMap = (lat: number, lon: number) => {
  const center: naver.maps.LatLng = new naver.maps.LatLng(lat, lon);

  const map = new naver.maps.Map("map", {
    center: center,
    zoom: 16,
    minZoom: 9,
    scaleControl: false,
    mapDataControl: false,
    tileSpare: 1,
  });

  return map;
};
