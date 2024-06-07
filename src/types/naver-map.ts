export type NaverMap = naver.maps.Map;

type Lat = number;
type Lng = number;
export type Coordinates = [Lat, Lng];

export type Markert = {
  map: NaverMap;
  mapx: string;
  mapy: string;
  onClick?: () => void;
};
