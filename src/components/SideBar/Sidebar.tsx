import styles from "./Sidebar.module.css";
import logo from "../../assets/eating_logo.png";
import { useEffect, useState } from "react";
import { AiOutlineRight, AiOutlineLeft, AiOutlineClose } from "react-icons/ai";
import StoreCard from "../StoreCard/StoreCard";
import { getPlace } from "../../api/firebase/firestore";
import { calculateDistance, sortByDistance } from "../../utils/distance";
import { reverseGeocoder } from "../../api/naver/map";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface Props {
  map: naver.maps.Map;
  center: naver.maps.Coord;
}

const Sidebar = ({ map, center }: Props) => {
  const { data } = useQuery({
    queryKey: ["place"],
    queryFn: getPlace,
    staleTime: 1000,
  });

  const { placeId } = useParams();
  const navigate = useNavigate();

  const [openSidebar, setOpenSidebar] = useState(true);
  const [jibunAddress, setJibunAddress] = useState<string>();
  const [openDetail, setOpenDetail] = useState(placeId ? true : false);

  // 좌표를 지번 이름으로 변경하기
  useEffect(() => {
    reverseGeocoder(center, function (address: string) {
      setJibunAddress(address);
    });
  }, [center]);

  if (!data) return null;
  // place 배열을 가까운 순서로 정렬
  sortByDistance(map, data, center).map((place) => {
    calculateDistance(map, place, center);
  });

  const handleClose = () => {
    setOpenSidebar((prev) => !prev);
  };

  const onClickDetail = (id: string) => {
    const selectedPlace = data.find((p) => p.id === id);
    if (selectedPlace) {
      setOpenDetail(true);
      navigate(`/place/${id}`, { state: selectedPlace });
    }
  };

  const onClickDetailClose = () => {
    setOpenDetail(false);
    navigate("/");
  };

  return (
    <nav
      className={`
      ${styles.sidebarContainer} 
      ${!openSidebar && styles.sidebarClose}
      ${openDetail && !openSidebar && styles.sidebarAndDetailClose}
    `}
    >
      <img src={logo} alt='eating-logo' className={styles.logo} />
      <h1 className={styles.location}>{jibunAddress}</h1>
      <div className={styles.storeContainer}>
        {data?.slice(0, 20).map((place, index) => (
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
