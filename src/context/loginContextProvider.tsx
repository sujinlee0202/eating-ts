import { useEffect, useState } from "react";
import { onAuthStateChange } from "../api/firebase/auth";
import { loginContext } from "./loginContext";
import { User } from "firebase/auth";

interface Props {
  children: React.ReactNode;
}

const LoginProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const userSession = sessionStorage.getItem("user");
  const userSessionObject = userSession && JSON.parse(userSession);

  useEffect(() => {
    onAuthStateChange((authUser) => {
      setUser(authUser);
    });
  }, [user]);

  return (
    <loginContext.Provider value={{ user, setUser, userSessionObject }}>
      {children}
    </loginContext.Provider>
  );
};

export default LoginProvider;
