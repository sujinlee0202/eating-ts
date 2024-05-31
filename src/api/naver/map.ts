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

// 좌표를 지번 이름으로 변경하는 함수
export const reverseGeocoder = (
  center: naver.maps.Coord,
  callback: (address: string) => void
) => {
  return naver.maps.Service.reverseGeocode(
    { coords: new naver.maps.LatLng(center.y, center.x) },
    function (status, response) {
      if (status !== 200) console.log("잘못된 접근입니다.");

      const address = response.v2.address.jibunAddress;
      callback(address);
    }
  );
};

// 장소 클릭시 지도
export const clickPlaceMap = async (x: number, y: number) => {
  const center: naver.maps.LatLng = new naver.maps.LatLng(x, y);

  const mapDiv = new naver.maps.Map("map", {
    center: center,
    zoom: 16,
  });

  new naver.maps.Marker({
    position: center,
    map: mapDiv,
  });

  // 지도의 중심점을 왼쪽으로 이동시키기
  const newCenter = new naver.maps.LatLng(x, y - 0.01);
  mapDiv.setCenter(newCenter);
};
