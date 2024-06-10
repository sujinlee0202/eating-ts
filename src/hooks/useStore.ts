import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { PlaceReview } from "../types/place";

export const STORE_KEY = "store";

const useStores = () => {
  const queryClient = useQueryClient();

  const initializeStores = useCallback(
    (stores: PlaceReview[]) => {
      queryClient.setQueryData([STORE_KEY], stores);
    },
    [queryClient]
  );

  return {
    initializeStores,
  };
};

export default useStores;
