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

// marker를 표시하는 지도
export const markerMap = (lat: number, lon: number) => {
  const center: naver.maps.LatLng = new naver.maps.LatLng(lat, lon);

  const map = new naver.maps.Map("markerMap", {
    center: center,
    zoom: 16,
    minZoom: 9,
    scaleControl: false,
    mapDataControl: false,
    tileSpare: 1,
  });

  new naver.maps.Marker({
    position: new naver.maps.LatLng(lat, lon),
    map: map,
  });

  return map;
};

// tm128 좌표를 naver 좌표로 변경하는 함수
export const geocoder = (x: string, y: string) => {
  const mapx = Number(x);
  const mapy = Number(y);

  const tm128 = new naver.maps.Point(mapy, mapx);

  const transX = tm128.x / 10000000;
  const transY = tm128.y / 10000000;

  return { x: transX, y: transY };
};
