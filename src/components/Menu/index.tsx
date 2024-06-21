import styles from "./index.module.css";

import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { logout } from "@api/firebase/auth";
import { loginContext } from "@context/loginContext";
import { getUser } from "@api/firebase/firestore";

const Menu = () => {
  const { parsedSessionStorageUser, setUser } = useContext(loginContext);
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      if (parsedSessionStorageUser?.email) {
        return getUser(parsedSessionStorageUser?.email);
      }
    },
  });

  // 로딩 중이거나 에러가 발생한 경우 처리
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while loading user data</div>;

  // user가 undefined인 경우 처리
  if (!user) return <div>User data not available</div>;

  const handleLogout = () => {
    logout().then(() => {
      setUser(null);
      sessionStorage.removeItem("user");
    });
  };

  return (
    <ul className={styles.container}>
      {user?.admin && (
        <li className={styles.list}>
          <button className={styles.listButton}>
            <Link to='/addplace'>장소 추가하기</Link>
          </button>
        </li>
      )}
      <li className={styles.list} onClick={handleLogout}>
        <button className={styles.listButton}>로그아웃</button>
      </li>
    </ul>
  );
};

export default Menu;
