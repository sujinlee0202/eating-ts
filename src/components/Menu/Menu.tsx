import { useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";
import { BsFillPersonFill } from "react-icons/bs";
import { useContext } from "react";
import { loginContext } from "../../context/loginContext";
import { logout } from "../../api/firebase/auth";

const Menu = () => {
  const { user } = useContext(loginContext);
  const navigate = useNavigate();

  console.log(user);

  const handleOpenMenu = () => {
    if (!user) navigate("/login");
    else logout(); // 임시 기능
  };

  return (
    <div className={styles.container}>
      <button className={styles.menuButton} onClick={handleOpenMenu}>
        {!user && <BsFillPersonFill className={styles.menuIcon} />}
        {/* 임시 아이콘 */}
        {user && <BsFillPersonFill style={{ color: "black" }} />}
      </button>
    </div>
  );
};

export default Menu;
