import { useNavigate } from "react-router-dom";
import styles from "./UserMenu.module.css";
import { BsFillPersonFill } from "react-icons/bs";
import { useContext, useState } from "react";
import { loginContext } from "../../context/loginContext";
import gravatar from "gravatar";
import Menu from "../Menu/Menu";

const UserMenu = () => {
  const { user, userSessionObject } = useContext(loginContext);
  const navigate = useNavigate();
  const [isOpenMenu, setisOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    if (!user) navigate("/login");
    else setisOpenMenu((prev) => !prev);
  };

  return (
    <>
      <button className={styles.userMenuButton} onClick={handleOpenMenu}>
        {!userSessionObject && (
          <BsFillPersonFill className={styles.userMenuIcon} />
        )}
        {userSessionObject && (
          <img
            src={gravatar.url(userSessionObject?.email, {
              s: "28px",
              d: "retro",
            })}
            className={styles.loginUserProfile}
          />
        )}
      </button>
      {isOpenMenu && user && <Menu />}
    </>
  );
};

export default UserMenu;
