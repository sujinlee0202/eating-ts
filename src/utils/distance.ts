import { geocoder } from "../api/naver/map";
import { NaverMap } from "../types/naver-map";
import { PlaceReview } from "../types/place";

export const calculateDistance = (
  map: NaverMap,
  place: PlaceReview,
  center: naver.maps.Coord
) => {
  const projection = map.getProjection();
  const geocoded = geocoder(place.mapx, place.mapy);

  const distance = projection.getDistance(center, {
    y: geocoded.x,
    x: geocoded.y,
  } as naver.maps.Coord);

  return distance;
};

export const sortByDistance = (
  map: NaverMap,
  places: PlaceReview[],
  center: naver.maps.Coord
) => {
  return places.sort((a, b) => {
    const distanceA = calculateDistance(map, a, center);
    const distanceB = calculateDistance(map, b, center);
    return distanceA - distanceB;
  });
};
