import { useContext } from "react";
import { logout } from "../../api/firebase/auth";
import styles from "./Menu.module.css";
import { loginContext } from "../../context/loginContext";
import { Link } from "react-router-dom";

const Menu = () => {
  const { setUser } = useContext(loginContext);

  const handleLogout = () => {
    logout().then(() => {
      setUser(null);
      sessionStorage.removeItem("user");
    });
  };

  return (
    <ul className={styles.container}>
      <li className={styles.list}>
        <button className={styles.listButton}>
          <Link to='/addplace'>장소 추가하기</Link>
        </button>
      </li>
      <li className={styles.list} onClick={handleLogout}>
        <button className={styles.listButton}>로그아웃</button>
      </li>
    </ul>
  );
};

export default Menu;
