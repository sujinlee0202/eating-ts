import { useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";
import { BsFillPersonFill } from "react-icons/bs";
import { useContext } from "react";
import { loginContext } from "../../context/loginContext";
import { logout } from "../../api/firebase/auth";

const Menu = () => {
  const { user, userSessionObject, setUser } = useContext(loginContext);
  const navigate = useNavigate();

  const handleOpenMenu = () => {
    if (!user) navigate("/login");
    else
      logout().then(() => {
        setUser(null);
        sessionStorage.removeItem("user");
      }); // 임시 기능
  };

  return (
    <div className={styles.container}>
      <button className={styles.menuButton} onClick={handleOpenMenu}>
        {!userSessionObject && <BsFillPersonFill className={styles.menuIcon} />}
        {/* 임시 아이콘 */}
        {userSessionObject && <BsFillPersonFill style={{ color: "black" }} />}
      </button>
    </div>
  );
};

export default Menu;
