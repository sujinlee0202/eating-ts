import styles from "./HomeTab.module.css";

import { useLocation } from "react-router-dom";

import { PlaceReview } from "@/types/place";
import {
  MdLocationOn,
  MdOutlineAccessTimeFilled,
  MdPhone,
} from "react-icons/md";

const HomeTab = () => {
  const location = useLocation();
  const { address, time, phone, menu }: PlaceReview = location.state;
  const enter = time.split("\n").length;

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <p className={styles.title}>정보</p>
        <div className={styles.address}>
          <MdLocationOn className={styles.icon} />
          <p className={styles.text}>{address}</p>
        </div>
        <div className={`${styles.time} ${enter !== 1 && styles.isEnter}`}>
          <MdOutlineAccessTimeFilled className={styles.icon} />
          <pre className={styles.timeText}>{time}</pre>
        </div>
        <div className={styles.phone}>
          <MdPhone className={styles.icon} />
          <p className={styles.text}>{phone}</p>
        </div>
      </div>
      <div className={styles.menuContainer}>
        <p className={styles.title}>메뉴</p>
        <pre className={styles.menu}>{menu}</pre>
      </div>
    </div>
  );
};

export default HomeTab;
