import { useLocation } from "react-router-dom";
import { PlaceReview } from "../../types/place";
import {
  MdLocationOn,
  MdOutlineAccessTimeFilled,
  MdPhone,
} from "react-icons/md";
import styles from "./HomeTab.module.css";

const HomeTab = () => {
  const location = useLocation();
  const { address }: PlaceReview = location.state;

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <p className={styles.title}>정보</p>
        <div className={styles.address}>
          <MdLocationOn />
          <p>{address}</p>
        </div>
        <div className={styles.time}>
          <MdOutlineAccessTimeFilled />
          <p>영업시간</p>
        </div>
        <div className={styles.phone}>
          <MdPhone />
          <p>전화번호</p>
        </div>
      </div>
      <p className={styles.title}>메뉴</p>
    </div>
  );
};

export default HomeTab;
