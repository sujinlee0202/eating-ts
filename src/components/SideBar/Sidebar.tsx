import styles from "./Sidebar.module.css";
import logo from "../../assets/eating_logo.png";
import { useState } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

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
      {/** Store Component */}
      <button className={styles.btnClose} onClick={handleClose}>
        {open ? (
          <AiOutlineRight className={styles.arrowIcon} />
        ) : (
          <AiOutlineLeft className={styles.arrowIcon} />
        )}
      </button>
    </nav>
  );
};

export default Sidebar;
