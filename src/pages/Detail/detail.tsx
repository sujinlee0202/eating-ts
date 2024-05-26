import { useLocation } from "react-router-dom";
import styles from "./detail.module.css";

const Detail = () => {
  const location = useLocation();
  const { title } = location.state;

  return <div className={styles.container}>{title}</div>;
};

export default Detail;
