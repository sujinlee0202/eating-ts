import { geocoder } from "../api/naver/map";
import { PlaceReview } from "../types/place";

export const calculateDistance = (
  map: naver.maps.Map,
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
  map: naver.maps.Map,
  places: PlaceReview[],
  center: naver.maps.Coord
) => {
  return places.sort((a, b) => {
    const distanceA = calculateDistance(map, a, center);
    const distanceB = calculateDistance(map, b, center);
    return distanceA - distanceB;
  });
};
