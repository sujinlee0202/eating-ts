import styles from "./Sidebar.module.css";
import logo from "../../assets/eating_logo.png";
import { useEffect, useState } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import StoreCard from "../StoreCard/StoreCard";
import { getPlace } from "../../api/firebase/firestore";
import { PlaceReview } from "../../types/place";
import { calculateDistance, sortByDistance } from "../../utils/distance";
import { reverseGeocoder } from "../../api/naver/map";

interface Props {
  map: naver.maps.Map;
  center: naver.maps.Coord;
}

const Sidebar = ({ map, center }: Props) => {
  const [open, setOpen] = useState(true);
  const [place, setPlace] = useState<PlaceReview[]>();
  const [jibunAddress, setJibunAddress] = useState<string>();

  // place 불러오기
  useEffect(() => {
    getPlace().then((data) => setPlace(data));
  }, []);

  // 좌표를 지번 이름으로 변경하기
  useEffect(() => {
    reverseGeocoder(center, function (address: string) {
      setJibunAddress(address);
    });
  }, [center]);

  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  if (!place) return null;

  // place 배열을 가까운 순서로 정렬
  sortByDistance(map, place, center).map((place) => {
    calculateDistance(map, place, center);
  });

  return (
    <nav
      className={`${styles.sidebarContainer} ${!open && styles.sidebarClose}`}
    >
      <img src={logo} alt='eating-logo' className={styles.logo} />
      <h1 className={styles.location}>{jibunAddress}</h1>
      <div className={styles.storeContainer}>
        {place?.slice(0, 20).map((place, index) => (
          <StoreCard place={place} key={index} />
        ))}
      </div>
      <button className={styles.btnClose} onClick={handleClose}>
        {open ? (
          <AiOutlineLeft className={styles.arrowIcon} />
        ) : (
          <AiOutlineRight className={styles.arrowIcon} />
        )}
      </button>
    </nav>
  );
};

export default Sidebar;
