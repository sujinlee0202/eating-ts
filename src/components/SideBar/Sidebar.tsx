import styles from "./Sidebar.module.css";
import logo from "../../assets/eating_logo.png";
import { useState } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import StoreCard from "../StoreCard/StoreCard";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  return (
    <nav
      className={`${styles.sidebarContainer} ${!open && styles.sidebarClose}`}
    >
      <img src={logo} alt='eating-logo' className={styles.logo} />
      <div className={styles.storeContainer}>
        <StoreCard />
        <StoreCard />
        <StoreCard />
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
