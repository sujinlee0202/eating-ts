import styles from "./Sidebar.module.css";
import logo from "../../assets/eating_logo.png";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineRight, AiOutlineLeft, AiOutlineClose } from "react-icons/ai";
import StoreCard from "../StoreCard/StoreCard";
import { calculateDistance, sortByDistance } from "../../utils/distance";
import { reverseGeocoder } from "../../api/naver/map";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { PlaceReview } from "../../types/place";
import { useQuery } from "@tanstack/react-query";
import { NaverMap } from "../../types/naver-map";
import { MAP_KEY } from "../../hooks/useMaps";
import { STORE_KEY } from "../../hooks/useStore";

const Sidebar = () => {
  const { data: map } = useQuery<NaverMap>({
    queryKey: [MAP_KEY],
  });
  const { data: place } = useQuery<PlaceReview[]>({
    queryKey: [STORE_KEY],
  });

  const { placeId } = useParams();
  const navigate = useNavigate();

  const [openSidebar, setOpenSidebar] = useState(true);
  const [jibunAddress, setJibunAddress] = useState<string>();
  const [openDetail, setOpenDetail] = useState(placeId ? true : false);

  const [center, setCenter] = useState<naver.maps.Coord>();

  useEffect(() => {
    setCenter(map?.getCenter());
  }, [map]);

  const handleIdleMap = useCallback(() => {
    setCenter(map?.getCenter());
  }, [map]);

  useEffect(() => {
    if (map) {
      map.addListener("idle", handleIdleMap);
    }
  }, [map, handleIdleMap]);

  // 좌표를 지번 이름으로 변경하기
  useEffect(() => {
    if (center) {
      reverseGeocoder(center, function (address: string) {
        setJibunAddress(address);
      });
    }
  }, [center]);

  // place 배열을 가까운 순서로 정렬
  useEffect(() => {
    if (map && center && place) {
      sortByDistance(map, place, center).map((place) => {
        calculateDistance(map, place, center);
      });
    }
  }, [map, center, place]);

  if (!place) return null;

  const handleClose = () => {
    setOpenSidebar((prev) => !prev);
  };

  const onClickDetail = (id: string) => {
    const selectedPlace = place.find((p) => p.id === id);
    if (selectedPlace) {
      setOpenDetail(true);
      navigate(`/place/${id}`, { state: selectedPlace });
    }
  };

  const onClickDetailClose = () => {
    setOpenDetail(false);
    navigate("/");
  };

  const handleMoveHome = () => {
    setOpenDetail(false);
    setOpenSidebar(true);
  };

  return (
    <nav
      className={`
      ${styles.sidebarContainer} 
      ${!openSidebar && styles.sidebarClose}
      ${openDetail && !openSidebar && styles.sidebarAndDetailClose}
    `}
    >
      <Link to='/' onClick={handleMoveHome} state={place}>
        <img src={logo} alt='eating-logo' className={styles.logo} />
      </Link>
      <h1 className={styles.location}>{jibunAddress}</h1>
      <div className={styles.storeContainer}>
        {place.slice(0, 20).map((place, index) => (
          <StoreCard place={place} key={index} onClickDetail={onClickDetail} />
        ))}
      </div>
      <button
        className={`${styles.btnClose} ${openDetail && styles.openDetail}`}
        onClick={handleClose}
      >
        {openSidebar ? (
          <AiOutlineLeft className={styles.arrowIcon} />
        ) : (
          <AiOutlineRight className={styles.arrowIcon} />
        )}
      </button>
      <Outlet />
      {openSidebar && openDetail && (
        <button className={styles.detailClose} onClick={onClickDetailClose}>
          <AiOutlineClose />
        </button>
      )}
    </nav>
  );
};

export default Sidebar;
