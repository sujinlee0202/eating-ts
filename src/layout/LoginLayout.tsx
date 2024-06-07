import { useContext, useEffect } from "react";
import { loginContext } from "../context/loginContext";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/firebase/firestore";
import { permissionSettingError } from "../messages/alertMessages";

interface Props {
  children: React.ReactNode;
  requireAdmin: boolean;
}

const LoginLayout = ({ children, requireAdmin }: Props) => {
  const { parsedSessionStorageUser } = useContext(loginContext);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (parsedSessionStorageUser === undefined) {
      // 아직 parsedSessionStorageUser가 설정되지 않았으므로 아무 작업도 하지 않음
      return;
    } else if (!parsedSessionStorageUser) {
      navigate("/");
    } else if (requireAdmin && user !== undefined && !user?.admin) {
      alert(permissionSettingError);
      navigate("/");
    }
  }, [parsedSessionStorageUser, navigate, requireAdmin, user?.admin, user]);

  // 로딩 중이거나 에러가 발생한 경우 처리
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred while loading user data</div>;

  // user가 undefined인 경우 처리
  if (!user) return <div>User data not available</div>;

  return <>{children}</>;
};

export default LoginLayout;
