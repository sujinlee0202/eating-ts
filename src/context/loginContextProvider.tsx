import { useEffect, useState } from "react";
import { onAuthStateChange } from "../api/firebase/auth";
import { loginContext } from "./loginContext";
import { User } from "firebase/auth";

interface Props {
  children: React.ReactNode;
}

const LoginProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const sessionStorageUser = sessionStorage.getItem("user");
  const parsedSessionStorageUser =
    sessionStorageUser && JSON.parse(sessionStorageUser);

  useEffect(() => {
    onAuthStateChange((authUser) => {
      setUser(authUser);
    });
  }, [user]);

  return (
    <loginContext.Provider value={{ user, setUser, parsedSessionStorageUser }}>
      {children}
    </loginContext.Provider>
  );
};

export default LoginProvider;
