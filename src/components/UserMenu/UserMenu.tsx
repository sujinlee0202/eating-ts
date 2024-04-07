import { useNavigate } from "react-router-dom";
import styles from "./UserMenu.module.css";
import { BsFillPersonFill } from "react-icons/bs";
import { useContext, useState } from "react";
import { loginContext } from "../../context/loginContext";
import Menu from "../Menu/Menu";
import gravatar from "gravatar";

const UserMenu = () => {
  const { parsedSessionStorageUser } = useContext(loginContext);
  const navigate = useNavigate();
  const [isOpenMenu, setisOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    if (!parsedSessionStorageUser) navigate("/login");
    else setisOpenMenu((prev) => !prev);
  };

  return (
    <>
      <button className={styles.userMenuButton} onClick={handleOpenMenu}>
        {!parsedSessionStorageUser && (
          <BsFillPersonFill className={styles.userMenuIcon} />
        )}
        {parsedSessionStorageUser && (
          <img
            src={gravatar.url(parsedSessionStorageUser.email!, {
              s: "28px",
              d: "retro",
            })}
            className={styles.loginUserProfile}
          />
        )}
      </button>
      {isOpenMenu && parsedSessionStorageUser && <Menu />}
    </>
  );
};

export default UserMenu;
