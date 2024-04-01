import { useEffect, useState } from "react";
import { onAuthStateChange } from "../api/firebase/auth";
import { FirebaseUser } from "../types/FirebaseUser";
import { loginContext } from "./loginContext";

interface Props {
  children: React.ReactNode;
}

const LoginProvider = ({ children }: Props) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const userSession = sessionStorage.getItem("user");
  const userSessionObject = userSession && JSON.parse(userSession);

  useEffect(() => {
    onAuthStateChange((authUser) => {
      setUser(authUser);
    });
  }, []);

  return (
    <loginContext.Provider value={{ user, setUser, userSessionObject }}>
      {children}
    </loginContext.Provider>
  );
};

export default LoginProvider;
