import { useQuery } from "@tanstack/react-query";
import UserMenu from "../components/UserMenu/UserMenu";
import { getPlace } from "../api/firebase/firestore";
import { useEffect } from "react";
import useStores from "../hooks/useStore";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { data: place } = useQuery({
    queryKey: ["place"],
    queryFn: getPlace,
  });

  const { initializeStores } = useStores();
  const location = useLocation();

  useEffect(() => {
    place && initializeStores(place);
  }, [initializeStores, place, location.state]);

  return (
    <>
      {/* <MapSection /> */}
      <UserMenu />
    </>
  );
};

export default Home;
