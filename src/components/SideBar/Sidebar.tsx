import styles from "./Sidebar.module.css";
import logo from "../../assets/eating_logo.png";
import { useContext, useEffect, useState } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import StoreCard from "../StoreCard/StoreCard";
import { getPlace, getUser } from "../../api/firebase/firestore";
import { PlaceReview } from "../../types/place";
import { loginContext } from "../../context/loginContext";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [place, setPlace] = useState<PlaceReview[]>();
  const [id, setId] = useState<string | undefined | null>(undefined);
  const { parsedSessionStorageUser } = useContext(loginContext);

  useEffect(() => {
    getPlace().then((data) => setPlace(data));
  }, []);

  useEffect(() => {
    if (parsedSessionStorageUser?.email) {
      getUser(parsedSessionStorageUser?.email).then((data) => {
        data && setId(data.name as string);
      });
    }
  }, [parsedSessionStorageUser]);

  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  return (
    <nav
      className={`${styles.sidebarContainer} ${!open && styles.sidebarClose}`}
    >
      <img src={logo} alt='eating-logo' className={styles.logo} />
      <h1 className={styles.location}>영등포구 신길 7동</h1>
      <div className={styles.storeContainer}>
        <div className={styles.recommend}>
          <p className={styles.id}>{id}</p>
          <p>님을 위한 추천 PICK!! </p>
        </div>
        {place?.map((place, index) => (
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
