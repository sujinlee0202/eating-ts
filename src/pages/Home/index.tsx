import MapSection from "../../components/MapSection";
import UserMenu from "../../components/UserMenu";
import { useQuery } from "@tanstack/react-query";
import { getPlace } from "../../api/firebase/firestore";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useStores from "../../hooks/useStore";

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
      <MapSection />
      <UserMenu />
    </>
  );
};

export default Home;
