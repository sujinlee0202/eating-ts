import styles from "./Sidebar.module.css";
import logo from "../../assets/eating_logo.png";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineRight, AiOutlineLeft, AiOutlineClose } from "react-icons/ai";
import StoreCard from "../StoreCard/StoreCard";
import { calculateDistance, sortByDistance } from "../../utils/distance";
import { geocoder, reverseGeocoder } from "../../api/naver/map";
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
  const [logicalCenter, setLogicalCenter] = useState<naver.maps.Coord>();

  useEffect(() => {
    const initial = map?.getCenter();
    setLogicalCenter(initial);
  }, [map]);

  // 지도를 움직일 때 중심값 계산
  const handleIdleMap = useCallback(() => {
    const current = map?.getCenter();
    setLogicalCenter(current);
  }, [map]);

  useEffect(() => {
    if (map) {
      map.addListener("idle", handleIdleMap);
    }
  }, [map, handleIdleMap]);

  // 좌표를 지번 이름으로 변경하기
  useEffect(() => {
    if (logicalCenter && openDetail) {
      const newLogicalCenter = {
        ...logicalCenter,
        x: logicalCenter.x + 0.02,
      } as naver.maps.Coord;
      reverseGeocoder(newLogicalCenter, function (address: string) {
        setJibunAddress(address);
      });
    } else if (logicalCenter && !openDetail) {
      const newLogicalCenter = {
        ...logicalCenter,
        x: logicalCenter.x,
      } as naver.maps.Coord;
      reverseGeocoder(newLogicalCenter, function (address: string) {
        setJibunAddress(address);
      });
    }
  }, [logicalCenter, openDetail]);

  // place 배열을 가까운 순서로 정렬
  useEffect(() => {
    if (map && logicalCenter && place) {
      const newLogicalCenter = {
        ...logicalCenter,
        x: logicalCenter.x + 0.02,
      } as naver.maps.Coord;
      sortByDistance(map, place, newLogicalCenter).map((place) => {
        calculateDistance(map, place, newLogicalCenter);
      });
    }
  }, [map, logicalCenter, place]);

  if (!place) return null;

  // 사이드바 접기
  const handleClose = () => {
    setOpenSidebar((prev) => !prev);
  };

  // stord card를 선택해 detail page 열기
  const onClickDetail = (id: string) => {
    const selectedPlace = place.find((p) => p.id === id);
    if (selectedPlace) {
      setOpenDetail(true);
      navigate(`/place/${id}`, { state: selectedPlace });

      // Center the map on the selected place
      if (map && selectedPlace.mapx) {
        const clickedCoord = geocoder(selectedPlace.mapx, selectedPlace.mapy);
        const logical = new naver.maps.LatLng(clickedCoord.x, clickedCoord.y);
        setLogicalCenter(logical);
        const newCenter = new naver.maps.LatLng(
          clickedCoord.x,
          clickedCoord.y - 0.02
        );
        map.setCenter(newCenter);
      }
    }
  };

  // detail page 닫기
  const onClickDetailClose = () => {
    setOpenDetail(false);
    navigate("/");
  };

  // home으로 이동
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
