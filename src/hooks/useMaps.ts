import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { Coordinates, NaverMap } from "@/types/naver-map";

export const INITIAL_CENTER: Coordinates = [37.5666103, 126.9783882];
export const INITIAL_ZOOM = 15;

export const MAP_KEY = "map";

const useMaps = () => {
  const queryClient = useQueryClient();

  const initializeMap = useCallback(
    (map: NaverMap) => {
      queryClient.setQueryData([MAP_KEY], map);
    },
    [queryClient]
  );

  return {
    initializeMap,
  };
};

export default useMaps;
